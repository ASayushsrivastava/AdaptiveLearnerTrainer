import React, { useRef, useState } from "react";
import { EventBus, createEventBus } from "../eventBus/eventBus";
import AdaptiveGenerator from "../modules/AdaptiveGenerator/AdaptiveGenerator";
import FlashcardEngine from "../modules/FlashcardEngine/FlashcardEngine";
import FocusMonitor from "../modules/FocusMonitor/FocusMonitor";
import PaceTimer from "../modules/PaceTimer/PaceTimer";

interface Props {
  difficulty: number;
  onComplete: (score: number, learned: number) => void;
}

const TestContainer: React.FC<Props> = ({ difficulty, onComplete }) => {
  const busRef = useRef<Partial<EventBus>>(createEventBus());

  const [score, setScore] = useState(0);
  const [learned, setLearned] = useState(0);

  busRef.current.onModuleComplete = () => {
    onComplete(score, learned);
  };

  busRef.current.onReveal = () => setLearned((l) => l + 1);

  busRef.current.onScoreChange = (newScore) => {
    setScore(newScore);
  };

  return (
    <div>
      <AdaptiveGenerator busRef={busRef} selectedDifficulty={difficulty} />
      <FlashcardEngine busRef={busRef} />
      <FocusMonitor busRef={busRef} />
      <PaceTimer busRef={busRef} />
    </div>
  );
};

export default TestContainer;
