/**
 * Merge Sort Engine: generates a complete history of snapshots
 * to reproduce the animation step-by-step.
 */

export const MERGE_SORT_CODE = [
  { line: 1, text: 'function mergeSort(arr, l, r) {' },
  { line: 2, text: '  if (l >= r) return;' },
  { line: 3, text: '  const m = Math.floor((l + r) / 2);' },
  { line: 4, text: '  mergeSort(arr, l, m);' },
  { line: 5, text: '  mergeSort(arr, m + 1, r);' },
  { line: 6, text: '  merge(arr, l, m, r);' },
  { line: 7, text: '}' },
  { line: 8, text: '' },
  { line: 9, text: 'function merge(arr, l, m, r) {' },
  { line: 10, text: '  let temp = [], i = l, j = m + 1;' },
  { line: 11, text: '  while (i <= m && j <= r) {' },
  { line: 12, text: '    if (arr[i] <= arr[j]) temp.push(arr[i++]);' },
  { line: 13, text: '    else temp.push(arr[j++]);' },
  { line: 14, text: '  }' },
  { line: 15, text: '  while (i <= m) temp.push(arr[i++]);' },
  { line: 16, text: '  while (j <= r) temp.push(arr[j++]);' },
  { line: 17, text: '  for (let k = 0; k < temp.length; k++) arr[l + k] = temp[k];' },
  { line: 18, text: '}' }
];

export const MERGE_SORT_META = {
  name: 'Merge Sort',
  timeComplexity: 'O(n log n)',
  spaceComplexity: 'O(n)',
  category: 'Sorting',
  tag: 'Divide & Conquer',
};

export function generateMergeSortSteps(inputArray) {
  const arr = [...inputArray];
  const steps = [];
  const sorted = new Set();
  
  function addStep(codeLine, description, comparing = [], swapping = null, activeRange = null, tempArray = null, tempOffset = 0) {
    steps.push({
      array: [...arr],
      comparing,
      swapping,
      activeRange,
      tempArray: tempArray ? [...tempArray] : null,
      tempOffset,
      sorted: new Set(sorted),
      codeLine,
      description,
    });
  }

  addStep(1, 'Initializing Merge Sort...', [], null, [0, arr.length - 1]);

  function mergeSort(l, r) {
    addStep(1, `mergeSort(arr, ${l}, ${r})`, [], null, [l, r]);
    
    addStep(2, `Checking base case: l (${l}) >= r (${r})`, [], null, [l, r]);
    if (l >= r) {
      if (l === r) sorted.add(l); // Base case: single element is sorted
      return;
    }

    const m = Math.floor((l + r) / 2);
    addStep(3, `Calculated midpoint m = ${m} for range [${l}, ${r}]`, [], null, [l, r]);

    addStep(4, `Recursively sorting left half [${l}, ${m}]`, [], null, [l, m]);
    mergeSort(l, m);

    addStep(5, `Recursively sorting right half [${m + 1}, ${r}]`, [], null, [m + 1, r]);
    mergeSort(m + 1, r);

    addStep(6, `Merging halves [${l}, ${m}] and [${m + 1}, ${r}]`, [], null, [l, r]);
    merge(l, m, r);
  }

  function merge(l, m, r) {
    addStep(9, `merge(arr, ${l}, ${m}, ${r})`, [], null, [l, r]);
    
    let temp = [];
    let i = l;
    let j = m + 1;
    addStep(10, `Initialized pointers: i = ${i}, j = ${j}`, [], null, [l, r]);

    addStep(11, `while (i <= ${m} && j <= ${r})`, [], null, [l, r], temp, l);
    while (i <= m && j <= r) {
      addStep(12, `Comparing arr[${i}] (${arr[i]}) with arr[${j}] (${arr[j]})`, [i, j], null, [l, r], temp, l);
      if (arr[i] <= arr[j]) {
        temp.push(arr[i]);
        addStep(12, `arr[i] <= arr[j], pushing arr[${i}] (${arr[i]}) to temp array`, [i], null, [l, r], temp, l);
        i++;
      } else {
        temp.push(arr[j]);
        addStep(13, `arr[i] > arr[j], pushing arr[${j}] (${arr[j]}) to temp array`, [j], null, [l, r], temp, l);
        j++;
      }
      addStep(11, `while (i <= ${m} && j <= ${r})`, [], null, [l, r], temp, l);
    }

    addStep(15, `Pushing remaining elements from left half (if any)`, [], null, [l, r], temp, l);
    while (i <= m) {
      temp.push(arr[i]);
      addStep(15, `Pushing arr[${i}] (${arr[i]}) to temp array`, [i], null, [l, r], temp, l);
      i++;
    }

    addStep(16, `Pushing remaining elements from right half (if any)`, [], null, [l, r], temp, l);
    while (j <= r) {
      temp.push(arr[j]);
      addStep(16, `Pushing arr[${j}] (${arr[j]}) to temp array`, [j], null, [l, r], temp, l);
      j++;
    }

    addStep(17, `Copying sorted temp array back to original array from index ${l} to ${r}`, [], null, [l, r], temp, l);
    for (let k = 0; k < temp.length; k++) {
      arr[l + k] = temp[k];
      sorted.add(l + k);
      addStep(17, `arr[${l + k}] = temp[${k}] (${temp[k]})`, [], [l + k], [l, r], temp, l);
    }
    
    addStep(18, `Finished merging range [${l}, ${r}]`, [], null, [l, r]);
  }

  mergeSort(0, arr.length - 1);
  
  // Ensure all are marked sorted at the very end
  for(let i=0; i<arr.length; i++) sorted.add(i);

  addStep(7, 'Merge Sort complete!', [], null, [0, arr.length - 1]);

  return { steps, totalSteps: steps.length };
}

export function generateRandomArray(size, min = 5, max = 100) {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
}
