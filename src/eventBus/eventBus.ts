export type Question = {
  id: number;
  difficulty: number; // 1 2 3
  question: string;
  options: string[];
  correctIndex: number;
  answer: string;
};

export type EventBus = {
  // Flashcard → system
  onSkillChange?: (skill: number) => void;
  onDifficultyFeedback?: (difficultyScore: number) => void;
  onCardCompleted?: () => void;
  onReveal?: () => void;
  onScoreChange?: (score: number) => void;

  // Adaptive generator → Flashcard
  onProvideQuestion?: (q: Question) => void;
  onModuleComplete?: (level: number) => void;
  onRequestNextQuestion?: () => void;

  // Focus monitor
  onDistractionChange?: (value: number) => void;

  // Pace timer
  onTimerSpeedChange?: (speed: number) => void;
};

export const createEventBus = () => {
  return {} as Partial<EventBus>;
};
