/**
 * Selection Sort Engine: generates a complete history of snapshots
 * to reproduce the animation step-by-step.
 *
 * Each snapshot contains:
 *   - array:        copy of the array at that instant
 *   - comparing:    [i, j] — indices being compared
 *   - swapping:     [i, j] | null — indices being swapped (or null)
 *   - sorted:       Set<index> — indices already in their final position
 *   - codeLine:     active line number in the pseudocode
 *   - description:  descriptive text of the current step
 */

export const SELECTION_SORT_CODE = [
  { line: 1,  text: 'function selectionSort(arr) {' },
  { line: 2,  text: '  const n = arr.length;' },
  { line: 3,  text: '  for (let i = 0; i < n - 1; i++) {' },
  { line: 4,  text: '    let minIdx = i;' },
  { line: 5,  text: '    for (let j = i + 1; j < n; j++) {' },
  { line: 6,  text: '      if (arr[j] < arr[minIdx]) {' },
  { line: 7,  text: '        minIdx = j;' },
  { line: 8,  text: '      }' },
  { line: 9,  text: '    }' },
  { line: 10, text: '    if (minIdx !== i) {' },
  { line: 11, text: '      swap(arr[i], arr[minIdx]);' },
  { line: 12, text: '    }' },
  { line: 13, text: '  }' },
  { line: 14, text: '  return arr;' },
  { line: 15, text: '}' },
];

export const SELECTION_SORT_META = {
  name: 'Selection Sort',
  timeComplexity: 'O(n²)',
  spaceComplexity: 'O(1)',
  category: 'Sorting',
  tag: 'Comparison',
};

export function generateSelectionSortSteps(inputArray) {
  const arr = [...inputArray];
  const n = arr.length;
  const steps = [];
  const sorted = new Set();

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: null,
    sorted: new Set(sorted),
    codeLine: 1,
    description: 'Initializing Selection Sort...',
  });

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: null,
    sorted: new Set(sorted),
    codeLine: 2,
    description: `Array size n = ${n}`,
  });

  for (let i = 0; i < n - 1; i++) {
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: null,
      sorted: new Set(sorted),
      codeLine: 3,
      description: `Outer loop: pass ${i + 1} of ${n - 1}`,
    });

    let minIdx = i;

    steps.push({
      array: [...arr],
      comparing: [i], // Highlight the current minimum
      swapping: null,
      sorted: new Set(sorted),
      codeLine: 4,
      description: `Assume minimum is at index ${minIdx} (value: ${arr[minIdx]})`,
    });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...arr],
        comparing: [minIdx, j], // Highlight current min and current element
        swapping: null,
        sorted: new Set(sorted),
        codeLine: 5,
        description: `Inner loop: looking for smaller element than ${arr[minIdx]} starting from index ${j}`,
      });

      steps.push({
        array: [...arr],
        comparing: [minIdx, j],
        swapping: null,
        sorted: new Set(sorted),
        codeLine: 6,
        description: `Is ${arr[j]} < ${arr[minIdx]}?`,
      });

      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        steps.push({
          array: [...arr],
          comparing: [minIdx], // Highlight new minimum
          swapping: null,
          sorted: new Set(sorted),
          codeLine: 7,
          description: `Found new minimum at index ${minIdx} (value: ${arr[minIdx]})`,
        });
      }
    }

    steps.push({
      array: [...arr],
      comparing: [i, minIdx],
      swapping: null,
      sorted: new Set(sorted),
      codeLine: 10,
      description: `Checking if new minimum index ${minIdx} is different from starting index ${i}`,
    });

    if (minIdx !== i) {
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;

      steps.push({
        array: [...arr],
        comparing: [],
        swapping: [i, minIdx],
        sorted: new Set(sorted),
        codeLine: 11,
        description: `Swapped ${arr[minIdx]} ↔ ${arr[i]}`,
      });
    }
    sorted.add(i);
  }
  
  // Last element is always sorted after n-1 passes
  sorted.add(n - 1);

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: null,
    sorted: new Set(sorted),
    codeLine: 14,
    description: 'Array sorted! Returning result.',
  });

  return { steps, totalSteps: steps.length };
}

export function generateRandomArray(size, min = 5, max = 100) {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
}
