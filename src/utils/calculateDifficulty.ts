export const calculateDifficulty = (
  feedback: number,
  baseDifficulty: number,
  distraction: number
): number => {
  // Medium realism logic
  let diff = baseDifficulty + feedback;

  // High distraction → reduce difficulty
  if (distraction > 60) diff -= 1;

  return Math.min(3, Math.max(1, diff));
};
