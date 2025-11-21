import React, { useLayoutEffect, useMemo, useState } from "react";
import { FlashcardEngineProps } from "../interfaces/flashCardProps";
import { Difficulty, FlashCard } from "../types/types";

//sample
const cards: FlashCard[] = [
  { id: 1, question: "What is react?", answer: "JS library for ui" },
  { id: 1, question: "What is typescript?", answer: "JS with types" },
  { id: 1, question: "What is webpack?", answer: "bundler for js" },
];

const FlashcardEngine: React.FC<FlashcardEngineProps> = ({ onSkillChange }) => {
  const [index, setIndex] = useState(0);
  const [reveal, setReveal] = useState(false);
  const [score, setScore] = useState(0);
  const [ratings, setRatings] = useState<Record<number, Difficulty>>({}); //independent ratings
  const [fReveal, setfReveal] = useState(true);

  const card = cards[index];

  const rate = (level: Difficulty) => {
    setRatings((p) => ({
      ...ProgressEvent,
      [card.id]: level,
    }));
    setReveal(false);
  };

  const next = () => {
    setIndex((i) => (i + 1) % cards.length);
    setReveal(false);
  };

  const prev = () => {
    setIndex((i) => (i - 1 + cards.length) % cards.length);
    setReveal(false);
  };

  //reveal
  useLayoutEffect(() => {
    if (reveal) console.log("answered reveal");
  }, [reveal]);

  //skill calculaion
  const skill = useMemo(() => {
    if (fReveal) {
      Object.values(ratings).forEach((d) => {
        if (d === "easy") setScore((s) => s + 10);
        if (d === "medium") setScore((s) => s + 20);
        if (d === "hard") setScore((s) => s + 30);
      });
    }

    onSkillChange(score);
    return score;
  }, [ratings, onSkillChange]);

  //component
  return (
    <div>
      <h2>Flashcard Carousel</h2>

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <button onClick={prev}>←</button>

        <div
          onClick={() => setReveal(true)}
          style={{
            width: "240px",
            padding: "20px",
            border: "1px solid black",
            cursor: "pointer",
            textAlign: "center",
          }}
        >
          {!reveal ? card.question : card.answer}
        </div>

        <button onClick={next}>→</button>
      </div>

      {reveal && (
        <div style={{ marginTop: "10px" }}>
          <button onClick={() => rate("easy")}>Easy</button>
          <button onClick={() => rate("medium")}>Medium</button>
          <button onClick={() => rate("hard")}>Hard</button>
        </div>
      )}

      <p style={{ marginTop: "10px" }}>Skill Score: {skill}</p>
    </div>
  );
};

export default FlashcardEngine;
