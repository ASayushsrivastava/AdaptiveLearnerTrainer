import { Question } from "../../eventBus/eventBus";

export const fakeFetchQuestions = (
  difficulty: number,
  pool: Question[]
): Promise<Question[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(pool.filter((q) => q.difficulty === difficulty));
    }, 900); // fake network delay
  });
};
