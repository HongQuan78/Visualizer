import { useState, useRef, useCallback, useEffect } from 'react';
import { generateBubbleSortSteps, generateRandomArray } from '../algorithms/bubbleSort';

/**
 * Hook personalizado que gestiona toda la lógica de reproducción
 * del algoritmo: play, pause, step forward/back, velocidad, reset.
 */

const DEFAULT_ARRAY_SIZE = 12;
const SPEED_MAP = { '0.5x': 1200, '1x': 600, '2x': 300, '4x': 100 };

export default function useVisualizerEngine() {
  // Estado del arreglo fuente
  const [arraySize, setArraySize] = useState(DEFAULT_ARRAY_SIZE);
  const [sourceArray, setSourceArray] = useState(() => generateRandomArray(DEFAULT_ARRAY_SIZE));

  // Estado del motor de pasos
  const [steps, setSteps] = useState(() => generateBubbleSortSteps(generateRandomArray(DEFAULT_ARRAY_SIZE)).steps);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState('1x');

  // Ref para el intervalo de reproducción (evita closures obsoletos)
  const intervalRef = useRef(null);
  const currentStepRef = useRef(currentStepIndex);
  const stepsRef = useRef(steps);

  // Mantener refs sincronizados con el estado
  useEffect(() => {
    currentStepRef.current = currentStepIndex;
  }, [currentStepIndex]);

  useEffect(() => {
    stepsRef.current = steps;
  }, [steps]);

  // ──────────────────────────────
  // Generar nuevos pasos al cambiar el arreglo fuente
  // ──────────────────────────────
  const regenerate = useCallback((newArray) => {
    stopPlayback();
    const { steps: newSteps } = generateBubbleSortSteps(newArray);
    setSourceArray(newArray);
    setSteps(newSteps);
    setCurrentStepIndex(0);
  }, []);

  // ──────────────────────────────
  // Controles de arreglo
  // ──────────────────────────────
  const handleArraySizeChange = useCallback((newSize) => {
    const clamped = Math.max(4, Math.min(30, newSize));
    setArraySize(clamped);
    const newArr = generateRandomArray(clamped);
    regenerate(newArr);
  }, [regenerate]);

  const handleRandomize = useCallback(() => {
    const newArr = generateRandomArray(arraySize);
    regenerate(newArr);
  }, [arraySize, regenerate]);

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

    // Estado de reproducción
    isPlaying,
    speed,

    // Datos del arreglo fuente
    sourceArray,
    arraySize,

    // Acciones
    togglePlayback,
    stepForward,
    stepBackward,
    reset,
    handleSpeedChange,
    handleArraySizeChange,
    handleRandomize,
  };
}
