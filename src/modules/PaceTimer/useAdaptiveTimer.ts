import { useEffect, useRef, useState } from "react";

export const useAdaptiveTimer = (
  skill: number,
  difficulty: number,
  distraction: number
) => {
  const [time, setTime] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const computeSpeed = () => {
    return 1000 + difficulty * 200 - skill * 50 + distraction * 30;
  };

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    const speed = computeSpeed();

    intervalRef.current = window.setInterval(() => {
      setTime((t) => t + 1);
    }, Math.max(300, speed));

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [skill, difficulty, distraction]);

  return time;
};
