import { parseNumberArrayInput } from './arrayInput';

export function parseTreeSequenceInput(value, { maxLength = 12 } = {}) {
  const parsed = parseNumberArrayInput(value, { minLength: 1, maxLength });

  if (parsed.error) return parsed;

  const uniqueValues = new Set(parsed.value);
  if (uniqueValues.size !== parsed.value.length) {
    return {
      error: 'Tree insertion values must be unique.',
      value: null,
    };
  }

  return parsed;
}

export function parsePositiveIntegerInput(value, { min = 1, max = 20 } = {}) {
  const number = Number(value.trim());

  if (!Number.isInteger(number)) {
    return { error: 'Enter a whole number.', value: null };
  }

  if (number < min || number > max) {
    return { error: `Enter a number from ${min} to ${max}.`, value: null };
  }

  return { error: '', value: number };
}
