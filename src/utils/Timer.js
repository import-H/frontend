import { useState, useRef, useCallback, useEffect } from "react";

export const useCounter = (initialValue, ms) => {
  const [count, setCount] = useState(initialValue);
  const intervalRef = useRef(null);
  const start = useCallback(() => {
    setCount(initialValue);

    intervalRef.current = setInterval(() => {
      setCount(c => c - 1);
    }, ms);
  }, []);
  const stop = useCallback(() => {
    if (intervalRef.current === null) {
      return;
    }
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);
  useEffect(() => {
    if (count <= 0) {
      stop();
    }
  }, [count]);
  return { count, start, stop };
};
