export const DIJKSTRA_CODE = [
  { line: 1, text: 'function dijkstra(graph, start) {' },
  { line: 2, text: '  dist[start] = 0;' },
  { line: 3, text: '  pq.push([0, start]);' },
  { line: 4, text: '  while (pq.length > 0) {' },
  { line: 5, text: '    const [currentDist, node] = extractMin(pq);' },
  { line: 6, text: '    if (visited.has(node)) continue;' },
  { line: 7, text: '    visited.add(node);' },
  { line: 8, text: '    for (const neighbor of graph[node]) {' },
  { line: 9, text: '      const nextDist = currentDist + weight(node, neighbor);' },
  { line: 10, text: '      if (nextDist < dist[neighbor]) {' },
  { line: 11, text: '        dist[neighbor] = nextDist;' },
  { line: 12, text: '        previous[neighbor] = node;' },
  { line: 13, text: '        pq.push([nextDist, neighbor]);' },
  { line: 14, text: '      }' },
  { line: 15, text: '    }' },
  { line: 16, text: '  }' },
  { line: 17, text: '  return { dist, previous };' },
  { line: 18, text: '}' },
];

export const DIJKSTRA_META = {
  name: "Dijkstra's Shortest Path",
  timeComplexity: 'O(E log V)',
  spaceComplexity: 'O(V)',
  category: 'Graphs',
  tag: 'Shortest Path',
};

export function generateDijkstraSteps(graphData, startNodeId) {
  const graph = ensureWeightedGraph(graphData);
  const { adjList, nodes, weights } = graph;
  const startNode = startNodeId || nodes[0]?.id;
  const targetNode = nodes[nodes.length - 1]?.id;
  const steps = [];
  const distances = {};
  const previous = {};
  const visited = new Set();
  const pq = [];

  nodes.forEach((node) => {
    distances[node.id] = Infinity;
    previous[node.id] = null;
  });

  steps.push(createStep({
    graph,
    queue: pq,
    visited,
    distances,
    previous,
    activeNode: null,
    comparing: [],
    targetNode,
    codeLine: 1,
    description: `Initialize Dijkstra from ${startNode} to find the shortest path to ${targetNode}.`,
  }));

  distances[startNode] = 0;
  steps.push(createStep({
    graph,
    queue: pq,
    visited,
    distances,
    previous,
    activeNode: startNode,
    comparing: [],
    targetNode,
    codeLine: 2,
    description: `Distance to start node ${startNode} is 0. Other nodes are infinity.`,
  }));

  pq.push({ node: startNode, distance: 0 });
  steps.push(createStep({
    graph,
    queue: pq,
    visited,
    distances,
    previous,
    activeNode: startNode,
    comparing: [],
    targetNode,
    codeLine: 3,
    description: `Push ${startNode} into the priority queue with distance 0.`,
  }));

  while (pq.length > 0) {
    pq.sort((a, b) => a.distance - b.distance || a.node.localeCompare(b.node));
    steps.push(createStep({
      graph,
      queue: pq,
      visited,
      distances,
      previous,
      activeNode: null,
      comparing: [],
      targetNode,
      codeLine: 4,
      description: `Priority queue has ${pq.length} candidate node(s).`,
    }));

    const current = pq.shift();
    const { node, distance: currentDist } = current;

    steps.push(createStep({
      graph,
      queue: pq,
      visited,
      distances,
      previous,
      activeNode: node,
      comparing: [],
      targetNode,
      codeLine: 5,
      description: `Extract node ${node} with the smallest tentative distance ${formatDistance(currentDist)}.`,
    }));

    if (visited.has(node)) {
      steps.push(createStep({
        graph,
        queue: pq,
        visited,
        distances,
        previous,
        activeNode: node,
        comparing: [],
        targetNode,
        codeLine: 6,
        description: `Node ${node} was already finalized. Skip this stale queue entry.`,
      }));
      continue;
    }

    visited.add(node);
    steps.push(createStep({
      graph,
      queue: pq,
      visited,
      distances,
      previous,
      activeNode: node,
      comparing: [],
      targetNode,
      codeLine: 7,
      description: `Finalize ${node}. Its shortest distance is ${formatDistance(distances[node])}.`,
    }));

    if (node === targetNode) {
      steps.push(createStep({
        graph,
        queue: pq,
        visited,
        distances,
        previous,
        activeNode: node,
        comparing: [],
        targetNode,
        shortestPath: buildPath(previous, startNode, targetNode),
        codeLine: 17,
        description: `Reached target ${targetNode}. The shortest path is locked in.`,
      }));
      return { steps, totalSteps: steps.length };
    }

    for (const neighbor of adjList[node] || []) {
      if (visited.has(neighbor)) {
        steps.push(createStep({
          graph,
          queue: pq,
          visited,
          distances,
          previous,
          activeNode: node,
          comparing: [neighbor],
          targetNode,
          codeLine: 8,
          description: `Neighbor ${neighbor} is already finalized. Skip it.`,
        }));
        continue;
      }

      const edgeWeight = getWeight(weights, node, neighbor);
      const nextDist = distances[node] + edgeWeight;

      steps.push(createStep({
        graph,
        queue: pq,
        visited,
        distances,
        previous,
        activeNode: node,
        comparing: [neighbor],
        targetNode,
        codeLine: 8,
        description: `Inspect edge ${node} -> ${neighbor} with weight ${edgeWeight}.`,
      }));

      steps.push(createStep({
        graph,
        queue: pq,
        visited,
        distances,
        previous,
        activeNode: node,
        comparing: [neighbor],
        targetNode,
        codeLine: 9,
        description: `Candidate distance to ${neighbor}: ${formatDistance(distances[node])} + ${edgeWeight} = ${nextDist}.`,
      }));

      if (nextDist < distances[neighbor]) {
        distances[neighbor] = nextDist;
        previous[neighbor] = node;

        steps.push(createStep({
          graph,
          queue: pq,
          visited,
          distances,
          previous,
          activeNode: node,
          comparing: [neighbor],
          targetNode,
          codeLine: 11,
          description: `Update distance of ${neighbor} to ${nextDist}.`,
        }));

        steps.push(createStep({
          graph,
          queue: pq,
          visited,
          distances,
          previous,
          activeNode: node,
          comparing: [neighbor],
          targetNode,
          codeLine: 12,
          description: `Set previous[${neighbor}] = ${node}.`,
        }));

        pq.push({ node: neighbor, distance: nextDist });
        steps.push(createStep({
          graph,
          queue: pq,
          visited,
          distances,
          previous,
          activeNode: neighbor,
          comparing: [],
          targetNode,
          codeLine: 13,
          description: `Push ${neighbor} into the priority queue with distance ${nextDist}.`,
        }));
      } else {
        steps.push(createStep({
          graph,
          queue: pq,
          visited,
          distances,
          previous,
          activeNode: node,
          comparing: [neighbor],
          targetNode,
          codeLine: 10,
          description: `${nextDist} is not better than current distance ${formatDistance(distances[neighbor])}.`,
        }));
      }
    }
  }

  steps.push(createStep({
    graph,
    queue: pq,
    visited,
    distances,
    previous,
    activeNode: null,
    comparing: [],
    targetNode,
    shortestPath: buildPath(previous, startNode, targetNode),
    codeLine: 17,
    description: `Dijkstra complete. Shortest distance to ${targetNode} is ${formatDistance(distances[targetNode])}.`,
  }));

  return { steps, totalSteps: steps.length };
}

export function generateWeightedGraph(nodeCount = 8) {
  const nodes = [];
  const adjList = {};
  const weights = {};
  const radius = 300;
  const centerX = 500;
  const centerY = 400;

  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    const id = String.fromCharCode(65 + i);
    nodes.push({ id, x, y });
    adjList[id] = [];
  }

  for (let i = 0; i < nodeCount - 1; i++) {
    addWeightedEdge(adjList, weights, nodes[i].id, nodes[i + 1].id, randomWeight());
  }

  for (let i = 0; i < nodeCount; i++) {
    const from = nodes[i].id;
    const extraEdges = Math.floor(Math.random() * 2) + 1;
    for (let j = 0; j < extraEdges; j++) {
      const toIndex = (i + Math.floor(Math.random() * (nodeCount - 1)) + 1) % nodeCount;
      const to = nodes[toIndex].id;
      if (from !== to) {
        addWeightedEdge(adjList, weights, from, to, randomWeight());
      }
    }
  }

  return { nodes, adjList, weights };
}

function createStep({
  graph,
  queue,
  visited,
  distances,
  previous,
  activeNode,
  comparing,
  targetNode,
  shortestPath = [],
  codeLine,
  description,
}) {
  return {
    graph,
    queue: queue.map((item) => item.node),
    priorityQueue: queue.map((item) => ({ ...item })),
    visited: new Set(visited),
    distances: { ...distances },
    previous: { ...previous },
    activeNode,
    comparing,
    targetNode,
    shortestPath,
    codeLine,
    description,
  };
}

function ensureWeightedGraph(graphData) {
  if (graphData?.weights) return graphData;
  const nodes = graphData?.nodes || generateWeightedGraph().nodes;
  const adjList = graphData?.adjList || {};
  const weights = {};

  nodes.forEach((node) => {
    (adjList[node.id] || []).forEach((neighbor) => {
      addWeightedEdge(adjList, weights, node.id, neighbor, deterministicWeight(node.id, neighbor));
    });
  });

  return { nodes, adjList, weights };
}

function addWeightedEdge(adjList, weights, from, to, weight) {
  if (!adjList[from]) adjList[from] = [];
  if (!adjList[to]) adjList[to] = [];
  if (!adjList[from].includes(to)) adjList[from].push(to);
  if (!adjList[to].includes(from)) adjList[to].push(from);
  weights[edgeKey(from, to)] = weights[edgeKey(from, to)] || weight;
}

function getWeight(weights, from, to) {
  return weights[edgeKey(from, to)] || 1;
}

function edgeKey(from, to) {
  return [from, to].sort().join('-');
}

function randomWeight() {
  return Math.floor(Math.random() * 9) + 1;
}

function deterministicWeight(from, to) {
  const key = edgeKey(from, to);
  return (key.charCodeAt(0) + key.charCodeAt(key.length - 1)) % 9 + 1;
}

function formatDistance(value) {
  return value === Infinity ? '∞' : value;
}

function buildPath(previous, startNode, targetNode) {
  const path = [];
  let current = targetNode;

  while (current) {
    path.unshift(current);
    if (current === startNode) return path;
    current = previous[current];
  }

  return [];
}
