import React from "react";

interface Props {
  score: number;
  learned: number;
  onRestart: () => void;
}

const FinalScore: React.FC<Props> = ({ score, learned, onRestart }) => {
  return (
    <div style={{ padding: 20 }}>
      <h2>Final Score</h2>
      <p>Score: {score}</p>
      <p>Learned: {learned}</p>

      <button onClick={onRestart} style={{ marginTop: 20 }}>
        Restart
      </button>
    </div>
  );
};

export default FinalScore;
