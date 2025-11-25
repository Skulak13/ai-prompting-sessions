import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import avatar from "../assets/images/skulfancy.webp";
import type { Category, RatingFilter } from "../types";

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

const ratingLabels: Record<Exclude<RatingFilter, null>, string> = {
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

  // focus refs
  const firstMenuItemRef = useRef<HTMLButtonElement | HTMLInputElement | null>(
    null
  );
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);

  const buttonBase =
    "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200";

  const computeMenuRect = useCallback(() => {
    const el = headerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMenuRect({
      top: rect.bottom,
      left: rect.left,
      width: rect.width,
    });
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onResize = () => computeMenuRect();
    const onScroll = () => computeMenuRect();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [menuOpen, computeMenuRect]);

  // toggle functions (no focus manipulations here — letting native focus remain)
  const toggleCategory = useCallback(
    (category: Category) => {
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
    },
    [activeCategories, setActiveCategories]
  );

  const toggleRating = useCallback(
    (rating: Exclude<RatingFilter, null>) => {
      if (activeRatings.includes(rating)) {
        setActiveRatings(activeRatings.filter((r) => r !== rating));
      } else {
        setActiveRatings([...activeRatings, rating]);
      }
    },
    [activeRatings, setActiveRatings]
  );

  const isCategoryActive = (category: Category) =>
    activeCategories.length === 0 || activeCategories.includes(category);

  const isRatingActive = (rating: Exclude<RatingFilter, null>) =>
    activeRatings.includes(rating);

  // Ensure computeMenuRect runs before opening so Dialog.Panel can be positioned.
  const openMenu = () => {
    computeMenuRect();
    setMenuOpen(true);
  };

  const closeMenu = () => setMenuOpen(false);

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
            className="w-24 h-24 mb-2 rounded-full border-2 border-blue-500"
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
                  className={`${buttonBase} ${
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
                  className={`${buttonBase} ${
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
              aria-label="Prędkość animacji"
              aria-valuenow={speed}
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
            ref={hamburgerRef}
            onClick={() => {
              if (menuOpen) {
                // close
                setMenuOpen(false);
              } else {
                // compute pos synchronously then open
                openMenu();
              }
            }}
            className="p-2 rounded-md hover:bg-gray-700 text-gray-200 transition bg-gray-700/0"
            aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
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

      {/* Mobile menu using Headless UI Dialog (focus trap + a11y) */}
      <Transition show={menuOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 xl:hidden"
          open={menuOpen}
          onClose={closeMenu}
          initialFocus={firstMenuItemRef}
        >
          {/* Overlay now starts below the header (so header is not dimmed) */}
          <div
            className="fixed left-0 right-0 bg-black/40"
            aria-hidden="true"
            style={{
              top: menuRect.top,
              height: `calc(100% - ${menuRect.top}px)`,
            }}
          />

          {/* Panel positioned under header using computed rect */}
          <div
            className="fixed left-0 top-0 w-full pointer-events-none"
            aria-hidden="true"
          >
            {/* spacer to let Panel be placed exactly at menuRect.top */}
            <div style={{ height: menuRect.top }} />
          </div>

          <div
            className="fixed z-50 left-0"
            style={{
              top: menuRect.top,
              left: menuRect.left,
              width: menuRect.width || "100%",
              pointerEvents: "auto",
            }}
          >
            <Dialog.Panel
              id="mobile-menu"
              className="relative mt-0 w-full bg-gray-800 border-t border-gray-700 px-4 py-4 rounded-b-lg shadow-2xl"
            >
              <div className="flex flex-wrap justify-center gap-2 mb-3 relative">
                {categories.map((category, index) => (
                  <button
                    key={category}
                    // set initial focus ref on first interactive element
                    ref={(el) => {
                      if (index === 0) firstMenuItemRef.current = el;
                    }}
                    onClick={() => {
                      toggleCategory(category);
                    }}
                    className={`${buttonBase} ${
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
                    onClick={() => {
                      toggleRating(rating);
                    }}
                    className={`${buttonBase} ${
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
                    // stop propagation on pointer/mouse down so parent/dialog overlay doesn't interfere during drag
                    onPointerDown={(e) => e.stopPropagation()}
                    onMouseDown={(e) => e.stopPropagation()}
                    // keep accessible label/props
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    aria-label="Prędkość animacji"
                    aria-valuenow={speed}
                  />

                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Wolno</span>
                    <span>Szybko</span>
                  </div>
                </div>
              </div>
              {/* sr-only close button for keyboard/screen-reader users - invisible to mouse/touch users
                  but focusable. Placed absolutely in the top-right corner of the panel (so it doesn't
                  affect layout) and styled to match the other menu buttons when it becomes visible.
                  It will only appear visually when focused (focus:not-sr-only). */}
              <button
                onClick={closeMenu}
                aria-label="Zamknij menu"
                className={`${buttonBase} focus:absolute focus:px-3 focus:py-1.5 right-4 top-4 sr-only focus:not-sr-only bg-red-900 text-white`}
              >
                Zamknij
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </header>
  );
}
