import { generateTwoSumSteps, generateTwoSumArray, TWO_SUM_META, TWO_SUM_CODE } from './arrays/twoSum';
import { generateBubbleSortSteps, generateRandomArray, BUBBLE_SORT_META, BUBBLE_SORT_CODE } from './sorting/bubbleSort';
import { generateSelectionSortSteps, SELECTION_SORT_META, SELECTION_SORT_CODE } from './sorting/selectionSort';
import { generateInsertionSortSteps, INSERTION_SORT_META, INSERTION_SORT_CODE } from './sorting/insertionSort';
import { generateMergeSortSteps, MERGE_SORT_META, MERGE_SORT_CODE } from './sorting/mergeSort';
import { generateQuickSortSteps, QUICK_SORT_META, QUICK_SORT_CODE } from './sorting/quickSort';
import { generateBFSSteps, generateRandomGraph, BFS_META, BFS_CODE } from './graphs/bfs';
import { generateDFSSteps, DFS_META, DFS_CODE } from './graphs/dfs';
import { generateDijkstraSteps, generateWeightedGraph, DIJKSTRA_META, DIJKSTRA_CODE } from './graphs/dijkstra';
import { generateBSTInsertSteps, generateRandomBSTValues, BST_INSERT_META, BST_INSERT_CODE } from './trees/bstInsert';
import { generateFibonacciSteps, generateFibonacciInput, FIBONACCI_META, FIBONACCI_CODE } from './dynamic/fibonacci';

const ARRAY_SIZE = { default: 12, min: 4, max: 30 };
const GRAPH_SIZE = { default: 8, min: 4, max: 12 };
const TREE_SIZE = { default: 8, min: 4, max: 12 };
const DP_SIZE = { default: 10, min: 2, max: 15 };

export const ALGORITHM_MANIFEST = [
  {
    id: 'two-sum',
    type: 'array',
    category: 'Arrays',
    icon: 'data_array',
    available: true,
    size: ARRAY_SIZE,
    generator: generateTwoSumSteps,
    dataGenerator: generateTwoSumArray,
    meta: TWO_SUM_META,
    code: TWO_SUM_CODE,
  },
  {
    id: 'bubble-sort',
    type: 'array',
    category: 'Sorting',
    icon: 'reorder',
    available: true,
    size: ARRAY_SIZE,
    generator: generateBubbleSortSteps,
    dataGenerator: generateRandomArray,
    meta: BUBBLE_SORT_META,
    code: BUBBLE_SORT_CODE,
  },
  {
    id: 'selection-sort',
    type: 'array',
    category: 'Sorting',
    icon: 'reorder',
    available: true,
    size: ARRAY_SIZE,
    generator: generateSelectionSortSteps,
    dataGenerator: generateRandomArray,
    meta: SELECTION_SORT_META,
    code: SELECTION_SORT_CODE,
  },
  {
    id: 'insertion-sort',
    type: 'array',
    category: 'Sorting',
    icon: 'reorder',
    available: true,
    size: ARRAY_SIZE,
    generator: generateInsertionSortSteps,
    dataGenerator: generateRandomArray,
    meta: INSERTION_SORT_META,
    code: INSERTION_SORT_CODE,
  },
  {
    id: 'merge-sort',
    type: 'array',
    category: 'Sorting',
    icon: 'reorder',
    available: true,
    size: ARRAY_SIZE,
    generator: generateMergeSortSteps,
    dataGenerator: generateRandomArray,
    meta: MERGE_SORT_META,
    code: MERGE_SORT_CODE,
  },
  {
    id: 'quick-sort',
    type: 'array',
    category: 'Sorting',
    icon: 'reorder',
    available: true,
    size: ARRAY_SIZE,
    generator: generateQuickSortSteps,
    dataGenerator: generateRandomArray,
    meta: QUICK_SORT_META,
    code: QUICK_SORT_CODE,
  },
  {
    id: 'bfs',
    type: 'graph',
    category: 'Graphs',
    icon: 'hub',
    available: true,
    size: GRAPH_SIZE,
    generator: generateBFSSteps,
    dataGenerator: generateRandomGraph,
    meta: BFS_META,
    code: BFS_CODE,
  },
  {
    id: 'dfs',
    type: 'graph',
    category: 'Graphs',
    icon: 'hub',
    available: true,
    size: GRAPH_SIZE,
    generator: generateDFSSteps,
    dataGenerator: generateRandomGraph,
    meta: DFS_META,
    code: DFS_CODE,
  },
  {
    id: 'dijkstra',
    type: 'graph',
    category: 'Graphs',
    icon: 'hub',
    available: true,
    size: GRAPH_SIZE,
    generator: generateDijkstraSteps,
    dataGenerator: generateWeightedGraph,
    meta: DIJKSTRA_META,
    code: DIJKSTRA_CODE,
  },
  {
    id: 'fibonacci',
    type: 'dp',
    category: 'Dynamic',
    icon: 'layers',
    available: true,
    size: DP_SIZE,
    generator: generateFibonacciSteps,
    dataGenerator: generateFibonacciInput,
    meta: FIBONACCI_META,
    code: FIBONACCI_CODE,
  },
  {
    id: 'knapsack',
    type: 'dp',
    category: 'Dynamic',
    icon: 'layers',
    available: false,
    size: DP_SIZE,
    meta: {
      name: 'Knapsack 0/1',
      timeComplexity: 'O(nW)',
      spaceComplexity: 'O(nW)',
      category: 'Dynamic',
      tag: 'Tabulation',
    },
    code: [],
  },
  {
    id: 'bst-insert',
    type: 'tree',
    category: 'Trees',
    icon: 'account_tree',
    available: true,
    size: TREE_SIZE,
    generator: generateBSTInsertSteps,
    dataGenerator: generateRandomBSTValues,
    meta: BST_INSERT_META,
    code: BST_INSERT_CODE,
  },
  {
    id: 'red-black',
    type: 'tree',
    category: 'Trees',
    icon: 'account_tree',
    available: false,
    size: TREE_SIZE,
    meta: {
      name: 'Red-Black Tree',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      category: 'Trees',
      tag: 'Self-Balancing',
    },
    code: [],
  },
];

export const DEFAULT_ALGORITHM_ID = 'bubble-sort';

export const ALGORITHM_CONFIG = Object.fromEntries(
  ALGORITHM_MANIFEST.map((algorithm) => [algorithm.id, algorithm])
);

export const ALGORITHM_GROUPS = ALGORITHM_MANIFEST.reduce((groups, algorithm) => {
  let group = groups.find((item) => item.category === algorithm.category);

  if (!group) {
    group = {
      category: algorithm.category,
      icon: algorithm.icon,
      algorithms: [],
    };
    groups.push(group);
  }

  group.algorithms.push({
    id: algorithm.id,
    name: algorithm.meta.name,
    timeComplexity: algorithm.meta.timeComplexity,
    spaceComplexity: algorithm.meta.spaceComplexity,
    tag: algorithm.meta.tag,
    available: algorithm.available,
  });

  return groups;
}, []);

export function getAlgorithmConfig(algorithmId) {
  return ALGORITHM_CONFIG[algorithmId] || ALGORITHM_CONFIG[DEFAULT_ALGORITHM_ID];
}

export function getDefaultDataSize(config) {
  return config.size?.default || ARRAY_SIZE.default;
}

export function clampDataSize(config, size) {
  const range = config.size || ARRAY_SIZE;
  return Math.max(range.min, Math.min(range.max, size));
}
