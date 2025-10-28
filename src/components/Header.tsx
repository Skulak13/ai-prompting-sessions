import type { Category, RatingFilter } from "../types";
import avatar from "../assets/images/skulfancy.webp";

interface HeaderProps {
  activeCategories: Category[];
  setActiveCategories: (categories: Category[]) => void;
  activeRatings: Array<Exclude<RatingFilter, null>>; // Zmienione na tablicę
  setActiveRatings: (ratings: Array<Exclude<RatingFilter, null>>) => void; // Zmienione na tablicę
  speed: number;
  setSpeed: (speed: number) => void;
  isPaused: boolean;
  setIsPaused: (paused: boolean) => void;
}

const categories: Category[] = [
  "nauka",
  "filozofia",
  "technologia",
  "historia",
  "polityka",
  "sztuka",
  "wszystkie",
];

const categoryLabels: Record<Category, string> = {
  nauka: "Nauka",
  filozofia: "Filozofia",
  technologia: "Technologia",
  historia: "Historia",
  polityka: "Polityka",
  sztuka: "Sztuka",
  wszystkie: "Wszystkie",
};

const ratings: Array<Exclude<RatingFilter, null>> = [4, 4.5, 4.8, 5];

const ratingLabels: Record<number, string> = {
  4: "★ 4.0+",
  4.5: "★ 4.5",
  4.8: "★ 4.8",
  5: "★ 5.0",
};

export default function Header({
  activeCategories,
  setActiveCategories,
  activeRatings,
  setActiveRatings,
  speed,
  setSpeed,
  isPaused,
  setIsPaused,
}: HeaderProps) {
  const toggleCategory = (category: Category) => {
    if (category === "wszystkie") {
      setActiveCategories(["wszystkie"]);
      return;
    }

    let newCategories = activeCategories.filter((c) => c !== "wszystkie");

    if (newCategories.includes(category)) {
      newCategories = newCategories.filter((c) => c !== category);
      if (newCategories.length === 0) {
        newCategories = ["wszystkie"];
      }
    } else {
      newCategories.push(category);
    }

    setActiveCategories(newCategories);
  };

  const toggleRating = (rating: Exclude<RatingFilter, null>) => {
    if (activeRatings.includes(rating)) {
      // Jeśli ocena jest już aktywna, usuń ją
      setActiveRatings(activeRatings.filter((r) => r !== rating));
    } else {
      // Jeśli ocena nie jest aktywna, dodaj ją
      setActiveRatings([...activeRatings, rating]);
    }
  };

  const isCategoryActive = (category: Category) => {
    return (
      activeCategories.includes(category) ||
      activeCategories.includes("wszystkie")
    );
  };

  const isRatingActive = (rating: Exclude<RatingFilter, null>) => {
    return activeRatings.includes(rating);
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 px-8 py-6">
      <div className="flex items-start justify-between gap-6">
        {/* LEFT: Logo i nazwisko */}
        <div className="flex flex-col items-center min-w-[120px]">
          <img
            src={avatar}
            alt="Logo"
            className="w-20 h-20 mb-2 rounded-full border-2 border-blue-500"
          />
          <p className="text-gray-300 text-sm font-medium">Tomek Skulski</p>
        </div>

        {/* CENTER: Tytuł, podtytuł i filtry */}
        <div className="flex-1 max-w-3xl">
          {/* Tytuł i podtytuł */}
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-white mb-2">
              AI Conversations Portfolio
            </h1>
            <p className="text-gray-400 text-sm">
              Eksploracja wiedzy poprzez inteligentne dialogi z AI
            </p>
          </div>

          {/* Kategorie */}
          <div className="mb-3">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isCategoryActive(category)
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/50"
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  }`}
                >
                  {categoryLabels[category]}
                </button>
              ))}
            </div>
          </div>

          {/* Oceny */}
          <div>
            <div className="flex flex-wrap gap-2">
              {ratings.map((rating) => (
                <button
                  key={rating}
                  onClick={() => toggleRating(rating)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isRatingActive(rating)
                      ? "bg-amber-600 text-white shadow-lg shadow-amber-500/50"
                      : "bg-gray-700 text-amber-300 hover:bg-gray-600"
                  }`}
                >
                  {ratingLabels[rating]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Kontrolki animacji */}
        <div className="flex flex-col gap-4 min-w-[200px]">
          {/* Przycisk Play/Pause */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            {isPaused ? (
              <>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                <span>Wznów</span>
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zM12.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
                </svg>
                <span>Pauza</span>
              </>
            )}
          </button>

          {/* Suwak prędkości */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-xs font-medium">
              Prędkość: {speed.toFixed(1)}x
            </label>
            <input
              type="range"
              min="0.1"
              max="3"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Wolno</span>
              <span>Szybko</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
