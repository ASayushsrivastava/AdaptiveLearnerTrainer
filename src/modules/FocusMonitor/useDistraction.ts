import { useEffect, useRef, useState } from "react";
import { calculateDistraction } from "../../utils/calculateDistraction";

export const useDistraction = () => {
  const [distraction, setDistraction] = useState(0);

  const idleTime = useRef(0);
  const revealDelay = useRef(0);
  const lastMouseX = useRef(0);
  const mouseDistance = useRef(0);
  const lastActivity = useRef(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      idleTime.current = (Date.now() - lastActivity.current) / 1000;

      const score = calculateDistraction(
        idleTime.current,
        revealDelay.current,
        mouseDistance.current
      );

      setDistraction(score);
    }, 1200);

    const mouseMove = (e: MouseEvent) => {
      mouseDistance.current += Math.abs(e.clientX - lastMouseX.current);
      lastMouseX.current = e.clientX;
      lastActivity.current = Date.now();
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return distraction;
};
