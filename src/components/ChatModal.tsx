import { useEffect, useState } from "react";
import type { Chat } from "../types";

interface ChatModalProps {
  chat: Chat;
  onClose: () => void;
  // Lista wszystkich chatów (przekazana z App) - potrzebna, aby znaleźć tytuły powiązanych chatów
  allChats: Chat[];
  // Funkcja otwierająca powiązany chat po id (przekazana z App)
  onOpenRelated: (id: string) => void;
}

export default function ChatModal({
  chat,
  onClose,
  allChats,
  onOpenRelated,
}: ChatModalProps) {
  const [activeTab, setActiveTab] = useState<"content" | "analysis">("content");
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  // Zamknij modal po naciśnięciu ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedItems(newExpanded);
  };

  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  const SkillBadge = ({ skill }: { skill: string }) => (
    <span className="px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 rounded-lg text-sm border border-blue-400/30 hover:border-blue-400/60 transition-all hover:scale-105 cursor-default shadow-lg">
      {skill}
    </span>
  );

  const MetricBar = ({
    label,
    value,
    max = 5,
  }: {
    label: string;
    value: number;
    max?: number;
  }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-300 font-medium">{label}</span>
        <span className="text-sm text-blue-400 font-bold">
          {value}/{max}
        </span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  );

  const ListItem = ({ icon, text }: { icon: string; text: string }) => (
    <li className="flex items-start gap-3 text-gray-300 text-sm leading-relaxed">
      <span className="text-lg mt-0.5 flex-shrink-0">{icon}</span>
      <span>{text}</span>
    </li>
  );

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-2 sm:p-8 landscape-low:p-1"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl shadow-2xl max-w-7xl w-full max-h-[95vh] overflow-hidden flex flex-col border border-gray-700/50 landscape-low:max-h-[100vh] landscape-low:rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header z tabami */}
        <div className="bg-gray-900/50 border-b border-gray-700/50 p-3 sm:p-4 xl:p-6 landscape-low:p-2 landscape-low:py-1">
          <div className="flex items-start justify-between mb-3 sm:mb-3 xl:mb-4 landscape-low:mb-1">
            <div className="flex items-center gap-2 sm:gap-3 xl:gap-4 landscape-low:gap-1">
              <span className="text-3xl sm:text-4xl xl:text-5xl drop-shadow-lg landscape-low:text-2xl">
                {chat.emoji}
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl xl:text-3xl font-bold text-white mb-1 sm:mb-1.5 xl:mb-2 landscape-low:text-lg landscape-low:mb-0.5">
                  {chat.title}
                </h2>
                <span className="inline-block px-2 sm:px-3 xl:px-4 py-1 sm:py-1 xl:py-1.5 bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-blue-300 rounded-full text-xs sm:text-xs xl:text-sm font-medium border border-blue-500/30 landscape-low:px-1 landscape-low:py-0.5 landscape-low:text-[10px]">
                  {chat.category}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-1 sm:p-1.5 xl:p-2 hover:bg-gray-700/50 rounded-lg flex-shrink-0 landscape-low:p-0.5"
              aria-label="Zamknij"
            >
              <svg
                className="w-5 h-5 sm:w-5 xl:w-6 xl:h-6 landscape-low:w-4 landscape-low:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Tapy */}
          <div className="flex gap-1 sm:gap-1.5 xl:gap-2 landscape-low:gap-0.5">
            <button
              onClick={() => setActiveTab("content")}
              className={`px-3 sm:px-4 xl:px-6 py-2 sm:py-2 xl:py-2.5 rounded-lg font-medium transition-all text-xs sm:text-sm xl:text-base landscape-low:px-2 landscape-low:py-1 landscape-low:text-[10px] ${
                activeTab === "content"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
              }`}
            >
              📄 Konwersacja
            </button>
            <button
              onClick={() => setActiveTab("analysis")}
              className={`px-3 sm:px-4 xl:px-6 py-2 sm:py-2 xl:py-2.5 rounded-lg font-medium transition-all text-xs sm:text-sm xl:text-base landscape-low:px-2 landscape-low:py-1 landscape-low:text-[10px] ${
                activeTab === "analysis"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-gray-700/50 text-gray-300 hover:bg-gray-700"
              }`}
            >
              📊 Analiza umiejętności
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-hidden flex">
          {/* TAB: Treść konwersacji - ZOPTYMALIZOWANA DLA MOBILE */}
          {activeTab === "content" && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Scrollable conversation area */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-8 landscape-low:p-1 landscape-low:py-0.5">
                <div className="max-w-4xl mx-auto space-y-2 sm:space-y-4 landscape-low:space-y-1">
                  {chat.conversation.map((exchange, index) => {
                    const isExpanded = expandedItems.has(index);
                    const questionText = isExpanded
                      ? exchange.question
                      : truncateText(exchange.question, 100);
                    const answerText = isExpanded
                      ? exchange.answer
                      : truncateText(exchange.answer, 200);

                    return (
                      <div
                        key={index}
                        className="bg-gray-800/50 rounded-lg sm:rounded-xl border border-gray-700/50 overflow-hidden hover:border-gray-600/50 transition-all landscape-low:rounded-md"
                      >
                        {/* Pytanie */}
                        <div
                          className="p-3 sm:p-6 cursor-pointer hover:bg-gray-700/30 transition-colors landscape-low:p-1 landscape-low:py-0.5"
                          onClick={() => toggleItem(index)}
                        >
                          <div className="flex items-start gap-2 sm:gap-4 landscape-low:gap-1">
                            <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm landscape-low:w-4 landscape-low:h-4 landscape-low:text-[10px]">
                              Q{index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white font-medium leading-relaxed text-sm sm:text-base landscape-low:text-xs">
                                {questionText}
                              </p>
                              {!isExpanded &&
                                exchange.question.length > 100 && (
                                  <button className="text-blue-400 text-xs sm:text-sm mt-1 sm:mt-2 hover:text-blue-300 transition-colors landscape-low:text-[10px] landscape-low:mt-0.5">
                                    Rozwiń pytanie →
                                  </button>
                                )}
                            </div>
                            <div className="flex-shrink-0">
                              <svg
                                className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-400 transition-transform landscape-low:w-3 landscape-low:h-3 ${
                                  isExpanded ? "rotate-180" : ""
                                }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>

                        {/* Odpowiedź */}
                        <div
                          className={`border-t border-gray-700/50 bg-gray-900/30 transition-all ${
                            isExpanded ? "p-3 sm:p-6" : "p-2 sm:p-4"
                          } landscape-low:${isExpanded ? "p-1" : "p-0.5"}`}
                        >
                          <div className="flex items-start gap-2 sm:gap-4 landscape-low:gap-1">
                            <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xs sm:text-sm landscape-low:w-4 landscape-low:h-4 landscape-low:text-[10px]">
                              A
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-gray-300 leading-relaxed whitespace-pre-line text-xs sm:text-sm landscape-low:text-[10px]">
                                {answerText}
                              </p>
                              {!isExpanded && exchange.answer.length > 200 && (
                                <button
                                  onClick={() => toggleItem(index)}
                                  className="text-purple-400 text-xs sm:text-sm mt-2 sm:mt-3 hover:text-purple-300 transition-colors inline-flex items-center gap-1 landscape-low:text-[10px] landscape-low:mt-1 landscape-low:gap-0.5"
                                >
                                  Czytaj pełną odpowiedź →
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Fixed statistics at bottom */}
              <div className="border-t border-gray-700/50 bg-gray-900/80 backdrop-blur-sm p-3 sm:p-6 landscape-low:p-1 landscape-low:py-0.5">
                <div className="max-w-4xl mx-auto">
                  <h4 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2 sm:mb-4 landscape-low:text-[10px] landscape-low:mb-1">
                    Szybkie statystyki
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 landscape-low:gap-1 landscape-low:grid-cols-4">
                    <div className="bg-gray-800/50 rounded-lg p-2 sm:p-4 border border-gray-700/50 landscape-low:p-1 landscape-low:rounded-md">
                      <div className="text-xl sm:text-2xl font-bold text-blue-400 landscape-low:text-base">
                        {chat.conversation.length}
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1 landscape-low:text-[9px] landscape-low:mt-0">
                        Wymian
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-2 sm:p-4 border border-gray-700/50 landscape-low:p-1 landscape-low:rounded-md">
                      <div className="text-xl sm:text-2xl font-bold text-purple-400 landscape-low:text-base">
                        {chat.skills.length}
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1 landscape-low:text-[9px] landscape-low:mt-0">
                        Technik
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-2 sm:p-4 border border-gray-700/50 landscape-low:p-1 landscape-low:rounded-md">
                      <div className="text-xl sm:text-2xl font-bold text-green-400 landscape-low:text-base">
                        {chat.metrics
                          ? (
                              (chat.metrics.clarity +
                                chat.metrics.adaptation +
                                chat.metrics.depth +
                                chat.metrics.criticalThinking) /
                              4
                            ).toFixed(1)
                          : "N/A"}
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1 landscape-low:text-[9px] landscape-low:mt-0">
                        Średnia ocena
                      </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-lg p-2 sm:p-4 border border-gray-700/50 landscape-low:p-1 landscape-low:rounded-md">
                      <div className="text-xl sm:text-2xl font-bold text-orange-400 landscape-low:text-base">
                        {chat.relatedChats.length}
                      </div>
                      <div className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1 landscape-low:text-[9px] landscape-low:mt-0">
                        Powiązane
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Analiza */}
          {activeTab === "analysis" && (
            <div className="flex-1 overflow-y-auto">
              <div className="grid lg:grid-cols-2 gap-6 p-8 landscape-low:gap-2 landscape-low:p-2 landscape-low:grid-cols-1">
                {/* Lewa kolumna */}
                <div className="space-y-6">
                  {/* Zastosowane techniki */}
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 landscape-low:p-3 landscape-low:rounded-lg">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 landscape-low:text-lg landscape-low:mb-2">
                      <span>💡</span>
                      Zastosowane techniki
                    </h3>
                    <div className="flex flex-wrap gap-2 landscape-low:gap-1">
                      {chat.skills.map((skill, index) => (
                        <SkillBadge key={index} skill={skill} />
                      ))}
                    </div>
                  </div>

                  {/* Metryki */}
                  {chat.metrics && (
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 landscape-low:p-3 landscape-low:rounded-lg">
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 landscape-low:text-lg landscape-low:mb-3">
                        <span>📈</span>
                        Ocena umiejętności
                      </h3>
                      <MetricBar
                        label="Jasność komunikacji"
                        value={chat.metrics.clarity}
                      />
                      <MetricBar
                        label="Adaptacja poziomu"
                        value={chat.metrics.adaptation}
                      />
                      <MetricBar
                        label="Głębokość eksploracji"
                        value={chat.metrics.depth}
                      />
                      <MetricBar
                        label="Krytyczne myślenie"
                        value={chat.metrics.criticalThinking}
                      />
                    </div>
                  )}

                  {/* Mocne strony */}
                  {chat.strengths && chat.strengths.length > 0 && (
                    <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 rounded-xl p-6 border border-green-700/30 landscape-low:p-3 landscape-low:rounded-lg">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 landscape-low:text-lg landscape-low:mb-2">
                        <span>✅</span>
                        Mocne strony
                      </h3>
                      <ul className="space-y-3 landscape-low:space-y-1">
                        {chat.strengths.map((strength, i) => (
                          <ListItem key={i} icon="✓" text={strength} />
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Prawa kolumna */}
                <div className="space-y-6">
                  {/* Główna analiza */}
                  <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 landscape-low:p-3 landscape-low:rounded-lg">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 landscape-low:text-lg landscape-low:mb-2">
                      <span>🔍</span>
                      Kluczowe spostrzeżenia
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed landscape-low:text-xs">
                      {chat.analysis}
                    </p>
                  </div>

                  {/* Obszary do rozwoju */}
                  {chat.improvements && chat.improvements.length > 0 && (
                    <div className="bg-gradient-to-br from-orange-900/20 to-amber-900/20 rounded-xl p-6 border border-orange-700/30 landscape-low:p-3 landscape-low:rounded-lg">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 landscape-low:text-lg landscape-low:mb-2">
                        <span>🔶</span>
                        Obszary do rozwoju
                      </h3>
                      <ul className="space-y-3 landscape-low:space-y-1">
                        {chat.improvements.map((improvement, i) => (
                          <ListItem key={i} icon="→" text={improvement} />
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Wartość dla pracodawcy */}
                  {chat.employerValue && chat.employerValue.length > 0 && (
                    <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-xl p-6 border border-blue-700/30 landscape-low:p-3 landscape-low:rounded-lg">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 landscape-low:text-lg landscape-low:mb-2">
                        <span>💼</span>
                        Wartość dla pracodawcy
                      </h3>
                      <ul className="space-y-3 landscape-low:space-y-1">
                        {chat.employerValue.map((value, i) => (
                          <ListItem key={i} icon="💡" text={value} />
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Powiązane chaty (teraz jako przyciski otwierające modal powiązanego chatu) */}
                  {chat.relatedChats.length > 0 && (
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 landscape-low:p-3 landscape-low:rounded-lg">
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2 landscape-low:text-lg landscape-low:mb-2">
                        <span>🔗</span>
                        Powiązane tematy
                      </h3>
                      <div className="flex flex-wrap gap-2 landscape-low:gap-1">
                        {chat.relatedChats.map((id) => {
                          const related = allChats.find((c) => c.id === id);
                          const label = related ? related.title : `Chat #${id}`;
                          const disabled = id === chat.id || !related;

                          return (
                            <button
                              key={id}
                              onClick={(e) => {
                                e.stopPropagation();
                                if (!disabled) {
                                  onOpenRelated(id);
                                }
                              }}
                              disabled={disabled}
                              aria-disabled={disabled}
                              className={`px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg text-sm hover:bg-gray-600 transition-all hover:scale-105 border border-gray-600/50 landscape-low:px-2 landscape-low:py-1 landscape-low:text-xs ${
                                disabled
                                  ? "opacity-50 cursor-not-allowed"
                                  : "cursor-pointer"
                              }`}
                              title={
                                disabled
                                  ? "Nie można otworzyć"
                                  : `Otwórz: ${label}`
                              }
                            >
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
