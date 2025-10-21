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
  const mouseRef = useRef({ x: 0, y: 0 });

  // State do śledzenia pozycji ciał - wymusza re-render
  const [positions, setPositions] = useState<
    Map<string, { x: number; y: number }>
  >(new Map());

  // Stała prędkość dla wszystkich ciał
  const CONSTANT_SPEED = 2; // pixels per frame

  // Inicjalizacja Matter.js
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Tworzenie silnika Matter.js
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0 },
    });

    engineRef.current = engine;

    // Renderer (ukryty - używamy tylko do fizyki)
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

    // Ukryj canvas Matter.js
    render.canvas.style.position = "absolute";
    render.canvas.style.top = "0";
    render.canvas.style.left = "0";
    render.canvas.style.pointerEvents = "none";
    render.canvas.style.opacity = "0"; // Całkowicie ukryj

    renderRef.current = render;

    // Ściany (niewidoczne bariery na krawędziach)
    const wallThickness = 50;
    const walls = [
      Matter.Bodies.rectangle(
        width / 2,
        -wallThickness / 2,
        width,
        wallThickness,
        {
          isStatic: true,
          label: "wall",
          restitution: 1.0, // Idealne odbicie
        }
      ),
      Matter.Bodies.rectangle(
        width / 2,
        height + wallThickness / 2,
        width,
        wallThickness,
        {
          isStatic: true,
          label: "wall",
          restitution: 1.0,
        }
      ),
      Matter.Bodies.rectangle(
        -wallThickness / 2,
        height / 2,
        wallThickness,
        height,
        {
          isStatic: true,
          label: "wall",
          restitution: 1.0,
        }
      ),
      Matter.Bodies.rectangle(
        width + wallThickness / 2,
        height / 2,
        wallThickness,
        height,
        {
          isStatic: true,
          label: "wall",
          restitution: 1.0,
        }
      ),
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
          restitution: 1.0, // Idealna sprężystość (bez utraty energii)
          friction: 0,
          frictionAir: 0, // BEZ tarcia powietrza
          frictionStatic: 0,
          density: 0.001,
          label: chat.id,
          inertia: Infinity, // Zapobiega rotacji
          render: {
            fillStyle: getCategoryColor(chat.category),
          },
        }
      );

      // Nadaj losową prędkość początkową ze STAŁĄ wartością
      const angle = Math.random() * Math.PI * 2;
      Matter.Body.setVelocity(body, {
        x: Math.cos(angle) * CONSTANT_SPEED,
        y: Math.sin(angle) * CONSTANT_SPEED,
      });

      bodiesRef.current.set(chat.id, body);
      Matter.Composite.add(engine.world, body);
    });

    // Uruchom silnik i renderer
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    // Cleanup
    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      bodiesRef.current.clear();
    };
  }, [chats]);

  // Aktualizacja pozycji przycisków (wymusza re-render)
  useEffect(() => {
    if (isPaused || !engineRef.current) return;

    const updateInterval = setInterval(() => {
      const newPositions = new Map<string, { x: number; y: number }>();
      bodiesRef.current.forEach((body, id) => {
        newPositions.set(id, {
          x: body.position.x,
          y: body.position.y,
        });
      });
      setPositions(newPositions);
    }, 16); // ~60 FPS

    return () => clearInterval(updateInterval);
  }, [isPaused]);

  // Obsługa prędkości i pauzy
  useEffect(() => {
    if (!engineRef.current) return;

    engineRef.current.timing.timeScale = isPaused ? 0 : speed;
  }, [speed, isPaused]);

  // Obsługa ruchu myszy
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Utrzymanie stałej prędkości + efekt przyciągania do kursora
  useEffect(() => {
    if (isPaused || !engineRef.current) return;

    const engine = engineRef.current;

    const updateHandler = () => {
      const mousePos = mouseRef.current;

      bodiesRef.current.forEach((body) => {
        if (body.isStatic) return;

        // 1. EFEKT PRZYCIĄGANIA (lekkie odchylenie trajektorii)
        const dx = mousePos.x - body.position.x;
        const dy = mousePos.y - body.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const attractionRadius = 150;
        let targetVx = body.velocity.x;
        let targetVy = body.velocity.y;

        if (distance < attractionRadius && distance > 0) {
          // Lekkie odchylenie w stronę kursora (ale nie zatrzymuje)
          const attractionStrength = 0.05 * (1 - distance / attractionRadius);
          targetVx += (dx / distance) * attractionStrength;
          targetVy += (dy / distance) * attractionStrength;
        }

        // 2. NORMALIZACJA DO STAŁEJ PRĘDKOŚCI
        const currentSpeed = Math.sqrt(
          targetVx * targetVx + targetVy * targetVy
        );

        if (currentSpeed > 0) {
          // Przywróć stałą prędkość bazową (można modyfikować przez slider)
          const normalizedVx =
            (targetVx / currentSpeed) * CONSTANT_SPEED * speed;
          const normalizedVy =
            (targetVy / currentSpeed) * CONSTANT_SPEED * speed;

          Matter.Body.setVelocity(body, {
            x: normalizedVx,
            y: normalizedVy,
          });
        }
      });
    };

    Matter.Events.on(engine, "beforeUpdate", updateHandler);

    return () => {
      Matter.Events.off(engine, "beforeUpdate", updateHandler);
    };
  }, [isPaused, speed]);

  // Obsługa kliknięć na przyciski (delegowana do ChatButton)
  const handleChatClick = (chat: Chat) => {
    onChatClick(chat);
  };

  return (
    <div className="flex-1 relative bg-gray-900 overflow-hidden">
      <div ref={containerRef} className="w-full h-full" />

      {/* Overlay z tytułami (renderowane przez React) */}
      {chats.map((chat) => {
        const pos = positions.get(chat.id);
        if (!pos) return null;

        return (
          <ChatButton
            key={chat.id}
            chat={chat}
            x={pos.x}
            y={pos.y}
            onClick={() => handleChatClick(chat)}
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
                 transition-all duration-200 shadow-lg pointer-events-auto
                 whitespace-nowrap"
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
