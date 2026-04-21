import { useState, useRef, useCallback, useEffect } from 'react';
import { generateBubbleSortSteps, generateRandomArray, BUBBLE_SORT_META, BUBBLE_SORT_CODE } from '../algorithms/sorting/bubbleSort';
import { generateSelectionSortSteps, SELECTION_SORT_META, SELECTION_SORT_CODE } from '../algorithms/sorting/selectionSort';
import { generateInsertionSortSteps, INSERTION_SORT_META, INSERTION_SORT_CODE } from '../algorithms/sorting/insertionSort';
import { generateMergeSortSteps, MERGE_SORT_META, MERGE_SORT_CODE } from '../algorithms/sorting/mergeSort';
import { generateBFSSteps, generateRandomGraph, BFS_META, BFS_CODE } from '../algorithms/graphs/bfs';
import { generateDFSSteps, DFS_META, DFS_CODE } from '../algorithms/graphs/dfs';
import { generateBSTInsertSteps, generateRandomBSTValues, BST_INSERT_META, BST_INSERT_CODE } from '../algorithms/trees/bstInsert';
import { generateFibonacciSteps, generateFibonacciInput, FIBONACCI_META, FIBONACCI_CODE } from '../algorithms/dynamic/fibonacci';

/**
 * Hook personalizado que gestiona toda la lógica de reproducción
 * del algoritmo: play, pause, step forward/back, velocidad, reset.
 */

const DEFAULT_ARRAY_SIZE = 12;
const DEFAULT_NODE_COUNT = 8;
const SPEED_MAP = { '0.5x': 1200, '1x': 600, '2x': 300, '4x': 100 };

const ALGORITHM_CONFIG = {
  'bubble-sort': {
    type: 'array',
    generator: generateBubbleSortSteps,
    dataGenerator: generateRandomArray,
    meta: BUBBLE_SORT_META,
    code: BUBBLE_SORT_CODE
  },
  'selection-sort': {
    type: 'array',
    generator: generateSelectionSortSteps,
    dataGenerator: generateRandomArray,
    meta: SELECTION_SORT_META,
    code: SELECTION_SORT_CODE
  },
  'insertion-sort': {
    type: 'array',
    generator: generateInsertionSortSteps,
    dataGenerator: generateRandomArray,
    meta: INSERTION_SORT_META,
    code: INSERTION_SORT_CODE
  },
  'merge-sort': {
    type: 'array',
    generator: generateMergeSortSteps,
    dataGenerator: generateRandomArray,
    meta: MERGE_SORT_META,
    code: MERGE_SORT_CODE
  },
  'bfs': {
    type: 'graph',
    generator: generateBFSSteps,
    dataGenerator: generateRandomGraph,
    meta: BFS_META,
    code: BFS_CODE
  },
  'dfs': {
    type: 'graph',
    generator: generateDFSSteps,
    dataGenerator: generateRandomGraph,
    meta: DFS_META,
    code: DFS_CODE
  },
  'bst-insert': {
    type: 'tree',
    generator: generateBSTInsertSteps,
    dataGenerator: generateRandomBSTValues,
    meta: BST_INSERT_META,
    code: BST_INSERT_CODE
  },
  'fibonacci': {
    type: 'dp',
    generator: generateFibonacciSteps,
    dataGenerator: generateFibonacciInput,
    meta: FIBONACCI_META,
    code: FIBONACCI_CODE
  }
};

export default function useVisualizerEngine(selectedAlgorithmId = 'bubble-sort') {
  // Estado del tamaño/conteo de elementos
  const [dataSize, setDataSize] = useState(DEFAULT_ARRAY_SIZE);
  
  // Estado del dato fuente (puede ser array o grafo)
  const [sourceData, setSourceData] = useState(() => {
    const config = ALGORITHM_CONFIG[selectedAlgorithmId] || ALGORITHM_CONFIG['bubble-sort'];
    return config.dataGenerator(DEFAULT_ARRAY_SIZE);
  });

  const [rootNodeId, setRootNodeId] = useState(null);

  const currentAlgoConfig = ALGORITHM_CONFIG[selectedAlgorithmId] || ALGORITHM_CONFIG['bubble-sort'];

  // Ref para rastrear el tipo previo y detectar cambios de categoría
  const prevTypeRef = useRef(currentAlgoConfig.type);

  // Initialize rootNodeId when sourceData changes (for graphs)
  useEffect(() => {
    if (currentAlgoConfig.type === 'graph' && sourceData && sourceData.nodes && sourceData.nodes.length > 0) {
      if (!rootNodeId || !sourceData.nodes.find(n => n.id === rootNodeId)) {
        setRootNodeId(sourceData.nodes[0].id);
      }
    } else {
      setRootNodeId(null);
    }
  }, [sourceData, currentAlgoConfig.type, rootNodeId]);

  // Estado del motor de pasos
  const [steps, setSteps] = useState(() => currentAlgoConfig.generator(sourceData).steps);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState('1x');

  // Ref para el intervalo de reproducción (evita closures obsoletos)
  const intervalRef = useRef(null);
  const currentStepRef = useRef(currentStepIndex);
  const stepsRef = useRef(steps);

  // ──────────────────────────────
  // Controles de reproducción
  // ──────────────────────────────
  const stopPlayback = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const startPlayback = useCallback(() => {
    // Si ya terminó, reiniciar desde el principio
    if (currentStepRef.current >= stepsRef.current.length - 1) {
      setCurrentStepIndex(0);
      currentStepRef.current = 0;
    }

    setIsPlaying(true);

    intervalRef.current = setInterval(() => {
      const nextIndex = currentStepRef.current + 1;
      if (nextIndex >= stepsRef.current.length) {
        stopPlayback();
        return;
      }
      setCurrentStepIndex(nextIndex);
      currentStepRef.current = nextIndex;
    }, SPEED_MAP[speed] || 600);
  }, [speed, stopPlayback]);

  const togglePlayback = useCallback(() => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  }, [isPlaying, stopPlayback, startPlayback]);

  const stepForward = useCallback(() => {
    stopPlayback();
    setCurrentStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  }, [stopPlayback, steps.length]);

  const stepBackward = useCallback(() => {
    stopPlayback();
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  }, [stopPlayback]);

  const reset = useCallback(() => {
    stopPlayback();
    setCurrentStepIndex(0);
  }, [stopPlayback]);

  // Update steps when algorithm changes (and potentially regenerate data if type changed)
  useEffect(() => {
    stopPlayback();
    const config = ALGORITHM_CONFIG[selectedAlgorithmId] || ALGORITHM_CONFIG['bubble-sort'];
    
    // Regenerar datos si el tipo de algoritmo cambió (array ↔ graph ↔ tree)
    let newData = sourceData;
    const newType = config.type;

    if (prevTypeRef.current !== newType) {
      const defaultSize = newType === 'array' ? DEFAULT_ARRAY_SIZE : DEFAULT_NODE_COUNT;
      newData = config.dataGenerator(defaultSize);
      setSourceData(newData);
      setDataSize(defaultSize);
      prevTypeRef.current = newType;
    }
    const { steps: newSteps } = config.generator(newData, rootNodeId);
    setSteps(newSteps);
    setCurrentStepIndex(0);
  }, [selectedAlgorithmId, rootNodeId, sourceData, stopPlayback]);

  // Mantener refs sincronizados con el estado
  useEffect(() => {
    currentStepRef.current = currentStepIndex;
  }, [currentStepIndex]);

  useEffect(() => {
    stepsRef.current = steps;
  }, [steps]);

  // ──────────────────────────────
  // Generar nuevos pasos al cambiar el dato fuente
  // ──────────────────────────────
  const regenerate = useCallback((newData) => {
    stopPlayback();
    const config = ALGORITHM_CONFIG[selectedAlgorithmId] || ALGORITHM_CONFIG['bubble-sort'];
    const { steps: newSteps } = config.generator(newData, rootNodeId);
    setSourceData(newData);
    setSteps(newSteps);
    setCurrentStepIndex(0);
  }, [selectedAlgorithmId, rootNodeId, stopPlayback]);

  // ──────────────────────────────
  // Controles de dato
  // ──────────────────────────────
  const handleDataSizeChange = useCallback((newSize) => {
    const config = ALGORITHM_CONFIG[selectedAlgorithmId] || ALGORITHM_CONFIG['bubble-sort'];
    // Rangos específicos según el tipo de algoritmo
    const ranges = { array: [4, 30], graph: [4, 12], tree: [4, 12], dp: [2, 15] };
    const [min, max] = ranges[config.type] || [4, 20];
    const clamped = Math.max(min, Math.min(max, newSize));
    setDataSize(clamped);
    const newData = config.dataGenerator(clamped);
    regenerate(newData);
  }, [selectedAlgorithmId, regenerate]);

  const handleRandomize = useCallback(() => {
    const config = ALGORITHM_CONFIG[selectedAlgorithmId] || ALGORITHM_CONFIG['bubble-sort'];
    const newData = config.dataGenerator(dataSize);
    regenerate(newData);
  }, [selectedAlgorithmId, dataSize, regenerate]);

  const handleRootNodeChange = useCallback((newRootId) => {
    stopPlayback();
    const config = ALGORITHM_CONFIG[selectedAlgorithmId] || ALGORITHM_CONFIG['bubble-sort'];
    setRootNodeId(newRootId);
    const { steps: newSteps } = config.generator(sourceData, newRootId);
    setSteps(newSteps);
    setCurrentStepIndex(0);
  }, [selectedAlgorithmId, sourceData, stopPlayback]);

  // ──────────────────────────────
  // Reiniciar reproducción al cambiar velocidad (si estaba corriendo)
  // ──────────────────────────────
  const handleSpeedChange = useCallback((newSpeed) => {
    setSpeed(newSpeed);
    if (isPlaying) {
      stopPlayback();
      // Re-lanzar con la nueva velocidad después de que el estado se actualice
      setTimeout(() => {
        setIsPlaying(true);
        intervalRef.current = setInterval(() => {
          const nextIndex = currentStepRef.current + 1;
          if (nextIndex >= stepsRef.current.length) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            setIsPlaying(false);
            return;
          }
          setCurrentStepIndex(nextIndex);
          currentStepRef.current = nextIndex;
        }, SPEED_MAP[newSpeed] || 600);
      }, 0);
    }
  }, [isPlaying, stopPlayback]);

  // Limpiar el intervalo al desmontar el componente
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // ──────────────────────────────
  // Estado derivado: snapshot actual
  // ──────────────────────────────
  const currentStep = steps[currentStepIndex] || steps[0];
  const totalSteps = steps.length;
  const isFinished = currentStepIndex >= totalSteps - 1;
  const progress = totalSteps > 1 ? (currentStepIndex / (totalSteps - 1)) * 100 : 0;

  return {
    // Datos del snapshot actual
    currentStep,
    currentStepIndex,
    totalSteps,
    progress,
    isFinished,

    // Configuración actual
    currentAlgoConfig,

    // Estado de reproducción
    isPlaying,
    speed,

    // Datos del dato fuente (array o grafo)
    sourceData,
    dataSize,
    rootNodeId,

    // Acciones
    togglePlayback,
    stepForward,
    stepBackward,
    reset,
    handleSpeedChange,
    handleDataSizeChange,
    handleRandomize,
    handleRootNodeChange,
  };
}
