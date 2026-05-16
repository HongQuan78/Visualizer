export const TWO_SUM_CODE = [
  { line: 1, text: 'function twoSum(nums, target) {' },
  { line: 2, text: '  const seen = new Map();' },
  { line: 3, text: '  for (let i = 0; i < nums.length; i++) {' },
  { line: 4, text: '    const complement = target - nums[i];' },
  { line: 5, text: '    if (seen.has(complement)) {' },
  { line: 6, text: '      return [seen.get(complement), i];' },
  { line: 7, text: '    }' },
  { line: 8, text: '    seen.set(nums[i], i);' },
  { line: 9, text: '  }' },
  { line: 10, text: '  return [];' },
  { line: 11, text: '}' },
];

export const TWO_SUM_META = {
  name: 'Two Sum',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  category: 'Arrays',
  tag: 'Hash Map',
};

export function generateTwoSumSteps(inputArray) {
  const array = [...inputArray];
  const target = pickGuaranteedTarget(array);
  const steps = [];
  const seen = new Map();
  const visited = new Set();

  steps.push({
    array: [...array],
    comparing: [],
    swapping: null,
    sorted: new Set(),
    target,
    codeLine: 1,
    description: `Two Sum target is ${target}. Scan the array once and store values as we go.`,
  });

  steps.push({
    array: [...array],
    comparing: [],
    swapping: null,
    sorted: new Set(),
    target,
    codeLine: 2,
    description: 'Create an empty hash map for values we have already seen.',
  });

  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    const complement = target - value;
    const complementIndex = seen.get(complement);
    const compared = complementIndex !== undefined ? [complementIndex, i] : [i];

    steps.push({
      array: [...array],
      comparing: [i],
      swapping: null,
      sorted: new Set(visited),
      target,
      codeLine: 3,
      description: `Inspect index ${i} with value ${value}.`,
    });

    steps.push({
      array: [...array],
      comparing: [i],
      swapping: null,
      sorted: new Set(visited),
      target,
      codeLine: 4,
      description: `Need complement ${target} - ${value} = ${complement}.`,
    });

    steps.push({
      array: [...array],
      comparing: compared,
      swapping: null,
      sorted: new Set(visited),
      target,
      codeLine: 5,
      description: complementIndex !== undefined
        ? `Complement ${complement} was seen at index ${complementIndex}.`
        : `Complement ${complement} is not in the map yet.`,
    });

    if (complementIndex !== undefined) {
      steps.push({
        array: [...array],
        comparing: [],
        swapping: [complementIndex, i],
        sorted: new Set([...visited, complementIndex, i]),
        target,
        codeLine: 6,
        description: `Found pair: indices ${complementIndex} and ${i} (${array[complementIndex]} + ${value} = ${target}).`,
      });
      return { steps, totalSteps: steps.length };
    }

    seen.set(value, i);
    visited.add(i);

    steps.push({
      array: [...array],
      comparing: [],
      swapping: null,
      sorted: new Set(visited),
      target,
      codeLine: 8,
      description: `Store ${value} at index ${i} in the hash map.`,
    });
  }

  steps.push({
    array: [...array],
    comparing: [],
    swapping: null,
    sorted: new Set(visited),
    target,
    codeLine: 10,
    description: 'No pair found for this target.',
  });

  return { steps, totalSteps: steps.length };
}

export function generateTwoSumArray(size, min = 2, max = 48) {
  const length = Math.max(4, Math.min(30, size));
  const values = new Set();

  while (values.size < length) {
    values.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  return Array.from(values);
}

function pickGuaranteedTarget(array) {
  if (array.length < 2) return 0;
  const leftIndex = Math.max(0, Math.floor(array.length / 3) - 1);
  const rightIndex = Math.min(array.length - 1, Math.floor((array.length * 2) / 3));
  return array[leftIndex] + array[rightIndex];
}
