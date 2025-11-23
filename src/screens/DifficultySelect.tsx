import React from "react";

interface Props {
  onSelect: (d: number) => void;
}

const DifficultySelect: React.FC<Props> = ({ onSelect }) => {
  return (
    <div style={{ padding: 20 }}>
      <h2>Select Difficulty Module</h2>

      <button onClick={() => onSelect(1)} style={{ margin: 10 }}>
        Easy
      </button>

      <button onClick={() => onSelect(2)} style={{ margin: 10 }}>
        Medium
      </button>

      <button onClick={() => onSelect(3)} style={{ margin: 10 }}>
        Hard
      </button>
    </div>
  );
};

export default DifficultySelect;
