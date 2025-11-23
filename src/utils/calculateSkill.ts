export const calculateSkill = (
  correct: number,
  wrong: number,
  learned: number
): number => {
  return Math.max(0, correct * 2 - wrong + learned);
};
