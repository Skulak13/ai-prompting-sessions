import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import type { Category } from "./types";

function App() {
  const [activeCategories, setActiveCategories] = useState<Category[]>([
    "wszystkie",
  ]);
  const [speed, setSpeed] = useState(1.0);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <Header
      activeCategories={activeCategories}
      setActiveCategories={setActiveCategories}
      speed={speed}
      setSpeed={setSpeed}
      isPaused={isPaused}
      setIsPaused={setIsPaused}
    />
  );
}

export default App;
