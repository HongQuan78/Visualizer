/**
 * Registro centralizado de algoritmos disponibles.
 * Cada categoría contiene un grupo de algoritmos con sus metadatos.
 *
 * 'available' indica si el algoritmo está implementado.
 */

const ALGORITHM_REGISTRY = [
  {
    category: 'Sorting',
    icon: 'reorder',
    algorithms: [
      {
        id: 'bubble-sort',
        name: 'Bubble Sort',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        tag: 'Comparison',
        available: true,
      },
      {
        id: 'selection-sort',
        name: 'Selection Sort',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        tag: 'Comparison',
        available: true,
      },
      {
        id: 'insertion-sort',
        name: 'Insertion Sort',
        timeComplexity: 'O(n²)',
        spaceComplexity: 'O(1)',
        tag: 'Comparison',
        available: true,
      },
      {
        id: 'merge-sort',
        name: 'Merge Sort',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(n)',
        tag: 'Divide & Conquer',
        available: true,
      },
      {
        id: 'quick-sort',
        name: 'Quick Sort',
        timeComplexity: 'O(n log n)',
        spaceComplexity: 'O(log n)',
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
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V)',
        tag: 'Traversal',
        available: true,
      },
      {
        id: 'dfs',
        name: 'DFS',
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V)',
        tag: 'Traversal',
        available: true,
      },
      {
        id: 'dijkstra',
        name: "Dijkstra's",
        timeComplexity: 'O(E log V)',
        spaceComplexity: 'O(V)',
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
        timeComplexity: 'O(n)',
        spaceComplexity: 'O(n)',
        tag: 'Memoization',
        available: true,
      },
      {
        id: 'knapsack',
        name: 'Knapsack 0/1',
        timeComplexity: 'O(nW)',
        spaceComplexity: 'O(nW)',
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
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
        tag: 'Binary Tree',
        available: true,
      },
      {
        id: 'red-black',
        name: 'Red-Black Tree',
        timeComplexity: 'O(log n)',
        spaceComplexity: 'O(1)',
        tag: 'Self-Balancing',
        available: false,
      },
    ],
  },
];

export default ALGORITHM_REGISTRY;
