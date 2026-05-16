import {
  ALGORITHM_GROUPS,
  ALGORITHM_MANIFEST,
  DEFAULT_ALGORITHM_ID,
  assertValidAlgorithmManifest,
  clampDataSize,
  getAlgorithmConfig,
  getDefaultDataSize,
  validateAlgorithmManifest,
} from './manifest';

function getSmokeInput(config) {
  const size = getDefaultDataSize(config);
  return config.dataGenerator(size);
}

function expectValidSteps(result, algorithmId) {
  expect(result).toEqual(expect.objectContaining({
    steps: expect.any(Array),
    totalSteps: expect.any(Number),
  }));
  expect(result.steps.length).toBeGreaterThan(0);
  expect(result.totalSteps).toBe(result.steps.length);

  result.steps.forEach((step, index) => {
    expect(`${algorithmId} step ${index} description: ${typeof step.description}`).toBe(`${algorithmId} step ${index} description: string`);
    expect(step.description.length).toBeGreaterThan(0);
    expect(`${algorithmId} step ${index} codeLine: ${typeof step.codeLine}`).toBe(`${algorithmId} step ${index} codeLine: number`);
  });
}

describe('algorithm manifest', () => {
  test('passes manifest validation', () => {
    expect(validateAlgorithmManifest()).toEqual([]);
    expect(assertValidAlgorithmManifest()).toBe(true);
  });

  test('getAlgorithmConfig returns exact matches and falls back to default', () => {
    const defaultConfig = getAlgorithmConfig(DEFAULT_ALGORITHM_ID);

    expect(getAlgorithmConfig('quick-sort').id).toBe('quick-sort');
    expect(getAlgorithmConfig('not-a-real-algorithm')).toBe(defaultConfig);
  });

  test('ALGORITHM_GROUPS are derived from manifest categories', () => {
    const categories = [...new Set(ALGORITHM_MANIFEST.map((algorithm) => algorithm.category))];

    expect(ALGORITHM_GROUPS.map((group) => group.category)).toEqual(categories);
    ALGORITHM_GROUPS.forEach((group) => {
      const manifestAlgorithms = ALGORITHM_MANIFEST.filter((algorithm) => algorithm.category === group.category);
      expect(group.algorithms.map((algorithm) => algorithm.id)).toEqual(
        manifestAlgorithms.map((algorithm) => algorithm.id)
      );
    });
  });

  test('clampDataSize respects per-algorithm size ranges', () => {
    const graphConfig = getAlgorithmConfig('bfs');

    expect(clampDataSize(graphConfig, graphConfig.size.min - 10)).toBe(graphConfig.size.min);
    expect(clampDataSize(graphConfig, graphConfig.size.max + 10)).toBe(graphConfig.size.max);
    expect(clampDataSize(graphConfig, graphConfig.size.default)).toBe(graphConfig.size.default);
  });
});

describe('algorithm generators', () => {
  const availableAlgorithms = ALGORITHM_MANIFEST.filter((algorithm) => algorithm.available);

  test.each(availableAlgorithms)('$id generates valid smoke steps', (config) => {
    const input = getSmokeInput(config);
    const rootNodeId = config.type === 'graph' ? input.nodes[0].id : undefined;
    const result = config.generator(input, rootNodeId);

    expectValidSteps(result, config.id);
  });

  test.each(availableAlgorithms.filter((algorithm) => algorithm.category === 'Sorting'))(
    '$id ends with a sorted array',
    (config) => {
      const input = [5, 1, 4, 2, 8, 3];
      const result = config.generator(input);
      const finalArray = result.steps[result.steps.length - 1].array;

      expect(finalArray).toEqual([...input].sort((a, b) => a - b));
    }
  );
});
