import { useEffect, useRef, useState } from "react";
import type { Chat } from "../types";

interface Circle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

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
  const circlesRef = useRef<Circle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const [positions, setPositions] = useState<
    Map<string, { x: number; y: number }>
  >(new Map());

  const BASE_SPEED = 1.8; // prędkość podstawowa w jednostkach velocity
  const RADIUS = 60;

  // Inicjalizacja / synchronizacja kół z listą chatów:
  // zachowujemy istniejące obiekty kół dla tych samych id, tworzymy nowe tylko dla nowych chatów.
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Mapa istniejących kół
    const existingMap = new Map(circlesRef.current.map((c) => [c.id, c]));

    // Zbuduj nową listę: dla każdego incoming chatu - przywróć istniejące lub utwórz nowe
    const newCircles: Circle[] = chats.map((chat) => {
      const existing = existingMap.get(chat.id);
      if (existing) {
        // dopilnuj, żeby koło nie wyjdzie poza aktualne bounds
        existing.radius = RADIUS;
        existing.x = Math.min(
          Math.max(existing.x, existing.radius),
          width - existing.radius
        );
        existing.y = Math.min(
          Math.max(existing.y, existing.radius),
          height - existing.radius
        );
        return existing;
      }

      const angle = Math.random() * Math.PI * 2;
      return {
        id: chat.id,
        x: Math.random() * (width - RADIUS * 2) + RADIUS,
        y: Math.random() * (height - RADIUS * 2) + RADIUS,
        vx: Math.cos(angle) * BASE_SPEED,
        vy: Math.sin(angle) * BASE_SPEED,
        radius: RADIUS,
      } as Circle;
    });

    // Podstaw nową listę (zachowuje obiekty istniejące jeśli id się zgadza)
    circlesRef.current = newCircles;

    // Zaktualizuj stan pozycji (do renderowania)
    const newPositions = new Map<string, { x: number; y: number }>();
    newCircles.forEach((circle) => {
      newPositions.set(circle.id, { x: circle.x, y: circle.y });
    });
    setPositions(newPositions);

    // Obsługa resize: przy zmianie rozmiaru okna trzymamy koła w boundsach i aktualizujemy pozycje
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      circlesRef.current.forEach((c) => {
        c.x = Math.min(Math.max(c.x, c.radius), w - c.radius);
        c.y = Math.min(Math.max(c.y, c.radius), h - c.radius);
      });
      const p = new Map<string, { x: number; y: number }>();
      circlesRef.current.forEach((c) => p.set(c.id, { x: c.x, y: c.y }));
      setPositions(p);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [chats]);

  // Sprawdzanie kolizji i rozwiązywanie (jak wcześniej)
  const checkCircleCollision = (c1: Circle, c2: Circle): boolean => {
    const dx = c2.x - c1.x;
    const dy = c2.y - c1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < c1.radius + c2.radius;
  };

  const resolveCircleCollision = (c1: Circle, c2: Circle) => {
    const dx = c2.x - c1.x;
    const dy = c2.y - c1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) return;

    const nx = dx / distance;
    const ny = dy / distance;
    const tx = -ny;
    const ty = nx;

    const v1n = c1.vx * nx + c1.vy * ny;
    const v1t = c1.vx * tx + c1.vy * ty;
    const v2n = c2.vx * nx + c2.vy * ny;
    const v2t = c2.vx * tx + c2.vy * ty;

    // Zamień komponenty normalne (prosta, elastyczna kolizja)
    c1.vx = v2n * nx + v1t * tx;
    c1.vy = v2n * ny + v1t * ty;
    c2.vx = v1n * nx + v2t * tx;
    c2.vy = v1n * ny + v2t * ty;

    const overlap = (c1.radius + c2.radius - distance) / 2;
    c1.x -= overlap * nx;
    c1.y -= overlap * ny;
    c2.x += overlap * nx;
    c2.y += overlap * ny;

    normalizeVelocity(c1);
    normalizeVelocity(c2);
  };

  // Normalizacja prędkości: zachowujemy bazową prędkość (BASE_SPEED) a
  // faktyczny ruch sterowany jest przez zewnętrzny współczynnik `speed`.
  const normalizeVelocity = (circle: Circle) => {
    const currentSpeed = Math.sqrt(
      circle.vx * circle.vx + circle.vy * circle.vy
    );
    if (currentSpeed > 0) {
      const targetSpeed = BASE_SPEED; // NOT multiplied by `speed`
      circle.vx = (circle.vx / currentSpeed) * targetSpeed;
      circle.vy = (circle.vy / currentSpeed) * targetSpeed;
    }
  };

  // Główna pętla animacji (oddzielona od synchronizacji chatów, zależna jedynie od speed/isPaused)
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;

    const handleResize = () => {
      if (!containerRef.current) return;
      width = containerRef.current.clientWidth;
      height = containerRef.current.clientHeight;
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      if (!isPaused && circlesRef.current.length > 0) {
        const circles = circlesRef.current;

        circles.forEach((circle) => {
          // Ruch skalowany przez `speed` — velocity trzyma kierunek i bazową prędkość.
          circle.x += circle.vx * speed;
          circle.y += circle.vy * speed;

          // Odbicie od ścian
          if (circle.x - circle.radius < 0) {
            circle.x = circle.radius;
            circle.vx = Math.abs(circle.vx);
            normalizeVelocity(circle);
          } else if (circle.x + circle.radius > width) {
            circle.x = width - circle.radius;
            circle.vx = -Math.abs(circle.vx);
            normalizeVelocity(circle);
          }

          if (circle.y - circle.radius < 0) {
            circle.y = circle.radius;
            circle.vy = Math.abs(circle.vy);
            normalizeVelocity(circle);
          } else if (circle.y + circle.radius > height) {
            circle.y = height - circle.radius;
            circle.vy = -Math.abs(circle.vy);
            normalizeVelocity(circle);
          }
        });

        // Kolizje między kołami
        for (let i = 0; i < circles.length; i++) {
          for (let j = i + 1; j < circles.length; j++) {
            if (checkCircleCollision(circles[i], circles[j])) {
              resolveCircleCollision(circles[i], circles[j]);
            }
          }
        }

        // Aktualizuj pozycje do renderowania
        const newPositions = new Map<string, { x: number; y: number }>();
        circles.forEach((circle) => {
          newPositions.set(circle.id, { x: circle.x, y: circle.y });
        });
        setPositions(newPositions);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current !== undefined) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [speed, isPaused]); // nie dodajemy `chats` tu celowo, by nie restartować pętli animacji przy każdej zmianie listy

  return (
    <div className="flex-1 relative bg-gray-900 overflow-hidden">
      <div ref={containerRef} className="w-full h-full" />

      {chats.map((chat) => {
        const pos = positions.get(chat.id);
        if (!pos) return null;

        return (
          <button
            key={chat.id}
            onClick={() => onChatClick(chat)}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 
                       bg-gray-800/90 backdrop-blur-sm border-2 border-blue-500/50
                       rounded-full flex flex-col items-center justify-center
                       text-white text-sm font-medium
                       hover:bg-blue-600/30 hover:border-blue-400 hover:scale-105
                       transition-all duration-200 shadow-lg pointer-events-auto
                       cursor-pointer select-none"
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              width: `${RADIUS * 2}px`,
              height: `${RADIUS * 2}px`,
            }}
          >
            <span className="text-2xl mb-1">{chat.emoji}</span>
            <span className="text-xs leading-tight text-center px-2">
              {chat.title}
            </span>
          </button>
        );
      })}
    </div>
  );
}
