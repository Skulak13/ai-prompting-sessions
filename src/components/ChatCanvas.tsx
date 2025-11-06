import { useEffect, useRef } from "react";
import type { Chat } from "../types";

interface Circle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  chat: Chat;
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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const circlesRef = useRef<Circle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  const hoveredCircleRef = useRef<Circle | null>(null);

  const BASE_SPEED = 1.25;
  const RADIUS = 60;

  // --- NOWE STAŁE DLA FIZYKI ---
  // Odległość, na jaką koła i ściany zaczynają się odpychać
  // Musi być większa niż RADIUS
  const REPULSION_DISTANCE = RADIUS * 2.2;
  const WALL_REPULSION_DISTANCE = RADIUS * 1.5;

  // Siła odpychania (dostosuj te wartości eksperymentalnie)
  const CIRCLE_REPULSION_STRENGTH = 0.5;
  const WALL_REPULSION_STRENGTH = 1.0;

  // Tłumienie (damping) - zapobiega "eksplozji" prędkości, stabilizuje system
  // Wartość bliska 1.0 (np. 0.95 - 0.99)
  const DAMPING = 0.97;
  // --- KONIEC NOWYCH STAŁYCH ---

  // Bez zmian: Normalizacja prędkości
  const normalizeVelocity = (circle: Circle, targetSpeed: number) => {
    const currentSpeed = Math.sqrt(
      circle.vx * circle.vx + circle.vy * circle.vy
    );
    // Utrzymujemy prędkość bazową, siły zmieniają tylko kierunek
    if (currentSpeed > 0.01) {
      circle.vx = (circle.vx / currentSpeed) * targetSpeed;
      circle.vy = (circle.vy / currentSpeed) * targetSpeed;
    } else if (targetSpeed > 0) {
      // Jeśli utknie, nadaj losowy kierunek
      const angle = Math.random() * Math.PI * 2;
      circle.vx = Math.cos(angle) * targetSpeed;
      circle.vy = Math.sin(angle) * targetSpeed;
    }
  };

  // Bez zmian: Sprawdzanie kolizji (używane tylko przy inicjalizacji)
  const checkCircleCollision = (c1: Circle, c2: Circle): boolean => {
    const dx = c2.x - c1.x;
    const dy = c2.y - c1.y;
    const distanceSq = dx * dx + dy * dy;
    const minDistance = c1.radius + c2.radius;
    // Dajemy mały bufor przy inicjalizacji
    const buffer = 5;
    return distanceSq < (minDistance + buffer) * (minDistance + buffer);
  };

  // USUNIĘTE: resolveCircleCollision - już niepotrzebne

  // Bez zmian: Inicjalizacja koła
  const initializeCircle = (
    chat: Chat,
    width: number,
    height: number,
    existingCircles: Circle[]
  ): Circle => {
    const maxAttempts = 100;
    let attempt = 0;
    let circle: Circle;

    do {
      const angle = Math.random() * Math.PI * 2;
      circle = {
        id: chat.id,
        x: RADIUS + Math.random() * (width - RADIUS * 2),
        y: RADIUS + Math.random() * (height - RADIUS * 2),
        vx: Math.cos(angle) * BASE_SPEED,
        vy: Math.sin(angle) * BASE_SPEED,
        radius: RADIUS,
        chat,
      };

      const hasCollision = existingCircles.some((existing) =>
        checkCircleCollision(circle, existing)
      );

      if (!hasCollision) break;
      attempt++;
    } while (attempt < maxAttempts);

    return circle;
  };

  // Bez zmian: Rysowanie koła
  const drawCircle = (
    ctx: CanvasRenderingContext2D,
    circle: Circle,
    isHovered: boolean
  ) => {
    const { x, y, radius, chat } = circle;

    // Cień
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.shadowBlur = 15;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;

    // Tło
    ctx.fillStyle = isHovered
      ? "rgba(37, 99, 235, 0.3)"
      : "rgba(31, 41, 55, 0.9)";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Obramowanie
    ctx.strokeStyle = isHovered
      ? "rgba(96, 165, 250, 1)"
      : "rgba(59, 130, 246, 0.5)";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.shadowColor = "transparent";

    // Emoji
    ctx.font = "32px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "white";
    ctx.fillText(chat.emoji || "💬", x, y - 12);

    // Tytuł
    ctx.font = "12px Arial";
    ctx.fillStyle = "white";
    const words = chat.title.split(" ");
    let line = "";
    let lineY = y + 18;
    const maxWidth = radius * 1.6;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line.trim(), x, lineY);
        line = words[i] + " ";
        lineY += 14;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, lineY);
  };

  // Bez zmian: Znajdź koło pod kursorem
  const getCircleAtPosition = (x: number, y: number): Circle | null => {
    for (let i = circlesRef.current.length - 1; i >= 0; i--) {
      const circle = circlesRef.current[i];
      const dx = x - circle.x;
      const dy = y - circle.y;
      if (dx * dx + dy * dy <= circle.radius * circle.radius) {
        return circle;
      }
    }
    return null;
  };

  // Bez zmian: Obsługa kliknięcia i najechania
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const circle = getCircleAtPosition(x, y);
      if (circle) {
        onChatClick(circle.chat);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const circle = getCircleAtPosition(x, y);

      hoveredCircleRef.current = circle;
      canvas.style.cursor = circle ? "pointer" : "default";
    };

    canvas.addEventListener("click", handleClick);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("click", handleClick);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, [onChatClick]);

  // Bez zmian: Resize canvas i inicjalizacja
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (!container) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      // Dostosuj pozycje kół po resize
      circlesRef.current.forEach((c) => {
        c.x = Math.min(Math.max(c.x, RADIUS), rect.width - RADIUS);
        c.y = Math.min(Math.max(c.y, RADIUS), rect.height - RADIUS);
      });
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  // Bez zmian: Inicjalizacja kół
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (width === 0 || height === 0) return;

    const existingMap = new Map(circlesRef.current.map((c) => [c.id, c]));
    const newCircles: Circle[] = [];

    chats.forEach((chat) => {
      const existing = existingMap.get(chat.id);
      if (existing) {
        existing.chat = chat;
        existing.x = Math.min(Math.max(existing.x, RADIUS), width - RADIUS);
        existing.y = Math.min(Math.max(existing.y, RADIUS), height - RADIUS);
        newCircles.push(existing);
      } else {
        newCircles.push(initializeCircle(chat, width, height, newCircles));
      }
    });

    circlesRef.current = newCircles;
  }, [chats]);

  // --- ZMODYFIKOWANA: Główna pętla animacji ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.clearRect(0, 0, width, height);

      if (!isPaused && circlesRef.current.length > 0) {
        const circles = circlesRef.current;

        // Mapa do przechowywania sumy sił dla każdego koła
        const forces = new Map<string, { fx: number; fy: number }>();
        circles.forEach((c) => forces.set(c.id, { fx: 0, fy: 0 }));

        // 1. Oblicz siły odpychania między kołami
        for (let i = 0; i < circles.length; i++) {
          const c1 = circles[i];
          for (let j = i + 1; j < circles.length; j++) {
            const c2 = circles[j];

            const dx = c2.x - c1.x;
            const dy = c2.y - c1.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 0.1) distance = 0.1; // Zapobiegaj dzieleniu przez zero

            if (distance < REPULSION_DISTANCE) {
              // Oblicz siłę odpychania (np. liniowo rosnącą im bliżej)
              const overlap = REPULSION_DISTANCE - distance;
              const forceMagnitude = overlap * CIRCLE_REPULSION_STRENGTH;

              // Rozkład siły na komponenty
              const forceX = (dx / distance) * forceMagnitude;
              const forceY = (dy / distance) * forceMagnitude;

              // Dodaj siły (w przeciwnych kierunkach)
              const f1 = forces.get(c1.id)!;
              f1.fx -= forceX;
              f1.fy -= forceY;

              const f2 = forces.get(c2.id)!;
              f2.fx += forceX;
              f2.fy += forceY;
            }
          }
        }

        // 2. Zastosuj siły, tłumienie i ruch
        circles.forEach((circle) => {
          const force = forces.get(circle.id)!;
          let { fx, fy } = force;

          // 2a. Oblicz siły odpychania od ścian
          if (circle.x < WALL_REPULSION_DISTANCE) {
            const overlap = WALL_REPULSION_DISTANCE - circle.x;
            fx += overlap * WALL_REPULSION_STRENGTH;
          } else if (circle.x > width - WALL_REPULSION_DISTANCE) {
            const overlap = WALL_REPULSION_DISTANCE - (width - circle.x);
            fx -= overlap * WALL_REPULSION_STRENGTH;
          }
          if (circle.y < WALL_REPULSION_DISTANCE) {
            const overlap = WALL_REPULSION_DISTANCE - circle.y;
            fy += overlap * WALL_REPULSION_STRENGTH;
          } else if (circle.y > height - WALL_REPULSION_DISTANCE) {
            const overlap = WALL_REPULSION_DISTANCE - (height - circle.y);
            fy -= overlap * WALL_REPULSION_STRENGTH;
          }

          // 2b. Zastosuj siły jako przyspieszenie
          circle.vx += fx;
          circle.vy += fy;

          // 2c. Zastosuj tłumienie (opór)
          circle.vx *= DAMPING;
          circle.vy *= DAMPING;

          // 2d. Znormalizuj prędkość (siły sterują kierunkiem, nie prędkością)
          normalizeVelocity(circle, BASE_SPEED * speed);

          // 2e. Zastosuj ruch
          circle.x += circle.vx;
          circle.y += circle.vy;

          // 2f. Twarda kolizja ze ścianą (jako zabezpieczenie)
          // Na wypadek gdyby siła odpychania nie wystarczyła
          if (circle.x - circle.radius < 0) {
            circle.x = circle.radius;
            circle.vx = Math.abs(circle.vx);
          } else if (circle.x + circle.radius > width) {
            circle.x = width - circle.radius;
            circle.vx = -Math.abs(circle.vx);
          }
          if (circle.y - circle.radius < 0) {
            circle.y = circle.radius;
            circle.vy = Math.abs(circle.vy);
          } else if (circle.y + circle.radius > height) {
            circle.y = height - circle.radius;
            circle.vy = -Math.abs(circle.vy);
          }
        });
      }

      // 3. Rysuj wszystkie koła (bez zmian)
      circlesRef.current.forEach((circle) => {
        drawCircle(ctx, circle, circle === hoveredCircleRef.current);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current !== undefined) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed, isPaused]); // Zależności bez zmian

  return (
    <div className="flex-1 relative bg-gray-900 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  );
}
