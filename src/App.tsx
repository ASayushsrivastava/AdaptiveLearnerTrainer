import React, { useState } from "react";
import DifficultySelect from "./screens/DifficultySelect";
import TestContainer from "./screens/TestContainer";
import FinalScore from "./screens/FinalScore";

const App: React.FC = () => {
  const [stage, setStage] = useState<"select" | "test" | "result">("select");
  const [difficulty, setDifficulty] = useState(1);
  const [score, setScore] = useState(0);
  const [learned, setLearned] = useState(0);

  const handleSelect = (d: number) => {
    setDifficulty(d);
    setStage("test");
  };

  const handleComplete = (finalScore: number, learnedCount: number) => {
    setScore(finalScore);
    setLearned(learnedCount);
    setStage("result");
  };

  const restart = () => {
    setStage("select");
    setScore(0);
    setLearned(0);
  };

  return (
    <div>
      {stage === "select" && <DifficultySelect onSelect={handleSelect} />}
      {stage === "test" && (
        <TestContainer difficulty={difficulty} onComplete={handleComplete} />
      )}
      {stage === "result" && (
        <FinalScore score={score} learned={learned} onRestart={restart} />
      )}
    </div>
  );
};

export default App;
