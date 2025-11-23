import React, { useEffect, useRef, useState } from "react";
import { Question, EventBus } from "../../eventBus/eventBus";
import { questionBank } from "../../data/questionBank";
import { fakeFetchQuestions } from "./fakeApi";

interface Props {
  busRef: React.MutableRefObject<Partial<EventBus>>;
  selectedDifficulty: number; // 1,2,3
}

const AdaptiveGenerator: React.FC<Props> = ({ busRef, selectedDifficulty }) => {
  const [pool, setPool] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);

  // Fetch pool on difficulty change
  useEffect(() => {
    let cancelled = false;

    fakeFetchQuestions(selectedDifficulty, questionBank).then((questions) => {
      if (!cancelled) {
        setPool(questions);
        setIndex(0);
        if (questions.length > 0) {
          busRef.current.onProvideQuestion?.(questions[0]);
        }
      }
    });

    return () => {
      cancelled = true;
    };
  }, [selectedDifficulty]);

  // When flashcard requests the next question
  busRef.current.onRequestNextQuestion = () => {
    const next = index + 1;

    if (next < pool.length) {
      setIndex(next);
      busRef.current.onProvideQuestion?.(pool[next]);
    } else {
      busRef.current.onModuleComplete?.(selectedDifficulty);
    }
  };

  return null; // headless module
};

export default AdaptiveGenerator;
