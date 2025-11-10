import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Category, RatingFilter } from "../types";
import avatar from "../assets/images/skulfancy.webp";

interface HeaderProps {
  activeCategories: Category[];
  setActiveCategories: (categories: Category[]) => void;
  activeRatings: Array<Exclude<RatingFilter, null>>;
  setActiveRatings: (ratings: Array<Exclude<RatingFilter, null>>) => void;
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
];

const categoryLabels: Record<Category, string> = {
  nauka: "Nauka",
  filozofia: "Filozofia",
  technologia: "Technologia",
  historia: "Historia",
  polityka: "Polityka",
  sztuka: "Sztuka",
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuRect, setMenuRect] = useState({ top: 0, left: 0, width: 0 });
  const headerRef = useRef<HTMLElement | null>(null);
  const portalRef = useRef<HTMLDivElement | null>(null);

  const toggleCategory = (category: Category) => {
    const allState =
      activeCategories.length === 0 ||
      activeCategories.length === categories.length;

    if (allState) {
      setActiveCategories([category]);
      return;
    }

    if (activeCategories.includes(category)) {
      setActiveCategories(activeCategories.filter((c) => c !== category));
    } else {
      setActiveCategories([...activeCategories, category]);
    }
  };

  const toggleRating = (rating: Exclude<RatingFilter, null>) => {
    if (activeRatings.includes(rating)) {
      setActiveRatings(activeRatings.filter((r) => r !== rating));
    } else {
      setActiveRatings([...activeRatings, rating]);
    }
  };

  const isCategoryActive = (category: Category) =>
    activeCategories.length === 0 || activeCategories.includes(category);

  const isRatingActive = (rating: Exclude<RatingFilter, null>) =>
    activeRatings.includes(rating);

  // compute menu position under header (so it overlays the canvas)
  const computeMenuRect = () => {
    const el = headerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMenuRect({
      top: rect.bottom + window.scrollY, // fixed relative to document
      left: rect.left + window.scrollX,
      width: rect.width,
    });
  };

  useEffect(() => {
    if (menuOpen) {
      computeMenuRect();
    }
    const onResize = () => {
      if (menuOpen) computeMenuRect();
    };
    const onScroll = () => {
      if (menuOpen) computeMenuRect();
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [menuOpen]);

  // close on Escape and close on click outside portal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onDocClick = (e: MouseEvent) => {
      if (!menuOpen) return;
      const target = e.target as Node;
      if (!portalRef.current) return;
      if (
        !portalRef.current.contains(target) &&
        !headerRef.current?.contains(target)
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDocClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDocClick);
    };
  }, [menuOpen]);

  // render overlay (portal) content
  const MenuPortal = () => {
    // don't render on xl+ (menu isn't used there)
    // but we still allow portal to exist — Tailwind classes hide it.
    const style: React.CSSProperties = {
      position: "fixed",
      top: menuRect.top,
      left: menuRect.left,
      width: menuRect.width,
      zIndex: 70,
    };

    return createPortal(
      <div
        ref={portalRef}
        style={style}
        className="xl:hidden"
        aria-hidden={!menuOpen}
      >
        <div className="mt-0 w-full bg-gray-800 border-t border-gray-700 px-4 py-4 rounded-b-lg shadow-2xl">
          <div className="flex flex-wrap justify-center gap-2 mb-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isCategoryActive(category)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
              >
                {categoryLabels[category]}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {ratings.map((rating) => (
              <button
                key={rating}
                onClick={() => toggleRating(rating)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isRatingActive(rating)
                    ? "bg-amber-600 text-white"
                    : "bg-gray-700 text-amber-300 hover:bg-gray-600"
                }`}
              >
                {ratingLabels[rating]}
              </button>
            ))}
          </div>

          <div className="flex flex-col items-center gap-3">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors w-full max-w-[220px]"
            >
              {isPaused ? "▶ Wznów" : "⏸ Pauza"}
            </button>

            <div className="w-full max-w-[250px]">
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
      </div>,
      document.body
    );
  };

  return (
    <header
      ref={headerRef}
      className="bg-gray-800 border-b border-gray-700 px-4 py-1 md:px-8 lg:py-6 relative"
    >
      {/* XL+ layout (unchanged) */}
      <div className="hidden xl:flex items-start justify-between gap-6">
        <div className="flex flex-col items-center min-w-[120px]">
          <img
            src={avatar}
            alt="Author's photo"
            className="w-22 h-22 mb-2 rounded-full border-2 border-blue-500"
          />
          <p className="text-gray-300 text-sm font-medium whitespace-nowrap leading-none">
            Tomek Skulski
          </p>
        </div>

        <div className="flex-1 max-w-4xl">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-white mb-2">
              AI Conversations Portfolio
            </h1>
            <p className="text-gray-400 text-sm">
              Eksploracja wiedzy poprzez inteligentne dialogi z AI
            </p>
          </div>

          <div className="flex items-center gap-6">
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

            <div className="h-6 w-px bg-gray-600"></div>

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

        <div className="flex flex-col gap-4 min-w-[200px]">
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

      {/* <1280px header (avatar left, title centered, hamburger right) */}
      <div className="xl:hidden flex items-center justify-between gap-4">
        <div className="flex flex-col items-center justify-start min-w-[78px]">
          <img
            src={avatar}
            alt="Author"
            className="w-11 h-11 lg:w-14 lg:h-14 rounded-full border-2 border-blue-500"
          />
          <p className="text-gray-300 text-xs sm:text-sm font-medium whitespace-nowrap leading-none tracking-tight mt-1">
            Tomek Skulski
          </p>
        </div>

        <div className="flex-1 text-center px-2">
          <h1 className="text-lg sm:text-2xl font-bold text-white leading-tight">
            AI Conversations Portfolio
          </h1>
          <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
            Eksploracja wiedzy poprzez inteligentne dialogi z AI
          </p>
        </div>

        <div className="flex items-center">
          <button
            onClick={() => {
              // toggle and compute position on open
              setMenuOpen((s) => {
                const next = !s;
                if (!next) return false;
                // if opening, compute position next tick
                setTimeout(() => computeMenuRect(), 0);
                return next;
              });
            }}
            className="p-2 rounded-md hover:bg-gray-700 text-gray-200 transition bg-gray-700/0"
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 6h18M3 12h18M3 18h18"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Render portal when open so the menu overlays the canvas and doesn't affect layout */}
      {menuOpen && <MenuPortal />}
    </header>
  );
}
