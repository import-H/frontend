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

// https://shin1303.tistory.com/entry/React-%ED%83%80%EC%9D%B4%EB%A8%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0-%EC%8B%9C%EC%9E%91-%EC%A0%95%EC%A7%80-%EB%A6%AC%EC%85%8B-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84 참고
