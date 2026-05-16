import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import {
  DEFAULT_ALGORITHM_ID,
  clampDataSize,
  getAlgorithmConfig,
  getDefaultDataSize,
  loadAlgorithmConfig,
} from '../algorithms/manifest';
import { getOperationBadge, getStepOperation } from '../learningUtils';

const SPEED_MAP = { '0.5x': 1200, '1x': 600, '2x': 300, '4x': 100 };

function getDataSizeFromSource(data, fallback) {
  if (Array.isArray(data)) return data.length;
  if (typeof data === 'number') return data;
  if (data?.nodes) return data.nodes.length;
  return fallback;
}

function getRootForGraph(config, data, requestedRoot) {
  if (config.type !== 'graph') return null;
  if (!data?.nodes?.length) return null;
  return data.nodes.some((node) => node.id === requestedRoot) ? requestedRoot : data.nodes[0].id;
}

export default function useVisualizerEngine(selectedAlgorithmId = DEFAULT_ALGORITHM_ID) {
  const metadataConfig = getAlgorithmConfig(selectedAlgorithmId);
  const [currentAlgoConfig, setCurrentAlgoConfig] = useState(metadataConfig);
  const [dataSize, setDataSize] = useState(getDefaultDataSize(metadataConfig));
  const [sourceData, setSourceData] = useState(null);
  const [rootNodeId, setRootNodeId] = useState(null);
  const [customDataByAlgorithm, setCustomDataByAlgorithm] = useState({});
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState('1x');
  const [pauseOnOperations, setPauseOnOperations] = useState([]);
  const [bookmarksByAlgorithm, setBookmarksByAlgorithm] = useState({});
  const [isAlgorithmLoading, setIsAlgorithmLoading] = useState(true);

  const intervalRef = useRef(null);
  const currentStepRef = useRef(currentStepIndex);
  const stepsRef = useRef(steps);
  const configRef = useRef(currentAlgoConfig);
  const sourceDataRef = useRef(sourceData);
  const rootNodeRef = useRef(rootNodeId);
  const pauseOnOperationsRef = useRef(pauseOnOperations);
  const speedRef = useRef(speed);
  const prevTypeRef = useRef(metadataConfig.type);
  const prevAlgorithmRef = useRef(selectedAlgorithmId);

  const stopPlayback = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsPlaying(false);
  }, []);

  const startPlayback = useCallback(() => {
    if (stepsRef.current.length <= 1 || isAlgorithmLoading) return;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

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

      const nextOperation = getStepOperation(
        stepsRef.current[nextIndex],
        configRef.current.type,
        configRef.current.id
      );
      if (pauseOnOperationsRef.current.includes(nextOperation)) {
        stopPlayback();
      }
    }, SPEED_MAP[speedRef.current] || 600);
  }, [isAlgorithmLoading, stopPlayback]);

  const togglePlayback = useCallback(() => {
    if (isPlaying) {
      stopPlayback();
    } else {
      startPlayback();
    }
  }, [isPlaying, startPlayback, stopPlayback]);

  const stepForward = useCallback(() => {
    stopPlayback();
    setCurrentStepIndex((prev) => Math.min(prev + 1, stepsRef.current.length - 1));
  }, [stopPlayback]);

  const stepBackward = useCallback(() => {
    stopPlayback();
    setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
  }, [stopPlayback]);

  const jumpToStep = useCallback((stepIndex) => {
    stopPlayback();
    const lastStepIndex = Math.max(stepsRef.current.length - 1, 0);
    const nextIndex = Math.max(0, Math.min(Number(stepIndex), lastStepIndex));
    setCurrentStepIndex(nextIndex);
    currentStepRef.current = nextIndex;
  }, [stopPlayback]);

  const jumpToStart = useCallback(() => {
    jumpToStep(0);
  }, [jumpToStep]);

  const jumpToEnd = useCallback(() => {
    jumpToStep(stepsRef.current.length - 1);
  }, [jumpToStep]);

  const reset = useCallback(() => {
    jumpToStart();
  }, [jumpToStart]);

  const setGeneratedState = useCallback((config, nextData, requestedRoot = rootNodeRef.current) => {
    const nextRoot = getRootForGraph(config, nextData, requestedRoot);
    const { steps: nextSteps } = config.generator(nextData, nextRoot);

    setSourceData(nextData);
    sourceDataRef.current = nextData;
    setRootNodeId(nextRoot);
    rootNodeRef.current = nextRoot;
    setSteps(nextSteps);
    stepsRef.current = nextSteps;
    setCurrentStepIndex(0);
    currentStepRef.current = 0;
  }, []);

  useEffect(() => {
    let isActive = true;
    const metadata = getAlgorithmConfig(selectedAlgorithmId);

    stopPlayback();
    setIsAlgorithmLoading(true);
    setCurrentAlgoConfig(metadata);
    configRef.current = metadata;
    setSteps([]);
    stepsRef.current = [];
    setCurrentStepIndex(0);
    currentStepRef.current = 0;

    loadAlgorithmConfig(selectedAlgorithmId)
      .then((loadedConfig) => {
        if (!isActive) return;

        const algorithmChanged = prevAlgorithmRef.current !== selectedAlgorithmId;
        const typeChanged = prevTypeRef.current !== loadedConfig.type;
        const savedCustomData = customDataByAlgorithm[selectedAlgorithmId];
        const defaultSize = getDefaultDataSize(loadedConfig);
        let nextData = savedCustomData;

        if (!nextData) {
          if (typeChanged || algorithmChanged || !sourceDataRef.current) {
            nextData = loadedConfig.dataGenerator(defaultSize);
          } else {
            nextData = sourceDataRef.current;
          }
        }

        const nextSize = getDataSizeFromSource(nextData, defaultSize);

        setCurrentAlgoConfig(loadedConfig);
        configRef.current = loadedConfig;
        setDataSize(clampDataSize(loadedConfig, nextSize));
        setGeneratedState(loadedConfig, nextData, rootNodeRef.current);
        prevTypeRef.current = loadedConfig.type;
        prevAlgorithmRef.current = selectedAlgorithmId;
        setIsAlgorithmLoading(false);
      })
      .catch((error) => {
        if (!isActive) return;
        setIsAlgorithmLoading(false);
        throw error;
      });

    return () => {
      isActive = false;
    };
  }, [customDataByAlgorithm, selectedAlgorithmId, setGeneratedState, stopPlayback]);

  useEffect(() => {
    currentStepRef.current = currentStepIndex;
  }, [currentStepIndex]);

  useEffect(() => {
    stepsRef.current = steps;
  }, [steps]);

  useEffect(() => {
    configRef.current = currentAlgoConfig;
  }, [currentAlgoConfig]);

  useEffect(() => {
    sourceDataRef.current = sourceData;
  }, [sourceData]);

  useEffect(() => {
    rootNodeRef.current = rootNodeId;
  }, [rootNodeId]);

  useEffect(() => {
    pauseOnOperationsRef.current = pauseOnOperations;
  }, [pauseOnOperations]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    setBookmarksByAlgorithm((prev) => {
      const bookmarks = prev[selectedAlgorithmId] || [];
      const nextBookmarks = bookmarks.filter((stepIndex) => stepIndex < steps.length);
      if (nextBookmarks.length === bookmarks.length) return prev;

      return {
        ...prev,
        [selectedAlgorithmId]: nextBookmarks,
      };
    });
  }, [selectedAlgorithmId, steps.length]);

  const regenerate = useCallback((newData, requestedRoot = rootNodeRef.current) => {
    const config = configRef.current;
    if (!config.generator) return;

    stopPlayback();
    setGeneratedState(config, newData, requestedRoot);
  }, [setGeneratedState, stopPlayback]);

  const handleDataSizeChange = useCallback((newSize) => {
    const config = configRef.current;
    if (!config.dataGenerator) return;

    const clamped = clampDataSize(config, newSize);
    const newData = config.dataGenerator(clamped);

    setDataSize(clamped);
    setCustomDataByAlgorithm((prev) => {
      const next = { ...prev };
      delete next[selectedAlgorithmId];
      return next;
    });
    regenerate(newData);
  }, [regenerate, selectedAlgorithmId]);

  const handleRandomize = useCallback(() => {
    const config = configRef.current;
    if (!config.dataGenerator) return;

    const newData = config.dataGenerator(dataSize);

    setCustomDataByAlgorithm((prev) => {
      const next = { ...prev };
      delete next[selectedAlgorithmId];
      return next;
    });
    regenerate(newData);
  }, [dataSize, regenerate, selectedAlgorithmId]);

  const handleApplyInput = useCallback((newData) => {
    const config = configRef.current;
    const nextSize = getDataSizeFromSource(newData, dataSize);

    setCustomDataByAlgorithm((prev) => ({
      ...prev,
      [selectedAlgorithmId]: newData,
    }));
    setDataSize(clampDataSize(config, nextSize));
    regenerate(newData);
  }, [dataSize, regenerate, selectedAlgorithmId]);

  const handleRootNodeChange = useCallback((newRootId) => {
    const config = configRef.current;
    if (!sourceDataRef.current || !config.generator) return;

    stopPlayback();
    setRootNodeId(newRootId);
    rootNodeRef.current = newRootId;
    const { steps: nextSteps } = config.generator(sourceDataRef.current, newRootId);
    setSteps(nextSteps);
    stepsRef.current = nextSteps;
    setCurrentStepIndex(0);
    currentStepRef.current = 0;
  }, [stopPlayback]);

  const handleSpeedChange = useCallback((newSpeed) => {
    speedRef.current = newSpeed;
    setSpeed(newSpeed);
    if (isPlaying) {
      stopPlayback();
      setTimeout(startPlayback, 0);
    }
  }, [isPlaying, startPlayback, stopPlayback]);

  const togglePauseOperation = useCallback((operation) => {
    setPauseOnOperations((prev) => (
      prev.includes(operation)
        ? prev.filter((value) => value !== operation)
        : [...prev, operation]
    ));
  }, []);

  const toggleBookmark = useCallback((stepIndex = currentStepRef.current) => {
    setBookmarksByAlgorithm((prev) => {
      const bookmarks = prev[selectedAlgorithmId] || [];
      const hasBookmark = bookmarks.includes(stepIndex);
      const nextBookmarks = hasBookmark
        ? bookmarks.filter((value) => value !== stepIndex)
        : [...bookmarks, stepIndex].sort((a, b) => a - b);

      return {
        ...prev,
        [selectedAlgorithmId]: nextBookmarks,
      };
    });
  }, [selectedAlgorithmId]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const currentStep = steps[currentStepIndex] || steps[0] || null;
  const totalSteps = steps.length;
  const isFinished = totalSteps > 0 && currentStepIndex >= totalSteps - 1;
  const progress = totalSteps > 1 ? (currentStepIndex / (totalSteps - 1)) * 100 : 0;
  const currentOperation = getStepOperation(currentStep, currentAlgoConfig.type, selectedAlgorithmId);
  const currentOperationBadge = currentStep
    ? getOperationBadge(currentStep, currentAlgoConfig.type, selectedAlgorithmId)
    : null;
  const operationTypes = useMemo(() => {
    const seen = new Set();

    return steps.reduce((operations, step) => {
      const operation = getStepOperation(step, currentAlgoConfig.type, selectedAlgorithmId);
      if (seen.has(operation)) return operations;

      seen.add(operation);
      operations.push(getOperationBadge(step, currentAlgoConfig.type, selectedAlgorithmId));
      return operations;
    }, []);
  }, [currentAlgoConfig.type, selectedAlgorithmId, steps]);
  const bookmarks = bookmarksByAlgorithm[selectedAlgorithmId] || [];

  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target;
      const tagName = target?.tagName;
      const isEditing = target?.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(tagName);

      if (isEditing) return;

      if (event.key === ' ') {
        event.preventDefault();
        togglePlayback();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        stepForward();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        stepBackward();
      } else if (event.key === 'Home') {
        event.preventDefault();
        jumpToStart();
      } else if (event.key === 'End') {
        event.preventDefault();
        jumpToEnd();
      } else if (event.key.toLowerCase() === 'b') {
        event.preventDefault();
        toggleBookmark();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jumpToEnd, jumpToStart, stepBackward, stepForward, toggleBookmark, togglePlayback]);

  return {
    currentStep,
    currentStepIndex,
    totalSteps,
    progress,
    isFinished,
    bookmarks,
    currentAlgoConfig,
    currentOperation,
    currentOperationBadge,
    isAlgorithmLoading,
    isPlaying,
    operationTypes,
    pauseOnOperations,
    speed,
    sourceData,
    dataSize,
    rootNodeId,
    togglePlayback,
    jumpToStep,
    jumpToStart,
    jumpToEnd,
    stepForward,
    stepBackward,
    reset,
    toggleBookmark,
    togglePauseOperation,
    handleSpeedChange,
    handleDataSizeChange,
    handleRandomize,
    handleApplyInput,
    handleRootNodeChange,
  };
}
