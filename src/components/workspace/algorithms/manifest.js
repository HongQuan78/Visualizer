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
const ARRAY_INPUT = {
  kind: 'array',
  presets: ['random', 'sorted', 'reverse', 'nearly-sorted'],
};
const ARRAY_LEGEND = [
  { label: 'Comparing values', tone: 'compare' },
  { label: 'Swapping or placing', tone: 'swap' },
  { label: 'Sorted or fixed', tone: 'complete' },
  { label: 'Outside active range', tone: 'muted' },
];
const GRAPH_LEGEND = [
  { label: 'Active node', tone: 'compare' },
  { label: 'Neighbor under inspection', tone: 'swap' },
  { label: 'Visited or finalized', tone: 'visit' },
  { label: 'Shortest path edge', tone: 'complete' },
];
const TREE_LEGEND = [
  { label: 'Current node', tone: 'compare' },
  { label: 'Comparison target', tone: 'swap' },
  { label: 'Traversal path', tone: 'visit' },
  { label: 'New insertion', tone: 'complete' },
];
const DP_LEGEND = [
  { label: 'Current cell', tone: 'compare' },
  { label: 'Referenced cells', tone: 'visit' },
  { label: 'Computed cells', tone: 'muted' },
  { label: 'Final answer', tone: 'complete' },
];
const SORTING_LEARNING = {
  legend: ARRAY_LEGEND,
  complexityPhases: [
    { from: 1, to: 4, label: 'Outer work', note: 'The algorithm chooses which region or pass is active. This is where the repeated structure creates the overall running time.' },
    { from: 5, to: 13, label: 'Decision work', note: 'Comparisons and local moves dominate the cost because they happen many times across the input.' },
    { from: 14, to: 19, label: 'Placement work', note: 'Placement records progress: one value, pivot, or merged segment becomes easier to trust.' },
  ],
};
const QUICK_SORT_LEARNING = {
  ...SORTING_LEARNING,
  whyByOperation: {
    partition: 'Partitioning is the main trick: after one scan, the pivot lands where it belongs.',
    pivot: 'The pivot is the reference value that splits this range into smaller recursive problems.',
    compare: 'Each comparison decides which side of the pivot the scanned value should live on.',
    swap: 'Swapping grows the less-than-or-equal partition without needing extra arrays.',
    complete: 'Once every pivot has been fixed, all ranges collapse into a sorted array.',
  },
};
const GRAPH_TRAVERSAL_LEARNING = {
  legend: GRAPH_LEGEND,
  complexityPhases: [
    { from: 1, to: 3, label: 'Initialization', note: 'The start node and frontier structure determine where the search begins.' },
    { from: 4, to: 6, label: 'Frontier expansion', note: 'Each node is removed from the frontier once its neighbors are ready to inspect.' },
    { from: 7, to: 10, label: 'Discovery', note: 'Every edge can lead to a new node, so traversal cost grows with vertices plus edges.' },
  ],
};
const DIJKSTRA_LEARNING = {
  legend: GRAPH_LEGEND,
  complexityPhases: [
    { from: 1, to: 3, label: 'Initialization', note: 'Distances begin at infinity except the start node, which seeds the priority queue.' },
    { from: 4, to: 7, label: 'Extract minimum', note: 'The priority queue chooses the unsettled node with the best known distance.' },
    { from: 8, to: 13, label: 'Relax edges', note: 'Each edge may improve a distance, and queue operations drive the O(E log V) cost.' },
    { from: 14, to: 18, label: 'Result', note: 'The previous map reconstructs the shortest path after distances are settled.' },
  ],
  whyByOperation: {
    relax: "Relaxation is Dijkstra's core move: replace an old route only when this edge proves a shorter one.",
    visit: 'Finalizing a node means no future route can beat its current distance.',
    inspect: 'Every inspected edge is a chance to discover a better path to a neighbor.',
    pop: 'Extracting the minimum keeps the algorithm greedy and correct for non-negative weights.',
    complete: 'The final path follows the chain of best predecessors chosen during relaxation.',
  },
};
const TREE_LEARNING = {
  legend: TREE_LEGEND,
  complexityPhases: [
    { from: 1, to: 2, label: 'Choose position', note: 'The current value is compared against nodes already in the tree.' },
    { from: 3, to: 7, label: 'Branch decision', note: 'Each decision moves left or right, so balanced trees keep insertion near O(log n).' },
    { from: 8, to: 10, label: 'Attach node', note: 'The new value is linked at the first empty child while preserving BST order.' },
  ],
};
const DP_LEARNING = {
  legend: DP_LEGEND,
  complexityPhases: [
    { from: 1, to: 3, label: 'Base cases', note: 'Base cells anchor the recurrence so later cells have reliable smaller answers.' },
    { from: 4, to: 7, label: 'Tabulation', note: 'Each cell is computed once from earlier cells, giving linear time for Fibonacci.' },
    { from: 8, to: 8, label: 'Return answer', note: 'The target cell holds the answer because every dependency before it has already been stored.' },
  ],
};

export const ALGORITHM_MANIFEST = [
  {
    id: 'two-sum',
    type: 'array',
    category: 'Arrays',
    icon: 'data_array',
    available: true,
    size: ARRAY_SIZE,
    input: ARRAY_INPUT,
    generator: generateTwoSumSteps,
    dataGenerator: generateTwoSumArray,
    meta: TWO_SUM_META,
    code: TWO_SUM_CODE,
    learning: SORTING_LEARNING,
  },
  {
    id: 'bubble-sort',
    type: 'array',
    category: 'Sorting',
    icon: 'reorder',
    available: true,
    size: ARRAY_SIZE,
    input: ARRAY_INPUT,
    generator: generateBubbleSortSteps,
    dataGenerator: generateRandomArray,
    meta: BUBBLE_SORT_META,
    code: BUBBLE_SORT_CODE,
    learning: {
      ...SORTING_LEARNING,
      whyByOperation: {
        compare: 'Bubble Sort only needs local questions: if adjacent values are inverted, they should trade places.',
        swap: 'A swap moves the larger value one step right, steadily bubbling it toward its final position.',
        complete: 'After enough passes, every large value has drifted to the right place.',
      },
    },
  },
  {
    id: 'selection-sort',
    type: 'array',
    category: 'Sorting',
    icon: 'reorder',
    available: true,
    size: ARRAY_SIZE,
    input: ARRAY_INPUT,
    generator: generateSelectionSortSteps,
    dataGenerator: generateRandomArray,
    meta: SELECTION_SORT_META,
    code: SELECTION_SORT_CODE,
    learning: SORTING_LEARNING,
  },
  {
    id: 'insertion-sort',
    type: 'array',
    category: 'Sorting',
    icon: 'reorder',
    available: true,
    size: ARRAY_SIZE,
    input: ARRAY_INPUT,
    generator: generateInsertionSortSteps,
    dataGenerator: generateRandomArray,
    meta: INSERTION_SORT_META,
    code: INSERTION_SORT_CODE,
    learning: SORTING_LEARNING,
  },
  {
    id: 'merge-sort',
    type: 'array',
    category: 'Sorting',
    icon: 'reorder',
    available: true,
    size: ARRAY_SIZE,
    input: ARRAY_INPUT,
    generator: generateMergeSortSteps,
    dataGenerator: generateRandomArray,
    meta: MERGE_SORT_META,
    code: MERGE_SORT_CODE,
    learning: {
      ...SORTING_LEARNING,
      whyByOperation: {
        partition: 'Splitting creates small sorted pieces that are easier to merge correctly.',
        compare: 'Comparing the front values of two sorted halves reveals the next smallest output.',
        merge: 'The temp array gathers values in sorted order before copying them back.',
        place: 'Copying back turns the merged temp result into the source for larger merges.',
        complete: 'When the top-level merge finishes, the whole array is sorted.',
      },
    },
  },
  {
    id: 'quick-sort',
    type: 'array',
    category: 'Sorting',
    icon: 'reorder',
    available: true,
    size: ARRAY_SIZE,
    input: ARRAY_INPUT,
    generator: generateQuickSortSteps,
    dataGenerator: generateRandomArray,
    meta: QUICK_SORT_META,
    code: QUICK_SORT_CODE,
    learning: QUICK_SORT_LEARNING,
  },
  {
    id: 'bfs',
    type: 'graph',
    category: 'Graphs',
    icon: 'hub',
    available: true,
    size: GRAPH_SIZE,
    input: { kind: 'graph' },
    generator: generateBFSSteps,
    dataGenerator: generateRandomGraph,
    meta: BFS_META,
    code: BFS_CODE,
    learning: {
      ...GRAPH_TRAVERSAL_LEARNING,
      whyByOperation: {
        enqueue: 'BFS uses the queue to preserve discovery order, which creates level-by-level traversal.',
        visit: 'Marking a node visited prevents duplicate work and records the shortest unweighted path depth.',
        inspect: 'Checking each neighbor is how the current level reveals the next level.',
        pop: 'Dequeuing selects the oldest discovered node, keeping BFS broad before deep.',
      },
    },
  },
  {
    id: 'dfs',
    type: 'graph',
    category: 'Graphs',
    icon: 'hub',
    available: true,
    size: GRAPH_SIZE,
    input: { kind: 'graph' },
    generator: generateDFSSteps,
    dataGenerator: generateRandomGraph,
    meta: DFS_META,
    code: DFS_CODE,
    learning: {
      ...GRAPH_TRAVERSAL_LEARNING,
      whyByOperation: {
        push: 'DFS uses the stack to dive into the newest discovered branch first.',
        visit: 'Visiting locks in that this branch has been reached and should not be repeated.',
        inspect: 'Checking neighbors chooses where the depth-first search can dive next.',
        pop: 'Popping selects the most recent frontier node, which creates depth-first behavior.',
      },
    },
  },
  {
    id: 'dijkstra',
    type: 'graph',
    category: 'Graphs',
    icon: 'hub',
    available: true,
    size: GRAPH_SIZE,
    input: { kind: 'graph', weighted: true },
    generator: generateDijkstraSteps,
    dataGenerator: generateWeightedGraph,
    meta: DIJKSTRA_META,
    code: DIJKSTRA_CODE,
    learning: DIJKSTRA_LEARNING,
  },
  {
    id: 'fibonacci',
    type: 'dp',
    category: 'Dynamic',
    icon: 'layers',
    available: true,
    size: DP_SIZE,
    input: { kind: 'dp' },
    generator: generateFibonacciSteps,
    dataGenerator: generateFibonacciInput,
    meta: FIBONACCI_META,
    code: FIBONACCI_CODE,
    learning: DP_LEARNING,
  },
  {
    id: 'knapsack',
    type: 'dp',
    category: 'Dynamic',
    icon: 'layers',
    available: false,
    size: DP_SIZE,
    input: { kind: 'dp' },
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
    input: { kind: 'tree' },
    generator: generateBSTInsertSteps,
    dataGenerator: generateRandomBSTValues,
    meta: BST_INSERT_META,
    code: BST_INSERT_CODE,
    learning: TREE_LEARNING,
  },
  {
    id: 'red-black',
    type: 'tree',
    category: 'Trees',
    icon: 'account_tree',
    available: false,
    size: TREE_SIZE,
    input: { kind: 'tree' },
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
const REQUIRED_META_FIELDS = ['name', 'timeComplexity', 'spaceComplexity', 'category', 'tag'];
const REQUIRED_SIZE_FIELDS = ['default', 'min', 'max'];

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

export function validateAlgorithmManifest(manifest = ALGORITHM_MANIFEST) {
  const errors = [];
  const ids = new Set();

  manifest.forEach((algorithm, index) => {
    const label = algorithm.id || `entry-${index}`;

    if (!algorithm.id) {
      errors.push(`${label}: missing id`);
    } else if (ids.has(algorithm.id)) {
      errors.push(`${label}: duplicate id`);
    }
    ids.add(algorithm.id);

    if (!algorithm.type) errors.push(`${label}: missing type`);
    if (!algorithm.category) errors.push(`${label}: missing category`);
    if (!algorithm.icon) errors.push(`${label}: missing icon`);
    if (!algorithm.input?.kind) errors.push(`${label}: missing input.kind`);
    if (!algorithm.meta) {
      errors.push(`${label}: missing meta`);
    } else {
      REQUIRED_META_FIELDS.forEach((field) => {
        if (!algorithm.meta[field]) errors.push(`${label}: missing meta.${field}`);
      });
    }

    if (!algorithm.size) {
      errors.push(`${label}: missing size`);
    } else {
      REQUIRED_SIZE_FIELDS.forEach((field) => {
        if (typeof algorithm.size[field] !== 'number') {
          errors.push(`${label}: missing numeric size.${field}`);
        }
      });
      if (algorithm.size.min > algorithm.size.default || algorithm.size.default > algorithm.size.max) {
        errors.push(`${label}: size.default must be between size.min and size.max`);
      }
    }

    if (algorithm.available) {
      if (typeof algorithm.generator !== 'function') errors.push(`${label}: available algorithm missing generator`);
      if (typeof algorithm.dataGenerator !== 'function') errors.push(`${label}: available algorithm missing dataGenerator`);
      if (!Array.isArray(algorithm.code) || algorithm.code.length === 0) {
        errors.push(`${label}: available algorithm missing code`);
      }
    }
  });

  return errors;
}

export function assertValidAlgorithmManifest(manifest = ALGORITHM_MANIFEST) {
  const errors = validateAlgorithmManifest(manifest);

  if (errors.length > 0) {
    throw new Error(`Invalid algorithm manifest:\n${errors.join('\n')}`);
  }

  return true;
}
