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

const MODULE_CACHE = new Map();

const LOADERS = {
  'two-sum': () => import('./arrays/twoSum').then((module) => ({
    generator: module.generateTwoSumSteps,
    dataGenerator: module.generateTwoSumArray,
    meta: module.TWO_SUM_META,
    code: module.TWO_SUM_CODE,
  })),
  'bubble-sort': () => import('./sorting/bubbleSort').then((module) => ({
    generator: module.generateBubbleSortSteps,
    dataGenerator: generateRandomArray,
    meta: module.BUBBLE_SORT_META,
    code: module.BUBBLE_SORT_CODE,
  })),
  'selection-sort': () => import('./sorting/selectionSort').then((module) => ({
    generator: module.generateSelectionSortSteps,
    dataGenerator: generateRandomArray,
    meta: module.SELECTION_SORT_META,
    code: module.SELECTION_SORT_CODE,
  })),
  'insertion-sort': () => import('./sorting/insertionSort').then((module) => ({
    generator: module.generateInsertionSortSteps,
    dataGenerator: generateRandomArray,
    meta: module.INSERTION_SORT_META,
    code: module.INSERTION_SORT_CODE,
  })),
  'merge-sort': () => import('./sorting/mergeSort').then((module) => ({
    generator: module.generateMergeSortSteps,
    dataGenerator: generateRandomArray,
    meta: module.MERGE_SORT_META,
    code: module.MERGE_SORT_CODE,
  })),
  'quick-sort': () => import('./sorting/quickSort').then((module) => ({
    generator: module.generateQuickSortSteps,
    dataGenerator: generateRandomArray,
    meta: module.QUICK_SORT_META,
    code: module.QUICK_SORT_CODE,
  })),
  bfs: () => import('./graphs/bfs').then((module) => ({
    generator: module.generateBFSSteps,
    dataGenerator: generateRandomGraph,
    meta: module.BFS_META,
    code: module.BFS_CODE,
  })),
  dfs: () => import('./graphs/dfs').then((module) => ({
    generator: module.generateDFSSteps,
    dataGenerator: generateRandomGraph,
    meta: module.DFS_META,
    code: module.DFS_CODE,
  })),
  dijkstra: () => import('./graphs/dijkstra').then((module) => ({
    generator: module.generateDijkstraSteps,
    dataGenerator: module.generateWeightedGraph,
    meta: module.DIJKSTRA_META,
    code: module.DIJKSTRA_CODE,
  })),
  fibonacci: () => import('./dynamic/fibonacci').then((module) => ({
    generator: module.generateFibonacciSteps,
    dataGenerator: module.generateFibonacciInput,
    meta: module.FIBONACCI_META,
    code: module.FIBONACCI_CODE,
  })),
  'bst-insert': () => import('./trees/bstInsert').then((module) => ({
    generator: module.generateBSTInsertSteps,
    dataGenerator: module.generateRandomBSTValues,
    meta: module.BST_INSERT_META,
    code: module.BST_INSERT_CODE,
  })),
};

function generateRandomArray(size, min = 5, max = 100) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

function generateRandomGraph(nodeCount = 8) {
  const nodes = [];
  const adjList = {};
  const radius = 300;
  const centerX = 500;
  const centerY = 400;

  for (let i = 0; i < nodeCount; i++) {
    const angle = (i / nodeCount) * 2 * Math.PI;
    const id = String.fromCharCode(65 + i);
    nodes.push({
      id,
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    });
    adjList[id] = [];
  }

  for (let i = 0; i < nodeCount; i++) {
    const from = nodes[i].id;
    const targets = Math.floor(Math.random() * 2) + 1;

    for (let j = 0; j < targets; j++) {
      const toIndex = (i + Math.floor(Math.random() * (nodeCount - 1)) + 1) % nodeCount;
      const to = nodes[toIndex].id;

      if (!adjList[from].includes(to) && from !== to) {
        adjList[from].push(to);
        if (!adjList[to].includes(from)) {
          adjList[to].push(from);
        }
      }
    }
  }

  return { nodes, adjList };
}

export const ALGORITHM_MANIFEST = [
  {
    id: 'two-sum',
    type: 'array',
    category: 'Arrays',
    icon: 'data_array',
    available: true,
    size: ARRAY_SIZE,
    input: ARRAY_INPUT,
    loader: LOADERS['two-sum'],
    meta: {
      name: 'Two Sum',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      category: 'Arrays',
      tag: 'Hash Map',
    },
    code: [],
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
    loader: LOADERS['bubble-sort'],
    meta: {
      name: 'Bubble Sort',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      category: 'Sorting',
      tag: 'Comparison',
    },
    code: [],
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
    loader: LOADERS['selection-sort'],
    meta: {
      name: 'Selection Sort',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      category: 'Sorting',
      tag: 'Comparison',
    },
    code: [],
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
    loader: LOADERS['insertion-sort'],
    meta: {
      name: 'Insertion Sort',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      category: 'Sorting',
      tag: 'Comparison',
    },
    code: [],
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
    loader: LOADERS['merge-sort'],
    meta: {
      name: 'Merge Sort',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      category: 'Sorting',
      tag: 'Divide & Conquer',
    },
    code: [],
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
    loader: LOADERS['quick-sort'],
    meta: {
      name: 'Quick Sort',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(log n)',
      category: 'Sorting',
      tag: 'Divide & Conquer',
    },
    code: [],
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
    loader: LOADERS.bfs,
    meta: {
      name: 'Breadth First Search',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      category: 'Graphs',
      tag: 'Traversal',
    },
    code: [],
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
    loader: LOADERS.dfs,
    meta: {
      name: 'Depth First Search',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      category: 'Graphs',
      tag: 'Traversal',
    },
    code: [],
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
    loader: LOADERS.dijkstra,
    meta: {
      name: "Dijkstra's Shortest Path",
      timeComplexity: 'O(E log V)',
      spaceComplexity: 'O(V)',
      category: 'Graphs',
      tag: 'Shortest Path',
    },
    code: [],
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
    loader: LOADERS.fibonacci,
    meta: {
      name: 'Fibonacci',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      category: 'Dynamic',
      tag: 'Memoization',
    },
    code: [],
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
    loader: LOADERS['bst-insert'],
    meta: {
      name: 'BST Insert',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      category: 'Trees',
      tag: 'Binary Tree',
    },
    code: [],
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

export async function loadAlgorithmConfig(algorithmId) {
  const metadata = getAlgorithmConfig(algorithmId);

  if (!metadata.available) return metadata;
  if (MODULE_CACHE.has(metadata.id)) return MODULE_CACHE.get(metadata.id);

  const loadedConfigPromise = metadata.loader().then((implementation) => ({
    ...metadata,
    ...implementation,
    meta: implementation.meta || metadata.meta,
    code: implementation.code || metadata.code,
  }));

  MODULE_CACHE.set(metadata.id, loadedConfigPromise);
  return loadedConfigPromise;
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
      if (typeof algorithm.loader !== 'function') errors.push(`${label}: available algorithm missing loader`);
      if (!Array.isArray(algorithm.code)) {
        errors.push(`${label}: missing code placeholder`);
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

export function validateLoadedAlgorithmConfig(config) {
  const errors = [];
  const label = config.id || 'loaded-algorithm';

  if (typeof config.generator !== 'function') errors.push(`${label}: loaded algorithm missing generator`);
  if (typeof config.dataGenerator !== 'function') errors.push(`${label}: loaded algorithm missing dataGenerator`);
  if (!Array.isArray(config.code) || config.code.length === 0) {
    errors.push(`${label}: loaded algorithm missing code`);
  }

  return errors;
}
