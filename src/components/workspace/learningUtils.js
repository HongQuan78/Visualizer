const TYPE_OPERATIONS = {
  array: {
    init: 'Setup',
    compare: 'Compare',
    swap: 'Swap',
    partition: 'Partition',
    pivot: 'Pivot',
    merge: 'Merge',
    place: 'Place',
    complete: 'Complete',
  },
  graph: {
    init: 'Setup',
    visit: 'Visit',
    inspect: 'Inspect',
    enqueue: 'Enqueue',
    push: 'Push',
    pop: 'Pop',
    relax: 'Relax',
    skip: 'Skip',
    complete: 'Complete',
  },
  tree: {
    init: 'Setup',
    compare: 'Compare',
    traverse: 'Traverse',
    insert: 'Insert',
    complete: 'Complete',
  },
  dp: {
    init: 'Setup',
    lookup: 'Lookup',
    compute: 'Compute',
    store: 'Store',
    complete: 'Complete',
  },
};

export function getOperationBadge(step, type, algoId) {
  const operation = getStepOperation(step, type, algoId);
  const label = TYPE_OPERATIONS[type]?.[operation] || toTitleCase(operation);

  return {
    id: operation,
    label,
    tone: operation,
  };
}

export function getStepOperation(step, type, algoId) {
  return step?.operation || inferOperation(step, type, algoId);
}

export function getStepWhy(step, type, algoId, learning = {}) {
  const operation = getStepOperation(step, type, algoId);
  const algorithmWhy = learning.whyByOperation?.[operation];
  const typeWhy = DEFAULT_WHY[type]?.[operation];

  return step?.why || algorithmWhy || typeWhy || DEFAULT_WHY.generic;
}

export function getComplexityPhase(step, learning = {}) {
  const line = step?.codeLine;

  if (Array.isArray(learning.complexityPhases)) {
    return learning.complexityPhases.find((phase) => {
      if (Array.isArray(phase.lines)) return phase.lines.includes(line);
      return line >= phase.from && line <= phase.to;
    });
  }

  return null;
}

function inferOperation(step, type, algoId) {
  if (!step) return 'init';

  if (isComplete(step)) return 'complete';

  if (type === 'array') return inferArrayOperation(step, algoId);
  if (type === 'graph') return inferGraphOperation(step, algoId);
  if (type === 'tree') return inferTreeOperation(step);
  if (type === 'dp') return inferDpOperation(step);

  return 'init';
}

function inferArrayOperation(step, algoId) {
  const text = (step.description || '').toLowerCase();

  if (step.swapping?.length) return text.includes('copy') || text.includes('temp') ? 'place' : 'swap';
  if (text.includes('pivot')) return 'pivot';
  if (text.includes('partition')) return 'partition';
  if (text.includes('merge') || text.includes('temp') || text.includes('push')) return 'merge';
  if (step.comparing?.length) return 'compare';
  if (algoId === 'quick-sort' && step.activeRange) return 'partition';
  if (text.includes('sorted') || text.includes('returning')) return 'complete';

  return 'init';
}

function inferGraphOperation(step, algoId) {
  const text = (step.description || '').toLowerCase();

  if (algoId === 'dijkstra' && [9, 10, 11, 12, 13].includes(step.codeLine)) return 'relax';
  if (text.includes('visited') || text.includes('finalize')) return 'visit';
  if (text.includes('queue') || text.includes('enqueue')) return 'enqueue';
  if (text.includes('stack') || text.includes('push')) return 'push';
  if (text.includes('popped') || text.includes('dequeued') || text.includes('extract')) return 'pop';
  if (text.includes('skip') || text.includes('already')) return 'skip';
  if (step.comparing?.length) return 'inspect';

  return 'init';
}

function inferTreeOperation(step) {
  const text = (step.description || '').toLowerCase();

  if (step.newNode !== null && step.newNode !== undefined) return 'insert';
  if (text.includes('insert')) return 'insert';
  if (step.comparing?.length) return 'compare';
  if (step.traversalPath?.length) return 'traverse';

  return 'init';
}

function inferDpOperation(step) {
  const text = (step.description || '').toLowerCase();

  if (step.referencing?.length) return 'lookup';
  if (text.includes('base') || text.includes('store')) return 'store';
  if (step.currentIndex !== null && step.currentIndex !== undefined) return 'compute';

  return 'init';
}

function isComplete(step) {
  return /complete|sorted|returning result|shortest path is locked/i.test(step.description || '');
}

function toTitleCase(value = '') {
  return value
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

const DEFAULT_WHY = {
  generic: 'This snapshot connects the visual state to the active line of code so the next state change is easier to predict.',
  array: {
    compare: 'Comparisons are the questions that decide whether values are already in a useful order.',
    swap: 'A swap is the moment the array actually changes, turning a comparison into progress.',
    partition: 'The active range keeps attention on the part of the array this recursive call owns.',
    pivot: 'The pivot gives Quick Sort a boundary: smaller values move left, larger values move right.',
    merge: 'Merging rebuilds a sorted range from smaller sorted pieces.',
    place: 'Copying a chosen value back records the sorted work into the main array.',
  },
  graph: {
    visit: 'Visited nodes are locked in for traversal order, so the search does not loop forever.',
    inspect: 'Inspecting an edge is how the algorithm discovers what choices are available next.',
    enqueue: 'The queue preserves breadth-first order: earlier discoveries are explored first.',
    push: 'The stack preserves depth-first order: the newest discovery is explored next.',
    pop: 'Removing a node selects the next frontier item to expand.',
    relax: 'Relaxation asks whether this edge gives a shorter route than the best route known so far.',
    skip: 'Skipping already-settled work keeps the traversal focused and prevents repeated effort.',
  },
  tree: {
    compare: 'Each comparison chooses a left or right branch, cutting away half of the remaining search path.',
    traverse: 'The traversal path shows the decisions that lead to the insertion point.',
    insert: 'Insertion preserves the binary-search-tree rule by attaching the new value at the first empty branch.',
  },
  dp: {
    lookup: 'A lookup reuses solved subproblems instead of recomputing the same answer.',
    compute: 'The current cell combines smaller answers into the next larger answer.',
    store: 'Storing the result makes it available to future cells in constant time.',
  },
};
