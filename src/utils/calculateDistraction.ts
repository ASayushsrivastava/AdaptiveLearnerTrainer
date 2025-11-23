export const calculateDistraction = (
  idleTime: number,
  revealDelay: number,
  mouseDistance: number
): number => {
  // Basic weighted formula
  const score = idleTime * 0.5 + revealDelay * 0.3 + mouseDistance * 0.2;

  return Math.min(100, Math.floor(score));
};
