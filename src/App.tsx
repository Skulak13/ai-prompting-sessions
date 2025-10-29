import { useState, useMemo } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatCanvas from "./components/ChatCanvas";
import ChatModal from "./components/ChatModal.tsx";
import type { Category, Chat, RatingFilter } from "./types";
import { chats } from "./data/chats";

function App() {
  const [activeCategories, setActiveCategories] = useState<Category[]>([
    "nauka",
    "filozofia",
    "technologia",
    "historia",
    "polityka",
    "sztuka",
  ]);
  const [activeRatings, setActiveRatings] = useState<
    Array<Exclude<RatingFilter, null>>
  >([]); // Zmienione na tablicę
  const [speed, setSpeed] = useState(1.0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  // Memoizujemy filteredChats, aby referencja tablicy zmieniała się tylko kiedy naprawdę
  // zmienią się filtry (activeCategories / activeRatings).
  const filteredChats = useMemo(() => {
    return chats.filter((chat) => {
      // Filtr kategorii
      const categoryMatch =
        activeCategories.length === 0 ||
        activeCategories.includes(chat.category);

      // Filtr oceny
      let ratingMatch = true;
      if (activeRatings.length > 0 && chat.metrics) {
        const avgRating =
          (chat.metrics.clarity +
            chat.metrics.adaptation +
            chat.metrics.depth +
            chat.metrics.criticalThinking) /
          4;

        ratingMatch = activeRatings.some((rating) => {
          if (rating === 4) {
            // Grupa 4 i 4.3
            return avgRating >= 4 && avgRating < 4.5;
          } else {
            // Dokładne dopasowanie dla pozostałych
            return Math.abs(avgRating - rating) < 0.1;
          }
        });
      }

      return categoryMatch && ratingMatch;
    });
  }, [activeCategories, activeRatings]);

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <Header
        activeCategories={activeCategories}
        setActiveCategories={setActiveCategories}
        activeRatings={activeRatings}
        setActiveRatings={setActiveRatings}
        speed={speed}
        setSpeed={setSpeed}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
      />

      <ChatCanvas
        chats={filteredChats}
        speed={speed}
        isPaused={isPaused}
        onChatClick={setSelectedChat}
      />

      <Footer />

      {selectedChat && (
        <ChatModal chat={selectedChat} onClose={() => setSelectedChat(null)} />
      )}
    </div>
  );
}

export default App;
