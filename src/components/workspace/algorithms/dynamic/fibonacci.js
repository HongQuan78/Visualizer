/**
 * Fibonacci DP Engine: genera historial completo de snapshots
 * para reproducir la tabulación bottom-up paso a paso.
 *
 * Cada snapshot contiene:
 *   - dpTable:        estado actual del arreglo dp
 *   - currentIndex:   celda que se está calculando
 *   - referencing:    índices de las celdas referenciadas (i-1, i-2)
 *   - computed:       Set de índices ya calculados
 *   - targetN:        valor objetivo de Fibonacci a calcular
 *   - codeLine:       línea activa del pseudocódigo
 *   - description:    texto descriptivo del paso actual
 */

export const FIBONACCI_CODE = [
  { line: 1,  text: 'function fibonacci(n) {' },
  { line: 2,  text: '  let dp = new Array(n + 1);' },
  { line: 3,  text: '  dp[0] = 0;' },
  { line: 4,  text: '  dp[1] = 1;' },
  { line: 5,  text: '  for (let i = 2; i <= n; i++) {' },
  { line: 6,  text: '    dp[i] = dp[i-1] + dp[i-2];' },
  { line: 7,  text: '  }' },
  { line: 8,  text: '  return dp[n];' },
  { line: 9,  text: '}' },
];

export const FIBONACCI_META = {
  name: 'Fibonacci',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(n)',
  category: 'Dynamic',
  tag: 'Memoization',
};

// ──────────────────────────────
// Helper: crea un snapshot con valores por defecto
// ──────────────────────────────
function createSnapshot(dpTable, targetN, overrides) {
  return {
    dpTable: [...dpTable],
    currentIndex: null,
    referencing: [],
    computed: new Set(),
    targetN,
    codeLine: 1,
    description: '',
    // Compatibilidad con header y engine
    queue: [],
    graph: { nodes: [], adjList: {} },
    visited: new Set(),
    activeNode: null,
    comparing: [],
    ...overrides,
  };
}

/**
 * Genera snapshots para la tabulación bottom-up de Fibonacci.
 * @param {number} n - El número de Fibonacci a calcular.
 */
export function generateFibonacciSteps(n) {
  const steps = [];
  const targetN = typeof n === 'number' ? n : 10;
  const dpTable = new Array(targetN + 1).fill(null);
  const computed = new Set();

  // Paso inicial: declarar el arreglo dp
  steps.push(createSnapshot(dpTable, targetN, {
    codeLine: 1,
    description: `Computing Fibonacci(${targetN}) using dynamic programming`,
  }));

  steps.push(createSnapshot(dpTable, targetN, {
    codeLine: 2,
    description: `Creating dp array of size ${targetN + 1}`,
  }));

  // Caso base: dp[0] = 0
  dpTable[0] = 0;
  computed.add(0);
  steps.push(createSnapshot(dpTable, targetN, {
    currentIndex: 0,
    computed: new Set(computed),
    codeLine: 3,
    description: 'Base case: dp[0] = 0',
  }));

  // Caso base: dp[1] = 1
  if (targetN >= 1) {
    dpTable[1] = 1;
    computed.add(1);
    steps.push(createSnapshot(dpTable, targetN, {
      currentIndex: 1,
      computed: new Set(computed),
      codeLine: 4,
      description: 'Base case: dp[1] = 1',
    }));
  }

  // Tabulación: dp[i] = dp[i-1] + dp[i-2]
  for (let i = 2; i <= targetN; i++) {
    // Verificar condición del bucle
    steps.push(createSnapshot(dpTable, targetN, {
      currentIndex: i,
      computed: new Set(computed),
      codeLine: 5,
      description: `Loop iteration: i = ${i} (i <= ${targetN})`,
    }));

    // Mostrar las referencias antes de calcular
    steps.push(createSnapshot(dpTable, targetN, {
      currentIndex: i,
      referencing: [i - 1, i - 2],
      computed: new Set(computed),
      codeLine: 6,
      description: `dp[${i}] = dp[${i - 1}] + dp[${i - 2}] = ${dpTable[i - 1]} + ${dpTable[i - 2]}`,
    }));

    // Calcular y almacenar el valor
    dpTable[i] = dpTable[i - 1] + dpTable[i - 2];
    computed.add(i);
    steps.push(createSnapshot(dpTable, targetN, {
      currentIndex: i,
      referencing: [i - 1, i - 2],
      computed: new Set(computed),
      codeLine: 6,
      description: `dp[${i}] = ${dpTable[i]}`,
    }));
  }

  // Paso final: retornar resultado
  steps.push(createSnapshot(dpTable, targetN, {
    currentIndex: targetN,
    computed: new Set(computed),
    codeLine: 7,
    description: `Loop complete`,
  }));

  steps.push(createSnapshot(dpTable, targetN, {
    currentIndex: targetN,
    computed: new Set(computed),
    codeLine: 8,
    description: `Fibonacci(${targetN}) = ${dpTable[targetN]}`,
  }));

  return { steps, totalSteps: steps.length };
}

/**
 * Genera el valor de N para Fibonacci.
 * El parámetro count determina el tamaño del problema.
 */
export function generateFibonacciInput(count = 10) {
  return count;
}
