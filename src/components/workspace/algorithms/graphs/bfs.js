/**
 * BFS Engine: generates a complete history of snapshots
 * to reproduce the animation step-by-step.
 */

export const BFS_CODE = [
  { line: 1,  text: 'function bfs(adjList, startNode) {' },
  { line: 2,  text: '  let queue = [startNode];' },
  { line: 3,  text: '  let visited = new Set([startNode]);' },
  { line: 4,  text: '  while (queue.length > 0) {' },
  { line: 5,  text: '    let node = queue.shift();' },
  { line: 6,  text: '    for (let neighbor of adjList[node]) {' },
  { line: 7,  text: '      if (!visited.has(neighbor)) {' },
  { line: 8,  text: '        visited.add(neighbor);' },
  { line: 9,  text: '        queue.push(neighbor);' },
  { line: 10, text: '      }' },
  { line: 11, text: '    }' },
  { line: 12, text: '  }' },
  { line: 13, text: '}' },
];

export const BFS_META = {
  name: 'Breadth First Search',
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V)',
  category: 'Graphs',
  tag: 'Traversal',
};

/**
 * Generates snapshots for BFS.
 * @param {Object} graphData - { adjList: { node: [neighbors] }, nodes: [{id, x, y}] }
 * @param {string} startNodeId - The starting node ID.
 */
export function generateBFSSteps(graphData, startNodeId) {
  const { adjList, nodes } = graphData;
  const startNode = startNodeId || nodes[0].id;
  const steps = [];
  
  const visited = new Set();
  const queue = [];
  const currentPath = []; // For visual trace if needed

  // Initial step
  steps.push({
    graph: { adjList, nodes },
    queue: [...queue],
    visited: new Set(visited),
    activeNode: null,
    comparing: [], // nodes being considered
    codeLine: 1,
    description: 'Starting BFS traversal...',
  });

  queue.push(startNode);
  visited.add(startNode);
  
  steps.push({
    graph: { adjList, nodes },
    queue: [...queue],
    visited: new Set(visited),
    activeNode: null,
    codeLine: 2,
    description: `Enqueuing start node: ${startNode}`,
  });

  steps.push({
    graph: { adjList, nodes },
    queue: [...queue],
    visited: new Set(visited),
    activeNode: null,
    codeLine: 3,
    description: `Marking node ${startNode} as visited`,
  });

  while (queue.length > 0) {
    steps.push({
      graph: { adjList, nodes },
      queue: [...queue],
      visited: new Set(visited),
      activeNode: null,
      codeLine: 4,
      description: `Checking if queue is empty (size: ${queue.length})`,
    });

    const node = queue.shift();
    steps.push({
      graph: { adjList, nodes },
      queue: [...queue],
      visited: new Set(visited),
      activeNode: node,
      codeLine: 5,
      description: `Dequeued node ${node} for exploration`,
    });

    const neighbors = adjList[node] || [];
    for (const neighbor of neighbors) {
      steps.push({
        graph: { adjList, nodes },
        queue: [...queue],
        visited: new Set(visited),
        activeNode: node,
        comparing: [neighbor],
        codeLine: 6,
        description: `Exploring neighbor ${neighbor} of node ${node}`,
      });

      steps.push({
        graph: { adjList, nodes },
        queue: [...queue],
        visited: new Set(visited),
        activeNode: node,
        comparing: [neighbor],
        codeLine: 7,
        description: `Has node ${neighbor} been visited?`,
      });

      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        steps.push({
          graph: { adjList, nodes },
          queue: [...queue],
          visited: new Set(visited),
          activeNode: node,
          comparing: [neighbor],
          codeLine: 8,
          description: `Node ${neighbor} not visited. Marking as visited.`,
        });

        queue.push(neighbor);
        steps.push({
          graph: { adjList, nodes },
          queue: [...queue],
          visited: new Set(visited),
          activeNode: node,
          comparing: [neighbor],
          codeLine: 9,
          description: `Enqueuing node ${neighbor}`,
        });
      } else {
        steps.push({
          graph: { adjList, nodes },
          queue: [...queue],
          visited: new Set(visited),
          activeNode: node,
          comparing: [neighbor],
          codeLine: 7,
          description: `Node ${neighbor} already visited. Skipping.`,
        });
      }
    }
  }

  steps.push({
    graph: { adjList, nodes },
    queue: [...queue],
    visited: new Set(visited),
    activeNode: null,
    codeLine: 12,
    description: 'BFS traversal complete!',
  });

  return { steps, totalSteps: steps.length };
}

/**
 * Generates a random graph for visualization.
 */
export function generateRandomGraph(nodeCount = 8) {
  const nodes = [];
  const adjList = {};
  const radius = 300;
  const centerX = 500;
  const centerY = 400;

  // Create nodes in a circle
  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    const id = String.fromCharCode(65 + i); // A, B, C...
    nodes.push({ id, x, y });
    adjList[id] = [];
  }

  // Add random edges (ensure connectivity or just random)
  for (let i = 0; i < nodeCount; i++) {
    const from = nodes[i].id;
    const targets = Math.floor(Math.random() * 2) + 1; // 1 or 2 neighbors
    for (let j = 0; j < targets; j++) {
      const toIndex = (i + Math.floor(Math.random() * (nodeCount - 1)) + 1) % nodeCount;
      const to = nodes[toIndex].id;
      if (!adjList[from].includes(to) && from !== to) {
        adjList[from].push(to);
        // Make it undirected for simpler BFS visualization
        if (!adjList[to].includes(from)) {
          adjList[to].push(from);
        }
      }
    }
  }

  return { nodes, adjList };
}
