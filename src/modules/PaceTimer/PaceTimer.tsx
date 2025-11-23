import React, { useEffect, useState } from "react";
import { EventBus } from "../../eventBus/eventBus";
import { useAdaptiveTimer } from "./useAdaptiveTimer";

interface Props {
  busRef: React.MutableRefObject<Partial<EventBus>>;
}

const PaceTimer: React.FC<Props> = ({ busRef }) => {
  const [skill, setSkill] = useState(0);
  const [difficulty, setDifficulty] = useState(1);
  const [distraction, setDistraction] = useState(0);

  busRef.current.onSkillChange = (s) => setSkill(s);
  busRef.current.onDifficultyFeedback = (d) => setDifficulty(d);
  busRef.current.onDistractionChange = (d) => setDistraction(d);

  const time = useAdaptiveTimer(skill, difficulty, distraction);

  useEffect(() => {
    busRef.current.onTimerSpeedChange?.(time);
  }, [time]);

  return (
    <div style={{ padding: 10, fontSize: 14 }}>
      <strong>Timer:</strong> {time}s
    </div>
  );
};

export default PaceTimer;
