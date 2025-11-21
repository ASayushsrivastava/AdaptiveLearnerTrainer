import React, { useState } from "react";
import FlashcardEngine from "./components/FlashcardEngine";

const App: React.FC = () => {
  const [skill, setSkill] = useState(0);

  return (
    <>
      <div>
        <h2>
          Hello from <strong>React</strong>
          <FlashcardEngine onSkillChange={setSkill} />
        </h2>
      </div>
    </>
  );
};

export default App;
