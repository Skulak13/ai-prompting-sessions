import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import type { Chat } from "../types";

interface ChatCanvasProps {
  chats: Chat[];
  speed: number;
  isPaused: boolean;
  onChatClick: (chat: Chat) => void;
}

export default function ChatCanvas({
  chats,
  speed,
  isPaused,
  onChatClick,
}: ChatCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const bodiesRef = useRef<Map<string, Matter.Body>>(new Map());
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Tworzenie silnika Matter.js
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0 }, // Brak grawitacji
    });

    engineRef.current = engine;

    // Renderer (opcjonalny - do debugowania)
    const render = Matter.Render.create({
      element: container,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
      },
    });

    renderRef.current = render;

    // Ściany (niewidoczne bariery na krawędziach)
    const walls = [
      Matter.Bodies.rectangle(width / 2, -25, width, 50, { isStatic: true }),
      Matter.Bodies.rectangle(width / 2, height + 25, width, 50, {
        isStatic: true,
      }),
      Matter.Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true }),
      Matter.Bodies.rectangle(width + 25, height / 2, 50, height, {
        isStatic: true,
      }),
    ];

    Matter.Composite.add(engine.world, walls);

    // Dodaj ciała dla każdego chatu
    chats.forEach((chat) => {
      const radius = 40 + Math.random() * 20;
      const body = Matter.Bodies.circle(
        Math.random() * (width - 200) + 100,
        Math.random() * (height - 200) + 100,
        radius,
        {
          restitution: 0.8, // Sprężystość odbicia
          friction: 0.001,
          frictionAir: 0.01,
          density: 0.001,
          render: {
            fillStyle: getCategoryColor(chat.category),
          },
        }
      );

      // Nadaj losową prędkość początkową
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5,
      });

      bodiesRef.current.set(chat.id, body);
      Matter.Composite.add(engine.world, body);
    });

    // Uruchom silnik
    Matter.Runner.run(engine);
    Matter.Render.run(render);

    // Cleanup
    return () => {
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      bodiesRef.current.clear();
    };
  }, [chats]);

  // Obsługa prędkości
  useEffect(() => {
    if (!engineRef.current) return;

    engineRef.current.timing.timeScale = isPaused ? 0 : speed;
  }, [speed, isPaused]);

  // Obsługa ruchu myszy (efekt grawitacji)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Efekt przyciągania do kursora
  useEffect(() => {
    if (isPaused || !engineRef.current) return;

    const interval = setInterval(() => {
      bodiesRef.current.forEach((body) => {
        const dx = mousePos.x - body.position.x;
        const dy = mousePos.y - body.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
          // Promień oddziaływania
          const force = 0.0001 * (1 - distance / 200);
          Matter.Body.applyForce(body, body.position, {
            x: dx * force,
            y: dy * force,
          });
        }
      });
    }, 16);

    return () => clearInterval(interval);
  }, [mousePos, isPaused]);

  // Obsługa kliknięć
  const handleClick = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Sprawdź, czy kliknięto w jakieś ciało
    chats.forEach((chat) => {
      const body = bodiesRef.current.get(chat.id);
      if (!body) return;

      const dx = clickX - body.position.x;
      const dy = clickY - body.position.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < (body.circleRadius || 0)) {
        onChatClick(chat);
      }
    });
  };

  return (
    <div className="flex-1 relative bg-gray-900 overflow-hidden">
      <div
        ref={containerRef}
        onClick={handleClick}
        className="w-full h-full cursor-pointer"
      />

      {/* Overlay z tytułami (renderowane przez React, nie Matter.js) */}
      {chats.map((chat) => {
        const body = bodiesRef.current.get(chat.id);
        if (!body) return null;

        return (
          <ChatButton
            key={chat.id}
            chat={chat}
            x={body.position.x}
            y={body.position.y}
            onClick={() => onChatClick(chat)}
          />
        );
      })}
    </div>
  );
}

// Komponent pojedynczego przycisku
function ChatButton({
  chat,
  x,
  y,
  onClick,
}: {
  chat: Chat;
  x: number;
  y: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 
                 bg-gray-800/90 backdrop-blur-sm border-2 border-blue-500/50
                 rounded-full px-4 py-2 text-white text-sm font-medium
                 hover:bg-blue-600/20 hover:border-blue-400 hover:scale-110
                 transition-all duration-200 shadow-lg pointer-events-auto"
      style={{
        left: `${x}px`,
        top: `${y}px`,
      }}
    >
      <span className="mr-1">{chat.emoji}</span>
      {chat.title}
    </button>
  );
}

// Funkcja pomocnicza do kolorów kategorii
function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    nauka: "#3b82f6",
    filozofia: "#8b5cf6",
    technologia: "#10b981",
    historia: "#f59e0b",
    polityka: "#ef4444",
    sztuka: "#ec4899",
    wszystkie: "#6b7280",
  };
  return colors[category] || colors.wszystkie;
}
