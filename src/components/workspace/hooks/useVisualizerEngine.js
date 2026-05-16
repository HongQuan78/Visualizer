import { useState, useRef, useCallback, useEffect } from 'react';
import {
  DEFAULT_ALGORITHM_ID,
  clampDataSize,
  getAlgorithmConfig,
  getDefaultDataSize,
} from '../algorithms/manifest';

/**
 * Hook personalizado que gestiona toda la lógica de reproducción
 * del algoritmo: play, pause, step forward/back, velocidad, reset.
 */

const SPEED_MAP = { '0.5x': 1200, '1x': 600, '2x': 300, '4x': 100 };

function getDataSizeFromSource(data, fallback) {
  if (Array.isArray(data)) return data.length;
  if (typeof data === 'number') return data;
  if (data?.nodes) return data.nodes.length;
  return fallback;
}

export default function useVisualizerEngine(selectedAlgorithmId = DEFAULT_ALGORITHM_ID) {
  const currentAlgoConfig = getAlgorithmConfig(selectedAlgorithmId);
  const initialSize = getDefaultDataSize(currentAlgoConfig);

  // Estado del tamaño/conteo de elementos
  const [dataSize, setDataSize] = useState(initialSize);

  // Estado del dato fuente (puede ser array o grafo)
  const [sourceData, setSourceData] = useState(() => {
    const config = getAlgorithmConfig(selectedAlgorithmId);
    return config.dataGenerator(getDefaultDataSize(config));
  });

  const [rootNodeId, setRootNodeId] = useState(null);
  const [customDataByAlgorithm, setCustomDataByAlgorithm] = useState({});

  // Ref para rastrear el tipo previo y detectar cambios de categoría
  const prevTypeRef = useRef(currentAlgoConfig.type);
  const prevAlgorithmRef = useRef(selectedAlgorithmId);

  // Initialize rootNodeId when sourceData changes (for graphs)
  useEffect(() => {
    if (currentAlgoConfig.type === 'graph' && sourceData && sourceData.nodes && sourceData.nodes.length > 0) {
      if (!rootNodeId || !sourceData.nodes.find((node) => node.id === rootNodeId)) {
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

  const stopPlayback = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const startPlayback = useCallback(() => {
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
    const config = getAlgorithmConfig(selectedAlgorithmId);
    const algorithmChanged = prevAlgorithmRef.current !== selectedAlgorithmId;
    const savedCustomData = customDataByAlgorithm[selectedAlgorithmId];

    let newData = sourceData;
    const newType = config.type;

    if (savedCustomData) {
      newData = savedCustomData;
      setSourceData(newData);
      setDataSize(getDataSizeFromSource(newData, getDefaultDataSize(config)));
    } else if (prevTypeRef.current !== newType) {
      const defaultSize = getDefaultDataSize(config);
      newData = config.dataGenerator(defaultSize);
      setSourceData(newData);
      setDataSize(defaultSize);
      prevTypeRef.current = newType;
    } else if (algorithmChanged) {
      setDataSize(getDataSizeFromSource(newData, getDefaultDataSize(config)));
    }

    const { steps: newSteps } = config.generator(newData, rootNodeId);
    setSteps(newSteps);
    setCurrentStepIndex(0);
    prevAlgorithmRef.current = selectedAlgorithmId;
  }, [customDataByAlgorithm, selectedAlgorithmId, rootNodeId, sourceData, stopPlayback]);

  // Mantener refs sincronizados con el estado
  useEffect(() => {
    currentStepRef.current = currentStepIndex;
  }, [currentStepIndex]);

  useEffect(() => {
    stepsRef.current = steps;
  }, [steps]);

  const regenerate = useCallback((newData) => {
    stopPlayback();
    const config = getAlgorithmConfig(selectedAlgorithmId);
    const { steps: newSteps } = config.generator(newData, rootNodeId);
    setSourceData(newData);
    setSteps(newSteps);
    setCurrentStepIndex(0);
  }, [selectedAlgorithmId, rootNodeId, stopPlayback]);

  const handleDataSizeChange = useCallback((newSize) => {
    const config = getAlgorithmConfig(selectedAlgorithmId);
    const clamped = clampDataSize(config, newSize);
    setDataSize(clamped);
    const newData = config.dataGenerator(clamped);
    setCustomDataByAlgorithm((prev) => {
      const next = { ...prev };
      delete next[selectedAlgorithmId];
      return next;
    });
    regenerate(newData);
  }, [selectedAlgorithmId, regenerate]);

  const handleRandomize = useCallback(() => {
    const config = getAlgorithmConfig(selectedAlgorithmId);
    const newData = config.dataGenerator(dataSize);
    setCustomDataByAlgorithm((prev) => {
      const next = { ...prev };
      delete next[selectedAlgorithmId];
      return next;
    });
    regenerate(newData);
  }, [selectedAlgorithmId, dataSize, regenerate]);

  const handleApplyInput = useCallback((newData) => {
    const config = getAlgorithmConfig(selectedAlgorithmId);
    const nextSize = getDataSizeFromSource(newData, dataSize);

    setCustomDataByAlgorithm((prev) => ({
      ...prev,
      [selectedAlgorithmId]: newData,
    }));
    setDataSize(clampDataSize(config, nextSize));
    regenerate(newData);
  }, [dataSize, regenerate, selectedAlgorithmId]);

  const handleRootNodeChange = useCallback((newRootId) => {
    stopPlayback();
    const config = getAlgorithmConfig(selectedAlgorithmId);
    setRootNodeId(newRootId);
    const { steps: newSteps } = config.generator(sourceData, newRootId);
    setSteps(newSteps);
    setCurrentStepIndex(0);
  }, [selectedAlgorithmId, sourceData, stopPlayback]);

  const handleSpeedChange = useCallback((newSpeed) => {
    setSpeed(newSpeed);
    if (isPlaying) {
      stopPlayback();
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

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const currentStep = steps[currentStepIndex] || steps[0];
  const totalSteps = steps.length;
  const isFinished = currentStepIndex >= totalSteps - 1;
  const progress = totalSteps > 1 ? (currentStepIndex / (totalSteps - 1)) * 100 : 0;

  return {
    currentStep,
    currentStepIndex,
    totalSteps,
    progress,
    isFinished,
    currentAlgoConfig,
    isPlaying,
    speed,
    sourceData,
    dataSize,
    rootNodeId,
    togglePlayback,
    stepForward,
    stepBackward,
    reset,
    handleSpeedChange,
    handleDataSizeChange,
    handleRandomize,
    handleApplyInput,
    handleRootNodeChange,
  };
}
