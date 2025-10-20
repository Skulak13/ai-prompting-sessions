import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatCanvas from "./components/ChatCanvas";
import ChatModal from "./components/ChatModal.tsx";
import type { Category, Chat } from "./types";
import { chats } from "./data/chats";

function App() {
  const [activeCategories, setActiveCategories] = useState<Category[]>([
    "wszystkie",
  ]);
  const [speed, setSpeed] = useState(1.0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  // Filtruj chaty na podstawie aktywnych kategorii
  const filteredChats = activeCategories.includes("wszystkie")
    ? chats
    : chats.filter((chat) => activeCategories.includes(chat.category));

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <Header
        activeCategories={activeCategories}
        setActiveCategories={setActiveCategories}
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
