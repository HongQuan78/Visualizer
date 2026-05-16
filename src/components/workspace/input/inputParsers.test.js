import { parseNumberArrayInput } from './arrayInput';
import { parseGraphInput } from './graphInput';
import { parsePositiveIntegerInput, parseTreeSequenceInput } from './scalarInput';

describe('input parsers', () => {
  test('parses comma-separated number arrays', () => {
    expect(parseNumberArrayInput('9, 1, 5, 3', { minLength: 4, maxLength: 8 }).value)
      .toEqual([9, 1, 5, 3]);
  });

  test('rejects invalid array tokens', () => {
    expect(parseNumberArrayInput('9, nope, 5', { minLength: 2 }).error)
      .toMatch(/not a valid number/);
  });

  test('parses weighted graph edge lists', () => {
    const result = parseGraphInput('A-B:4\nB-C:2\nC-D:5\nA-D:9', {
      minNodes: 4,
      maxNodes: 8,
      weighted: true,
    });

    expect(result.error).toBe('');
    expect(result.value.nodes.map((node) => node.id)).toEqual(['A', 'B', 'C', 'D']);
    expect(result.value.adjList.A).toEqual(['B', 'D']);
    expect(result.value.weights['A-B']).toBe(4);
  });

  test('rejects duplicate tree insertion values', () => {
    expect(parseTreeSequenceInput('5, 2, 5').error).toMatch(/unique/);
  });

  test('parses bounded DP target values', () => {
    expect(parsePositiveIntegerInput('10', { min: 2, max: 15 }).value).toBe(10);
    expect(parsePositiveIntegerInput('21', { min: 2, max: 15 }).error).toMatch(/from 2 to 15/);
  });
});
