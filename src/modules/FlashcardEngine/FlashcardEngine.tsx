import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Question, EventBus } from "../../eventBus/eventBus";
import { calculateSkill } from "../../utils/calculateSkill";

interface Props {
  busRef: React.MutableRefObject<Partial<EventBus>>;
}

const FlashcardEngine: React.FC<Props> = ({ busRef }) => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [learned, setLearned] = useState(0);

  const cardRef = useRef<HTMLDivElement | null>(null);

  // Receive new question from generator
  busRef.current.onProvideQuestion = (q) => {
    setQuestion(q);
    setSelected(null);
    setIsRevealed(false);
    setCompleted(false);
  };

  // Forced reveal animation
  const triggerRevealAnimation = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = "all 0.2s ease";
    cardRef.current.style.transform = "scale(1.02)";
    setTimeout(() => {
      if (cardRef.current) {
        cardRef.current.style.transform = "scale(1)";
      }
    }, 200);
  };

  // Handle answer select
  const handleSelect = (idx: number) => {
    if (completed) return;

    setSelected(idx);

    if (idx !== question?.correctIndex) {
      // Wrong → forced reveal
      setIsRevealed(true);
      setWrong((w) => w + 1);
      setLearned((l) => l + 1);
      busRef.current.onReveal?.();
      triggerRevealAnimation();
    }
  };

  // User clicks Reveal manually
  const handleReveal = () => {
    if (!isRevealed) {
      setIsRevealed(true);
      setLearned((l) => l + 1);
      busRef.current.onReveal?.();
      triggerRevealAnimation();
    }
  };

  // Complete card
  const handleComplete = () => {
    if (!question) return;
    if (completed) return;

    let feedbackDifficulty = 0; // 1 easy, 2 medium, 3 hard from UI below
    const selectedDiffEl = document.querySelector<HTMLInputElement>(
      "input[name='difficulty-feedback']:checked"
    );

    if (!selectedDiffEl) return alert("Select difficulty feedback");

    feedbackDifficulty = Number(selectedDiffEl.value);

    // Score handling
    if (selected === question.correctIndex && !isRevealed) {
      setCorrect((c) => c + 1);
    }

    // Send difficulty feedback
    busRef.current.onDifficultyFeedback?.(feedbackDifficulty);

    // Compute skill
    const skill = calculateSkill(correct, wrong, learned);
    busRef.current.onSkillChange?.(skill);

    setCompleted(true);
    busRef.current.onCardCompleted?.();

    // Proceed to next
    busRef.current.onRequestNextQuestion?.();
  };

  if (!question) {
    return <div style={{ padding: 20 }}>Loading question...</div>;
  }

  return (
    <div
      ref={cardRef}
      style={{
        border: "1px solid #ddd",
        padding: 20,
        margin: 20,
        borderRadius: 8,
        width: 400,
        boxShadow: "0 0 4px rgba(0,0,0,0.2)",
      }}
    >
      <h3>{question.question}</h3>

      <div>
        {question.options.map((opt, idx) => (
          <div
            key={idx}
            onClick={() => handleSelect(idx)}
            style={{
              padding: 8,
              marginTop: 6,
              cursor: "pointer",
              border: "1px solid #ccc",
              background:
                selected === idx
                  ? idx === question.correctIndex
                    ? "#b2ffb2"
                    : "#ffb2b2"
                  : "#f9f9f9",
            }}
          >
            {opt}
          </div>
        ))}
      </div>

      <button
        onClick={handleReveal}
        style={{ marginTop: 10, padding: 6, cursor: "pointer" }}
      >
        Reveal
      </button>

      {isRevealed && (
        <div
          style={{
            marginTop: 10,
            padding: 10,
            background: "#e8e8ff",
            borderRadius: 6,
          }}
        >
          <strong>Answer:</strong> {question.answer}
        </div>
      )}

      <div style={{ marginTop: 15 }}>
        <label>
          <input type="radio" name="difficulty-feedback" value="1" /> Easy
        </label>
        <br />
        <label>
          <input type="radio" name="difficulty-feedback" value="2" /> Medium
        </label>
        <br />
        <label>
          <input type="radio" name="difficulty-feedback" value="3" /> Hard
        </label>
      </div>

      <button
        onClick={handleComplete}
        style={{
          marginTop: 15,
          padding: 8,
          cursor: "pointer",
          background: "#3d8bfd",
          color: "#fff",
          border: "none",
          borderRadius: 4,
        }}
      >
        Complete
      </button>
    </div>
  );
};

export default FlashcardEngine;
