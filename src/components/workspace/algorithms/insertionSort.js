/**
 * Insertion Sort Engine: generates a complete history of snapshots
 * to reproduce the animation step-by-step.
 */

export const INSERTION_SORT_CODE = [
  { line: 1,  text: 'function insertionSort(arr) {' },
  { line: 2,  text: '  const n = arr.length;' },
  { line: 3,  text: '  for (let i = 1; i < n; i++) {' },
  { line: 4,  text: '    let key = arr[i];' },
  { line: 5,  text: '    let j = i - 1;' },
  { line: 6,  text: '    while (j >= 0 && arr[j] > key) {' },
  { line: 7,  text: '      arr[j + 1] = arr[j];' },
  { line: 8,  text: '      j--;' },
  { line: 9,  text: '    }' },
  { line: 10, text: '    arr[j + 1] = key;' },
  { line: 11, text: '  }' },
  { line: 12, text: '  return arr;' },
  { line: 13, text: '}' },
];

export const INSERTION_SORT_META = {
  name: 'Insertion Sort',
  complexity: 'O(n²)',
  category: 'Sorting',
  tag: 'Comparison',
};

export function generateInsertionSortSteps(inputArray) {
  const arr = [...inputArray];
  const n = arr.length;
  const steps = [];
  const sorted = new Set();

  // Initial state
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: null,
    sorted: new Set(sorted),
    codeLine: 1,
    description: 'Starting Insertion Sort...',
  });

  // Index 0 is considered sorted initially
  sorted.add(0);

  for (let i = 1; i < n; i++) {
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: null,
      sorted: new Set(sorted),
      codeLine: 3,
      description: `Outer loop: Pass ${i} (i=${i})`,
    });

    let key = arr[i];
    steps.push({
      array: [...arr],
      comparing: [i],
      swapping: null,
      sorted: new Set(sorted),
      codeLine: 4,
      description: `Key element is ${key} at index ${i}`,
    });

    let j = i - 1;
    steps.push({
      array: [...arr],
      comparing: [i, j],
      swapping: null,
      sorted: new Set(sorted),
      codeLine: 5,
      description: `Starting comparison with sorted sub-array at index ${j}`,
    });

    while (j >= 0) {
      steps.push({
        array: [...arr],
        comparing: [j, j + 1], // Comparing key (which is now at j+1 or represented by key)
        swapping: null,
        sorted: new Set(sorted),
        codeLine: 6,
        description: `Comparing arr[j]=${arr[j]} with key=${key}`,
      });

      if (arr[j] > key) {
        arr[j + 1] = arr[j];
        
        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [j, j + 1],
          sorted: new Set(sorted),
          codeLine: 7,
          description: `arr[j] > key. Shifting ${arr[j]} to the right.`,
        });
        
        j--;
        steps.push({
          array: [...arr],
          comparing: [],
          swapping: null,
          sorted: new Set(sorted),
          codeLine: 8,
          description: `Decrementing j to ${j}`,
        });
      } else {
        break;
      }
    }

    arr[j + 1] = key;
    
    // Add all elements up to i to sorted set
    for (let k = 0; k <= i; k++) {
      sorted.add(k);
    }

    steps.push({
      array: [...arr],
      comparing: [j + 1],
      swapping: null,
      sorted: new Set(sorted),
      codeLine: 10,
      description: `Placed key ${key} at index ${j + 1}`,
    });
  }

  steps.push({
    array: [...arr],
    comparing: [],
    swapping: null,
    sorted: new Set(sorted),
    codeLine: 12,
    description: 'Insertion Sort complete!',
  });

  return { steps, totalSteps: steps.length };
}
