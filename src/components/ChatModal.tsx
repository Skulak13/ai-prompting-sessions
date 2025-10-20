import { useEffect } from "react";
import type { Chat } from "../types";

interface ChatModalProps {
  chat: Chat;
  onClose: () => void;
}

export default function ChatModal({ chat, onClose }: ChatModalProps) {
  // Zamknij modal po naciśnięciu ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-8"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex"
        onClick={(e) => e.stopPropagation()}
      >
        {/* LEFT: Treść konwersacji */}
        <div className="flex-1 overflow-y-auto p-8 border-r border-gray-700">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{chat.emoji}</span>
              <h2 className="text-2xl font-bold text-white">{chat.title}</h2>
            </div>
            <span className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium">
              {chat.category}
            </span>
          </div>

          {/* Content */}
          <div className="prose prose-invert max-w-none">
            <div className="text-gray-300 whitespace-pre-line leading-relaxed">
              {chat.content}
            </div>
          </div>
        </div>

        {/* RIGHT: Analiza umiejętności */}
        <div className="w-96 bg-gray-900 p-8 overflow-y-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            aria-label="Zamknij"
          >
            <svg
              className="w-6 h-6"
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

          {/* Umiejętności */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span>💡</span>
              Zastosowane techniki
            </h3>
            <div className="flex flex-wrap gap-2">
              {chat.skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-lg text-sm border border-blue-500/30"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Analiza */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span>📊</span>
              Analiza promptowania
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {chat.analysis}
            </p>
          </div>

          {/* Powiązane chaty */}
          {chat.relatedChats.length > 0 && (
            <div className="mt-8 pt-8 border-t border-gray-700">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span>🔗</span>
                Powiązane tematy
              </h3>
              <div className="flex flex-wrap gap-2">
                {chat.relatedChats.map((id) => (
                  <span
                    key={id}
                    className="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg text-sm hover:bg-gray-600 cursor-pointer transition-colors"
                  >
                    Chat #{id}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
