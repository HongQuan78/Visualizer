export function parseNumberArrayInput(value, { minLength = 2, maxLength = 30 } = {}) {
  const tokens = value
    .split(',')
    .map((token) => token.trim())
    .filter(Boolean);

  if (tokens.length < minLength) {
    return {
      error: `Enter at least ${minLength} numbers.`,
      value: null,
    };
  }

  if (tokens.length > maxLength) {
    return {
      error: `Enter ${maxLength} numbers or fewer.`,
      value: null,
    };
  }

  const numbers = tokens.map(Number);
  const invalidToken = tokens.find((token, index) => !Number.isFinite(numbers[index]));

  if (invalidToken) {
    return {
      error: `"${invalidToken}" is not a valid number.`,
      value: null,
    };
  }

  return {
    error: '',
    value: numbers,
  };
}

export function formatArrayInput(array) {
  return Array.isArray(array) ? array.join(', ') : '';
}
