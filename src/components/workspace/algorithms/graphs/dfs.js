/**
 * DFS Engine: genera historial completo de snapshots
 * para reproducir la animación paso a paso.
 * Usa un enfoque iterativo con stack explícito (más visual).
 */

export const DFS_CODE = [
  { line: 1,  text: 'function dfs(adjList, startNode) {' },
  { line: 2,  text: '  let stack = [startNode];' },
  { line: 3,  text: '  let visited = new Set();' },
  { line: 4,  text: '  while (stack.length > 0) {' },
  { line: 5,  text: '    let node = stack.pop();' },
  { line: 6,  text: '    if (visited.has(node)) continue;' },
  { line: 7,  text: '    visited.add(node);' },
  { line: 8,  text: '    for (let neighbor of adjList[node]) {' },
  { line: 9,  text: '      if (!visited.has(neighbor)) {' },
  { line: 10, text: '        stack.push(neighbor);' },
  { line: 11, text: '      }' },
  { line: 12, text: '    }' },
  { line: 13, text: '  }' },
  { line: 14, text: '}' },
];

export const DFS_META = {
  name: 'Depth First Search',
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V)',
  category: 'Graphs',
  tag: 'Traversal',
};

/**
 * Generates snapshots for DFS.
 * @param {Object} graphData - { adjList: { node: [neighbors] }, nodes: [{id, x, y}] }
 * @param {string} startNodeId - The starting node ID.
 */
export function generateDFSSteps(graphData, startNodeId) {
  const { adjList, nodes } = graphData;
  const startNode = startNodeId || nodes[0].id;
  const steps = [];

  const visited = new Set();
  const stack = [];

  // Paso inicial: estado antes de comenzar
  steps.push({
    graph: { adjList, nodes },
    queue: [...stack], // reutilizamos 'queue' para el stack visual
    visited: new Set(visited),
    activeNode: null,
    comparing: [],
    codeLine: 1,
    description: 'Starting DFS traversal...',
  });

  stack.push(startNode);
  steps.push({
    graph: { adjList, nodes },
    queue: [...stack],
    visited: new Set(visited),
    activeNode: null,
    comparing: [],
    codeLine: 2,
    description: `Pushing start node ${startNode} onto the stack`,
  });

  steps.push({
    graph: { adjList, nodes },
    queue: [...stack],
    visited: new Set(visited),
    activeNode: null,
    comparing: [],
    codeLine: 3,
    description: 'Initializing empty visited set',
  });

  while (stack.length > 0) {
    // Chequear si el stack tiene elementos
    steps.push({
      graph: { adjList, nodes },
      queue: [...stack],
      visited: new Set(visited),
      activeNode: null,
      comparing: [],
      codeLine: 4,
      description: `Stack has ${stack.length} node(s). Continuing...`,
    });

    const node = stack.pop();

    steps.push({
      graph: { adjList, nodes },
      queue: [...stack],
      visited: new Set(visited),
      activeNode: node,
      comparing: [],
      codeLine: 5,
      description: `Popped node ${node} from stack`,
    });

    // Si ya fue visitado, saltar
    if (visited.has(node)) {
      steps.push({
        graph: { adjList, nodes },
        queue: [...stack],
        visited: new Set(visited),
        activeNode: node,
        comparing: [],
        codeLine: 6,
        description: `Node ${node} already visited. Skipping.`,
      });
      continue;
    }

    // Marcar como visitado
    visited.add(node);
    steps.push({
      graph: { adjList, nodes },
      queue: [...stack],
      visited: new Set(visited),
      activeNode: node,
      comparing: [],
      codeLine: 7,
      description: `Visiting node ${node} for the first time`,
    });

    // Explorar vecinos
    const neighbors = adjList[node] || [];
    for (const neighbor of neighbors) {
      steps.push({
        graph: { adjList, nodes },
        queue: [...stack],
        visited: new Set(visited),
        activeNode: node,
        comparing: [neighbor],
        codeLine: 8,
        description: `Checking neighbor ${neighbor} of node ${node}`,
      });

      steps.push({
        graph: { adjList, nodes },
        queue: [...stack],
        visited: new Set(visited),
        activeNode: node,
        comparing: [neighbor],
        codeLine: 9,
        description: `Has node ${neighbor} been visited?`,
      });

      if (!visited.has(neighbor)) {
        stack.push(neighbor);
        steps.push({
          graph: { adjList, nodes },
          queue: [...stack],
          visited: new Set(visited),
          activeNode: node,
          comparing: [neighbor],
          codeLine: 10,
          description: `Pushing unvisited neighbor ${neighbor} onto the stack`,
        });
      } else {
        steps.push({
          graph: { adjList, nodes },
          queue: [...stack],
          visited: new Set(visited),
          activeNode: node,
          comparing: [neighbor],
          codeLine: 9,
          description: `Node ${neighbor} already visited. Skipping.`,
        });
      }
    }
  }

  // Paso final: recorrido completo
  steps.push({
    graph: { adjList, nodes },
    queue: [],
    visited: new Set(visited),
    activeNode: null,
    comparing: [],
    codeLine: 13,
    description: 'DFS traversal complete!',
  });

  return { steps, totalSteps: steps.length };
}
