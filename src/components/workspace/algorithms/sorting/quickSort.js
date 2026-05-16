export const QUICK_SORT_CODE = [
  { line: 1, text: 'function quickSort(arr, low, high) {' },
  { line: 2, text: '  if (low >= high) return;' },
  { line: 3, text: '  const pivotIndex = partition(arr, low, high);' },
  { line: 4, text: '  quickSort(arr, low, pivotIndex - 1);' },
  { line: 5, text: '  quickSort(arr, pivotIndex + 1, high);' },
  { line: 6, text: '}' },
  { line: 7, text: '' },
  { line: 8, text: 'function partition(arr, low, high) {' },
  { line: 9, text: '  const pivot = arr[high];' },
  { line: 10, text: '  let i = low;' },
  { line: 11, text: '  for (let j = low; j < high; j++) {' },
  { line: 12, text: '    if (arr[j] <= pivot) {' },
  { line: 13, text: '      swap(arr[i], arr[j]);' },
  { line: 14, text: '      i++;' },
  { line: 15, text: '    }' },
  { line: 16, text: '  }' },
  { line: 17, text: '  swap(arr[i], arr[high]);' },
  { line: 18, text: '  return i;' },
  { line: 19, text: '}' },
];

export const QUICK_SORT_META = {
  name: 'Quick Sort',
  timeComplexity: 'O(n log n)',
  spaceComplexity: 'O(log n)',
  category: 'Sorting',
  tag: 'Divide & Conquer',
};

export function generateQuickSortSteps(inputArray) {
  const arr = [...inputArray];
  const steps = [];
  const sorted = new Set();

  function addStep(codeLine, description, comparing = [], swapping = null, activeRange = null) {
    steps.push({
      array: [...arr],
      comparing,
      swapping,
      sorted: new Set(sorted),
      activeRange,
      codeLine,
      description,
    });
  }

  addStep(1, 'Initializing Quick Sort...', [], null, [0, arr.length - 1]);

  function quickSort(low, high) {
    addStep(1, `quickSort(arr, ${low}, ${high})`, [], null, [low, high]);
    addStep(2, `Check base case: low (${low}) >= high (${high})`, [], null, [low, high]);

    if (low > high) return;

    if (low === high) {
      sorted.add(low);
      addStep(2, `Range [${low}, ${high}] has one item, so it is already sorted.`, [low], null, [low, high]);
      return;
    }

    addStep(3, `Partition range [${low}, ${high}] around pivot arr[${high}] = ${arr[high]}.`, [high], null, [low, high]);
    const pivotIndex = partition(low, high);
    sorted.add(pivotIndex);
    addStep(3, `Pivot ${arr[pivotIndex]} is fixed at index ${pivotIndex}.`, [pivotIndex], null, [low, high]);

    addStep(4, `Sort left partition [${low}, ${pivotIndex - 1}].`, [], null, [low, pivotIndex - 1]);
    quickSort(low, pivotIndex - 1);

    addStep(5, `Sort right partition [${pivotIndex + 1}, ${high}].`, [], null, [pivotIndex + 1, high]);
    quickSort(pivotIndex + 1, high);
  }

  function partition(low, high) {
    addStep(8, `partition(arr, ${low}, ${high})`, [], null, [low, high]);

    const pivot = arr[high];
    addStep(9, `Choose pivot arr[${high}] = ${pivot}.`, [high], null, [low, high]);

    let i = low;
    addStep(10, `Set boundary i = ${i}. Values before i are <= pivot.`, [i, high], null, [low, high]);

    for (let j = low; j < high; j++) {
      addStep(11, `Scan j = ${j}. Compare arr[${j}] with pivot ${pivot}.`, [j, high], null, [low, high]);
      addStep(12, `Is ${arr[j]} <= ${pivot}?`, [j, high], null, [low, high]);

      if (arr[j] <= pivot) {
        if (i !== j) {
          const leftValue = arr[i];
          const rightValue = arr[j];
          [arr[i], arr[j]] = [arr[j], arr[i]];
          addStep(13, `Swap ${leftValue} and ${rightValue}; grow the <= pivot partition.`, [i, j, high], [i, j], [low, high]);
        } else {
          addStep(13, `arr[${j}] is already in the <= pivot partition.`, [i, j, high], null, [low, high]);
        }

        i++;
        addStep(14, `Move boundary i to ${i}.`, [Math.min(i, high), high], null, [low, high]);
      }
    }

    if (i !== high) {
      const boundaryValue = arr[i];
      [arr[i], arr[high]] = [arr[high], arr[i]];
      addStep(17, `Place pivot ${pivot} by swapping it with ${boundaryValue}.`, [i, high], [i, high], [low, high]);
    } else {
      addStep(17, `Pivot ${pivot} is already in the correct boundary position.`, [i], null, [low, high]);
    }

    addStep(18, `Return pivot index ${i}.`, [i], null, [low, high]);
    return i;
  }

  quickSort(0, arr.length - 1);

  for (let i = 0; i < arr.length; i++) sorted.add(i);
  addStep(6, 'Quick Sort complete!', [], null, [0, arr.length - 1]);

  return { steps, totalSteps: steps.length };
}
