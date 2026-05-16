export function parseGraphInput(value, { minNodes = 2, maxNodes = 12, weighted = false } = {}) {
  const lines = value
    .split(/\n|,/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return { error: 'Enter at least one edge.', value: null };
  }

  const nodeIds = [];
  const adjList = {};
  const weights = {};

  for (const line of lines) {
    const match = line.match(/^([A-Za-z0-9]+)\s*(?:-|->|\s)\s*([A-Za-z0-9]+)(?:\s*[:=]\s*(\d+))?$/);

    if (!match) {
      return { error: `Could not parse edge "${line}". Use A-B or A-B:4.`, value: null };
    }

    const from = match[1].toUpperCase();
    const to = match[2].toUpperCase();
    const weight = match[3] ? Number(match[3]) : 1;

    if (from === to) {
      return { error: `Edge "${line}" connects a node to itself.`, value: null };
    }

    if (!Number.isInteger(weight) || weight < 1) {
      return { error: `Edge "${line}" needs a positive integer weight.`, value: null };
    }

    [from, to].forEach((nodeId) => {
      if (!nodeIds.includes(nodeId)) nodeIds.push(nodeId);
      if (!adjList[nodeId]) adjList[nodeId] = [];
    });

    addEdge(adjList, weights, from, to, weight);
  }

  if (nodeIds.length < minNodes) {
    return { error: `Use at least ${minNodes} nodes.`, value: null };
  }

  if (nodeIds.length > maxNodes) {
    return { error: `Use ${maxNodes} nodes or fewer.`, value: null };
  }

  const nodes = layoutNodes(nodeIds);
  return {
    error: '',
    value: weighted ? { nodes, adjList, weights } : { nodes, adjList },
  };
}

export function formatGraphInput(graph) {
  if (!graph?.nodes || !graph?.adjList) return '';

  const seen = new Set();
  const edges = [];

  graph.nodes.forEach((node) => {
    (graph.adjList[node.id] || []).forEach((neighbor) => {
      const key = edgeKey(node.id, neighbor);
      if (seen.has(key)) return;
      seen.add(key);
      const weight = graph.weights?.[key];
      edges.push(weight ? `${node.id}-${neighbor}:${weight}` : `${node.id}-${neighbor}`);
    });
  });

  return edges.join('\n');
}

function addEdge(adjList, weights, from, to, weight) {
  if (!adjList[from].includes(to)) adjList[from].push(to);
  if (!adjList[to].includes(from)) adjList[to].push(from);
  weights[edgeKey(from, to)] = weight;
}

function edgeKey(from, to) {
  return [from, to].sort().join('-');
}

function layoutNodes(nodeIds) {
  const radius = 300;
  const centerX = 500;
  const centerY = 400;

  return nodeIds.sort().map((id, index) => {
    const angle = (index / nodeIds.length) * 2 * Math.PI;
    return {
      id,
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });
}
