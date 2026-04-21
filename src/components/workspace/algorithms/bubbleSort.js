/**
 * Motor de Bubble Sort: genera un historial completo de snapshots
 * para reproducir la animación paso a paso.
 *
 * Cada snapshot contiene:
 *   - array:        copia del arreglo en ese instante
 *   - comparing:    [i, j] — índices que se están comparando
 *   - swapping:     [i, j] | null — índices que se intercambian (o null)
 *   - sorted:       Set<index> — índices ya ubicados en su posición final
 *   - codeLine:     número de línea activa en el pseudo-código
 *   - description:  texto descriptivo del paso actual
 */

// Líneas del pseudo-código de Bubble Sort (para el CodeViewer)
export const BUBBLE_SORT_CODE = [
  { line: 1, text: 'function bubbleSort(arr) {' },
  { line: 2, text: '  const n = arr.length;' },
  { line: 3, text: '  for (let i = 0; i < n - 1; i++) {' },
  { line: 4, text: '    for (let j = 0; j < n - i - 1; j++) {' },
  { line: 5, text: '      if (arr[j] > arr[j + 1]) {' },
  { line: 6, text: '        swap(arr[j], arr[j + 1]);' },
  { line: 7, text: '      }' },
  { line: 8, text: '    }' },
  { line: 9, text: '  }' },
  { line: 10, text: '  return arr;' },
  { line: 11, text: '}' },
];

export const BUBBLE_SORT_META = {
  name: 'Bubble Sort',
  timeComplexity: 'O(n²)',
  spaceComplexity: 'O(1)',
  category: 'Sorting',
  tag: 'Comparison',
};

/**
 * Genera todos los snapshots del algoritmo bubble sort.
 * @param {number[]} inputArray - Arreglo inicial de números
 * @returns {{ steps: object[], totalSteps: number }}
 */
export function generateBubbleSortSteps(inputArray) {
  const arr = [...inputArray];
  const n = arr.length;
  const steps = [];
  const sorted = new Set();

  // Paso inicial: mostrar el arreglo sin modificar
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: null,
    sorted: new Set(sorted),
    codeLine: 1,
    description: 'Initializing Bubble Sort...',
  });

  // Paso: declarar n
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: null,
    sorted: new Set(sorted),
    codeLine: 2,
    description: `Array size n = ${n}`,
  });

  for (let i = 0; i < n - 1; i++) {
    // Registrar el inicio del bucle externo
    steps.push({
      array: [...arr],
      comparing: [],
      swapping: null,
      sorted: new Set(sorted),
      codeLine: 3,
      description: `Outer loop: pass ${i + 1} of ${n - 1}`,
    });

    for (let j = 0; j < n - i - 1; j++) {
      // Registrar el inicio del bucle interno
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: null,
        sorted: new Set(sorted),
        codeLine: 4,
        description: `Comparing index ${j} and ${j + 1}`,
      });

      // Registrar la comparación
      steps.push({
        array: [...arr],
        comparing: [j, j + 1],
        swapping: null,
        sorted: new Set(sorted),
        codeLine: 5,
        description: `Is ${arr[j]} > ${arr[j + 1]}?`,
      });

      if (arr[j] > arr[j + 1]) {
        // Registrar el intercambio
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        steps.push({
          array: [...arr],
          comparing: [],
          swapping: [j, j + 1],
          sorted: new Set(sorted),
          codeLine: 6,
          description: `Swapped ${arr[j + 1]} ↔ ${arr[j]}`,
        });
      }
    }

    // Marcar la posición final de este pase como ordenada
    sorted.add(n - 1 - i);
  }

  // Marcar el primer elemento como ordenado (siempre queda en su lugar)
  sorted.add(0);

  // Paso final: retorno del arreglo ordenado
  steps.push({
    array: [...arr],
    comparing: [],
    swapping: null,
    sorted: new Set(sorted),
    codeLine: 10,
    description: 'Array sorted! Returning result.',
  });

  return { steps, totalSteps: steps.length };
}

/**
 * Genera un arreglo aleatorio de N elementos.
 * @param {number} size - Tamaño del arreglo
 * @param {number} [min=5]  - Valor mínimo
 * @param {number} [max=100] - Valor máximo
 * @returns {number[]}
 */
export function generateRandomArray(size, min = 5, max = 100) {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
}
