/**
 * Registro centralizado de algoritmos disponibles.
 * Cada categoría contiene un grupo de algoritmos con sus metadatos.
 *
 * 'available' indica si el algoritmo está implementado (fase 1: solo Bubble Sort).
 */

const ALGORITHM_REGISTRY = [
  {
    category: 'Sorting',
    icon: 'reorder',
    algorithms: [
      {
        id: 'bubble-sort',
        name: 'Bubble Sort',
        complexity: 'O(n²)',
        tag: 'Comparison',
        available: true,
      },
      {
        id: 'selection-sort',
        name: 'Selection Sort',
        complexity: 'O(n²)',
        tag: 'Comparison',
        available: true,
      },
      {
        id: 'insertion-sort',
        name: 'Insertion Sort',
        complexity: 'O(n²)',
        tag: 'Comparison',
        available: false,
      },
      {
        id: 'merge-sort',
        name: 'Merge Sort',
        complexity: 'O(n log n)',
        tag: 'Divide & Conquer',
        available: false,
      },
      {
        id: 'quick-sort',
        name: 'Quick Sort',
        complexity: 'O(n log n)',
        tag: 'Divide & Conquer',
        available: false,
      },
    ],
  },
  {
    category: 'Graphs',
    icon: 'hub',
    algorithms: [
      {
        id: 'bfs',
        name: 'BFS',
        complexity: 'O(V + E)',
        tag: 'Traversal',
        available: false,
      },
      {
        id: 'dfs',
        name: 'DFS',
        complexity: 'O(V + E)',
        tag: 'Traversal',
        available: false,
      },
      {
        id: 'dijkstra',
        name: "Dijkstra's",
        complexity: 'O(V²)',
        tag: 'Shortest Path',
        available: false,
      },
    ],
  },
  {
    category: 'Dynamic',
    icon: 'layers',
    algorithms: [
      {
        id: 'fibonacci',
        name: 'Fibonacci',
        complexity: 'O(n)',
        tag: 'Memoization',
        available: false,
      },
      {
        id: 'knapsack',
        name: 'Knapsack 0/1',
        complexity: 'O(nW)',
        tag: 'Tabulation',
        available: false,
      },
    ],
  },
  {
    category: 'Trees',
    icon: 'account_tree',
    algorithms: [
      {
        id: 'bst-insert',
        name: 'BST Insert',
        complexity: 'O(log n)',
        tag: 'Binary Tree',
        available: false,
      },
      {
        id: 'red-black',
        name: 'Red-Black Tree',
        complexity: 'O(log n)',
        tag: 'Self-Balancing',
        available: false,
      },
    ],
  },
];

export default ALGORITHM_REGISTRY;
