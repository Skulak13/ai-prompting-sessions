# AI Prompting Sessions - Dokumentacja

**🚀 [Zobacz Live Demo](https://ai-prompting-sessions.vercel.app/)**

**Autor:** Tomek Skulski ([@Skulak13](https://github.com/Skulak13))  
**Kontakt:** [LinkedIn](https://linkedin.com/in/tomasz-skulski) | [GitHub](https://github.com/Skulak13) | [Codewars](https://www.codewars.com/users/Skulak13)

<br>

> 🇬🇧 **[English version / Wersja angielska](README.md)**

---

## 💡 O tym projekcie

Ten projekt to nie jest typowe portfolio kodu. To dokumentacja mojego sposobu myślenia i umiejętności promptowania.

Jestem samoukiem programowania z wykształceniem w socjologii i psychologii oraz szerokim spektrum zainteresowań. Projekt zawiera 22 rozmowy z AI, które pokazują jak systematycznie buduję wiedzę od zera, jak kwestionuję założenia, jak dociekam mechanizmów zamiast zadowalać się opisami.

Konwersacje to przykład tego, co wyniosłem z humanistyki i co przenoszę do programowania: umiejętność zadawania dobrych pytań, wyłapywania niespójności, budowania mentalnych modeli złożonych systemów. Umiejętności, których nie da się nauczyć z tutoriali.

Każda z 22 konwersacji ma:

- Konkretne umiejętności promptowania ("Progresywne zagłębianie", "Kwestionowanie założeń", "Wypełnianie luk chronologicznych")
- Ocenę jakości ("Jasność komunikacji", "Adaptacja poziomu", "Głębokość eksploracji", "Krytyczne myślenie" - średnia 4.7/5)
- Analizę wartości dla pracodawcy (umiejętności transferowalne do branży tech: "Umiejętność uczenia się nowych technologii od zera" , "Jasna komunikacja w zespole", "Myślenie systemowe")

AI Prompting Sessions to interaktywna wizualizacja tych konwersacji. Pokazuje moją ciekawość, to jak myślę, analizuję i rozwiązuję problemy - że potrafię nie tylko zadawać pytania, ale zadawać właściwe pytania.

**Metodologia**: Analiza każdej konwersacji—identyfikacja technik promptowania, oceny jakości (clarity: "Jasność komunikacji", adaptation: "Adaptacja poziomu", depth: "Głębokość eksploracji", critical thinking: "Krytyczne myślenie") oraz wartości dla pracodawcy—została przeprowadzona przez AI w celu zapewnienia obiektywnej i systematycznej ewaluacji.

---

## Spis treści

1. [Przegląd projektu](#przegląd-projektu)
2. [Stos technologiczny](#stos-technologiczny)
3. [Instalacja i uruchomienie](#instalacja-i-uruchomienie)
4. [Struktura projektu](#struktura-projektu)
5. [Komponenty](#komponenty)
6. [Dane i typy](#dane-i-typy)
7. [Funkcjonalności](#funkcjonalności)
8. [Funkcje dostępności](#funkcje-dostępności)
9. [Wydajność i optymalizacje](#wydajność-i-optymalizacje)
10. [Deployment](#deployment)
11. [Przewodnik deweloperski](#przewodnik-deweloperski)
12. [Wsparcie przeglądarek](#wsparcie-przeglądarek)
13. [Znane ograniczenia](#znane-ograniczenia)
14. [Przyszłe ulepszenia](#przyszłe-ulepszenia)

## Przegląd projektu

AI Prompting Sessions to interaktywne portfolio prezentujące 22 wyselekcjonowane rozmowy z AI, demonstrujące zaawansowane techniki promptowania i umiejętności krytycznego myślenia. Aplikacja przedstawia te konwersacje jako animowane kółka na canvas, tworząc angażujące wizualne doświadczenie pozwalające użytkownikom eksplorować różne tematy i analizować stosowane strategie promptowania.

### Kluczowe funkcjonalności:

- 🎯 **Interaktywna wizualizacja**: Konwersacje pojawiają się jako poruszające się kółka na canvas, z płynnymi animacjami i fizyką dla immersyjnej eksploracji.
- 🔍 **Elastyczne filtrowanie**: Sortowanie po kategoriach (Nauka, Filozofia, Technologia, Historia, Polityka, Sztuka) lub ocenach (4.0+ do 5.0 gwiazdek na podstawie clarity, depth itp.).
- ⚙️ **Kontrola animacji**: Regulacja prędkości (0.1x do 3x) i pauza ruchu dla łatwiejszej inspekcji kółek.
- 📊 **Szczegółowa analiza**: Każda konwersacja zawiera rozbudowane zestawienie technik promptowania, metryki umiejętności, mocne strony, obszary do poprawy i wartość dla pracodawcy.
- 🔗 **Powiązane tematy**: Linki do podobnych konwersacji tworzą sieć powiązań dla głębszej eksploracji.
- ⌨️ **Pełna dostępność**: Nawigacja klawiaturą, wsparcie dla czytników ekranu i zgodność z ARIA zapewniają inkluzywność.
- 📱 **Responsywny design**: Bezproblemowo dostosowuje się do urządzeń desktop, tablet i mobile, z kontrolkami przyjaznymi dla dotyku.

### Metodologia analizy

Analiza każdej konwersacji—w tym identyfikacja technik promptowania, oceny jakości (clarity: "Jasność komunikacji", adaptation: "Adaptacja poziomu", depth: "Głębokość eksploracji", critical thinking: "Krytyczne myślenie") oraz ocena wartości dla pracodawcy—została przeprowadzona przez AI w celu zapewnienia obiektywnej i systematycznej ewaluacji.

## Stos technologiczny

Aplikacja została zbudowana przy użyciu nowoczesnych technologii webowych skupionych na wydajności, bezpieczeństwie typów i dostępności. Poniżej znajduje się podział głównego stacku:

### Podstawowy framework i język

- **React 19**: Wykorzystuje najnowsze funkcje i możliwości concurrent rendering.
- **TypeScript 5.9**: Zapewnia silne typowanie w całej bazie kodu dla lepszej utrzymywalności i zapobiegania błędom.

### Narzędzia budowania

- **Vite 7**: Szybki serwer deweloperski i bundler produkcyjny z hot module replacement, code splitting i minifikacją.
- **ESLint 9**: Linting kodu z wsparciem dla TypeScript w celu egzekwowania spójnego stylu i wczesnego wykrywania problemów.

### Stylowanie i komponenty UI

- **Tailwind CSS 4**: Utility-first CSS framework dla szybkiego, responsywnego stylowania bez niestandardowych plików CSS (zintegrowany przez plugin Vite).
- **Headless UI 2**: Dostępne, niestylizowane komponenty UI dla modali, dialogów i przejść, zapewniające zgodność z WCAG.

### Dodatkowe zależności

Nie używa się ciężkich bibliotek zewnętrznych poza niezbędnymi, utrzymując rozmiar bundle'a na niskim poziomie. Pełna lista znajduje się w `package.json`, z kluczowymi zależnościami produkcyjnymi obejmującymi `@headlessui/react` dla modali i bez bibliotek zarządzania stanem w runtime (obsługiwane przez wbudowane hooki React).

Ten stack kładzie nacisk na efektywność: hooki React zarządzają stanem bez zewnętrznych bibliotek, Vite zapewnia szybkie buildy, a Tailwind/Headless UI umożliwiają czysty, dostępny UI.

## Instalacja i uruchomienie

### Wymagania

- **Node.js**: Wersja ≥20.19.0 lub ≥22.12.0 (zalecana dla kompatybilności z Vite i React 19).
- **npm**: Wersja ≥8.0.0 (lub użyj yarn/pnpm jako alternatywy).

### Rozpoczęcie pracy

1. Sklonuj repozytorium:

   ```bash
   git clone https://github.com/Skulak13/ai-prompting-sessions.git
   cd ai-prompting-sessions
   ```

2. Zainstaluj zależności:
   ```bash
   npm install
   ```

### Uruchamianie aplikacji

- **Tryb deweloperski**: Uruchamia lokalny serwer z hot module replacement pod `http://localhost:5173`.

  ```bash
  npm run dev
  ```

- **Build produkcyjny**: Generuje zoptymalizowane pliki statyczne w katalogu `dist`.

  ```bash
  npm run build
  ```

- **Podgląd buildu**: Serwuje build produkcyjny lokalnie do testowania.

  ```bash
  npm run preview
  ```

- **Linting**: Sprawdza kod pod kątem stylu i potencjalnych problemów używając ESLint.
  ```bash
  npm run lint
  ```

Uwaga: Aplikacja jest stroną statyczną, więc po zbudowaniu możesz wdrożyć folder `dist` na dowolnej usłudze hostingu statycznego (zobacz sekcję Deployment dla szczegółów). Jeśli napotkasz problemy, upewnij się, że wersja Node.js odpowiada wymaganiom i w razie potrzeby wyczyść cache npm.

## Struktura projektu

Projekt stosuje czystą, modularną architekturę React + TypeScript zbudowaną z Vite. Poniżej znajduje się struktura katalogów:

```
ai-prompting-sessions/
├── src/
│   ├── components/
│   │   ├── ChatCanvas.tsx      # Obsługuje animację canvas i interakcje
│   │   ├── ChatModal.tsx       # Wyświetla szczegóły konwersacji i analizę
│   │   ├── Header.tsx          # Kontrolki filtrowania i UI nagłówka
│   │   └── Footer.tsx          # Stopka z linkami do mediów społecznościowych
│   ├── data/
│   │   └── chats.ts            # Tablica 22 obiektów konwersacji
│   ├── types/
│   │   └── index.ts            # Interfejsy TypeScript (np. Chat, Category)
│   ├── assets/
│   │   └── images/             # Zdjęcie profilowe (skulfancy.webp)
│   ├── App.tsx                 # Główny komponent zarządzający globalnym stanem
│   ├── main.tsx                # Punkt wejścia aplikacji
│   └── index.css               # Globalne style z Tailwind
├── index.html                  # Szablon HTML
├── vite.config.ts              # Konfiguracja Vite (pluginy React i Tailwind)
└── package.json                # Zależności i skrypty
```

### Wzorzec architektury: Komponentowy z podnoszeniem stanu

Aplikacja używa prostej struktury hierarchicznej, gdzie stan jest podnoszony do korzenia (App.tsx) dla efektywnego zarządzania bez zewnętrznych bibliotek. Promuje to jednokierunkowy przepływ danych i łatwą skalowalność.

```
┌─────────────────────────────────────┐
│           App (root)                │
│  - activeCategories                 │
│  - activeRatings                    │
│  - speed, isPaused                  │
│  - selectedChat                     │
└────────┬────────────────────────────┘
         │
         ├─► Header (kontrolki)
         │   - Filtry kategorii
         │   - Filtry ocen
         │   - Kontrola prędkości
         │   - Pauza/Wznów
         │
         ├─► ChatCanvas (wizualizacja)
         │   - Symulacja fizyki
         │   - Wykrywanie kolizji
         │   - Nawigacja klawiaturą
         │   - Interakcje hover/kliknięcie
         │
         ├─► Footer (linki)
         │
         └─► ChatModal (szczegóły)
             - Zakładki konwersacji
             - Analiza umiejętności
             - Wizualizacja metryk
             - Powiązane czaty
```

### Przepływ danych

Interakcje użytkownika podążają za jednokierunkowym wzorcem React:

```
Akcja użytkownika → Zdarzenie komponentu → Aktualizacja stanu (App.tsx) → Props → Re-render
```

Na przykład, zmiana filtrów w Header aktualizuje stan w App, wyzwalając zmemoizowane przefiltrowanie czatów i re-render ChatCanvas.

Ta konfiguracja utrzymuje kod w sposób utrzymywalny: Stan jest scentralizowany, komponenty są czyste tam gdzie to możliwe, a optymalizacje jak useMemo zapobiegają niepotrzebnym obliczeniom.

## Komponenty

Ta sekcja dostarcza szczegółowej dokumentacji głównych komponentów aplikacji. Każdy komponent opisany jest z jego kluczowymi odpowiedzialnościami, props, stanem (jeśli dotyczy) i odpowiednimi fragmentami kodu. Architektura jest komponentowa, ze stanem podniesionym do korzenia (zobacz Strukturę projektu dla hierarchii). Komponenty używają hooków React dla logiki, Tailwind dla stylowania i Headless UI dla dostępnych elementów jak modale.

### App.tsx (Główny komponent)

**Odpowiedzialności**:

- Zarządza całą aplikacją poprzez globalny stan (filtry, prędkość, pauza, wybrany czat).
- Efektywnie filtruje czaty wykorzystując memoizację.
- Renderuje i koordynuje komponenty potomne: Header, ChatCanvas, Footer i warunkowo ChatModal.

**Stan**:

```typescript
const [activeCategories, setActiveCategories] = useState<Category[]>([]); // Tablica wybranych kategorii
const [activeRatings, setActiveRatings] = useState
  Array<Exclude<RatingFilter, null>>
>([]); // Wybrane filtry ocen
const [speed, setSpeed] = useState(1.0); // Mnożnik prędkości animacji
const [isPaused, setIsPaused] = useState(false); // Stan pauzy animacji
const [selectedChat, setSelectedChat] = useState<Chat | null>(null); // Aktualnie otwarty czat
```

**Kluczowa logika** (Memoizacja przefiltrowanych czatów):

```typescript
const filteredChats = useMemo(() => {
  return chats.filter((chat) => {
    const categoryMatch =
      activeCategories.length === 0 || activeCategories.includes(chat.category);
    let ratingMatch = true;
    if (activeRatings.length > 0 && chat.metrics) {
      const avgRating =
        (chat.metrics.clarity +
          chat.metrics.adaptation +
          chat.metrics.depth +
          chat.metrics.criticalThinking) /
        4;
      ratingMatch = activeRatings.some((rating) => {
        if (rating === 4) return avgRating >= 4 && avgRating < 4.5;
        return Math.abs(avgRating - rating) < 0.1;
      });
    }
    return categoryMatch && ratingMatch;
  });
}, [activeCategories, activeRatings]);
```

Brak props; to komponent najwyższego poziomu.

### Header.tsx (Komponent kontrolek)

**Odpowiedzialności**:

- Wyświetla profil użytkownika, branding i kontrolki filtrowania.
- Obsługuje przełączniki kategorii i ocen, suwak prędkości i przycisk pauzy.
- Responsywny: Pełny układ na desktop (≥1280px); menu hamburgerowe na mniejszych ekranach używając Headless UI Dialog.

**Props**:

```typescript
interface HeaderProps {
  activeCategories: Category[]; // Aktualnie wybrane kategorie
  setActiveCategories: (categories: Category[]) => void;
  activeRatings: Array<Exclude<RatingFilter, null>>; // Aktualnie wybrane oceny
  setActiveRatings: (ratings: Array<Exclude<RatingFilter, null>>) => void;
  speed: number; // Aktualna prędkość animacji
  setSpeed: (speed: number) => void;
  isPaused: boolean; // Aktualny stan pauzy
  setIsPaused: (paused: boolean) => void;
}
```

**Kluczowe funkcje**:

- Przyciski multi-select dla kategorii i ocen.
- Suwak zakresu dla prędkości z etykietami ARIA.
- Menu mobilne z focus trap i pozycjonowaniem overlay poniżej nagłówka.

Brak lokalnego stanu poza otwarciem/zamknięciem menu; polega na props rodzica.

### ChatCanvas.tsx (Komponent wizualizacji)

**Odpowiedzialności**:

- Renderuje animowany canvas z kółkami reprezentującymi czaty.
- Implementuje symulację fizyki (prędkość, kolizje, odpychanie od granic) przy 60fps używając requestAnimationFrame.
- Obsługuje interakcje użytkownika: hover, kliknięcie aby otworzyć modal, nawigacja klawiaturą.
- Inicjalizuje kółka z losowymi pozycjami unikając nakładania.

**Props**:

```typescript
interface ChatCanvasProps {
  chats: Chat[]; // Przefiltrowana lista czatów do wyświetlenia
  onChatClick: (chat: Chat) => void; // Callback do otwarcia modala
  speed: number; // Mnożnik prędkości animacji
  isPaused: boolean; // Czy animacja jest zapauzowana
}
```

**Kluczowe stałe (Konfiguracja fizyki)**:

```typescript
const BASE_SPEED = 1.25; // Podstawowa prędkość ruchu
const REPULSION_DISTANCE = RADIUS * 2.2; // Dystans dla odpychania kółek
const WALL_REPULSION_STRENGTH = 1.0; // Siła od krawędzi canvas
const DAMPING = 0.97; // Współczynnik tłumienia prędkości
```

**Fragment pętli animacji**:

```typescript
const animate = () => {
  if (ctx) {
    ctx.clearRect(0, 0, width, height);
    if (!isPaused) {
      updatePhysics();  // Stosuje siły, kolizje, normalizuje prędkość
    }
    circles.forEach((circle, idx) => {
      const isHovered = /* sprawdzenie hover */;
      const isSelected = /* sprawdzenie wyboru klawiaturą */;
      drawCircle(ctx, circle, isHovered, isSelected);
    });
  }
  animationRef.current = requestAnimationFrame(animate);
};
```

**Dostępność**: Dwupoziomowa nawigacja klawiaturą (focus zewnętrzny, tryb interakcji wewnętrznej) z etykietami ARIA.

Używa refs dla canvas i kółek aby uniknąć re-renderów podczas animacji.

### ChatModal.tsx (Przeglądarka szczegółów)

**Odpowiedzialności**:

- Wyświetla wybrany czat w oknie dialogowym modalnym z dwoma zakładkami: Treść (rozwijane Q&A) i Analiza (umiejętności, metryki, mocne strony itp.).
- Obsługuje przełączanie zakładek, rozwijane elementy i linki do powiązanych czatów.
- Optymalizuje dla mobile/landscape z responsywnymi odstępami.

**Props**:

```typescript
interface ChatModalProps {
  chat: Chat; // Dane wybranego czatu
  onClose: () => void; // Callback do zamknięcia modala
  allChats: Chat[]; // Pełna lista dla powiązanych czatów
  onOpenRelated: (id: string) => void; // Callback do otwarcia innego czatu
}
```

**Kluczowe funkcje**:

- Zakładki oddzielają treść od analizy.
- Rozwijane pary Q&A używające Set do śledzenia otwartych elementów.
- Metryki wizualizowane jako paski postępu lub statystyki.
- Powiązane czaty jako klikalne przyciski.

Używa Headless UI Dialog dla focus trap, przejść i dostępności.

### Footer.tsx (Linki społecznościowe)

**Odpowiedzialności**:

- Prosta stopka wyświetlająca linki do LinkedIn, GitHub i Codewars z ikonami.
- Efekty hover dla interaktywności.

Brak props ani stanu; statyczny komponent ze stylowaniem Tailwind.

Te komponenty są zaprojektowane dla reużywalności i wydajności, z memoizacją i refs tam gdzie potrzeba aby minimalizować re-rendery. Dla dodawania nowych komponentów, podążaj za istniejącym wzorcem komponentów funkcyjnych z hookami.

## Dane i typy

Dane aplikacji są ustrukturyzowane wokół konwersacji (czatów) przechowywanych w `src/data/chats.ts` jako tablica 22 obiektów `Chat`. Wszystkie typy są zdefiniowane w `src/types/index.ts` używając TypeScript dla silnego typowania. Zapewnia to spójność, szczególnie dla filtrowania, obliczania metryk i linkowania powiązanych czatów. Kategorie to tematyczne enumy, a oceny są wyprowadzane z uśrednionych metryk.

### Interfejs Chat

Każda konwersacja podąża za tym interfejsem TypeScript:

```typescript
interface Chat {
  id: string; // Unikalny identyfikator (np. "0")
  title: string; // Krótki tytuł (np. "Magazynowanie energii")
  category: Category; // Kategoria tematyczna
  emoji?: string; // Opcjonalne emoji dla reprezentacji wizualnej (np. "⚡")
  conversation: Array<{
    // Tablica wymian Q&A
    question: string; // Prompt/pytanie użytkownika
    answer: string; // Odpowiedź AI
  }>;
  skills: string[]; // Zastosowane techniki promptowania (np. "Progresywne zagłębianie")
  analysis: string; // Ogólna ocena konwersacji
  relatedChats: string[]; // Tablica ID powiązanych czatów dla linkowania
  metrics?: {
    // Opcjonalne wyniki jakości (skala 1-5)
    clarity: number; // Jasność komunikacji
    adaptation: number; // Adaptacja do odpowiedzi
    depth: number; // Głębokość eksploracji tematu
    criticalThinking: number; // Analityczne rozumowanie
  };
  strengths?: string[]; // Zademonstrowane mocne strony
  improvements?: string[]; // Obszary do poprawy
  employerValue?: string[]; // Znaczenie zawodowe
}
```

**Przykładowy obiekt Chat** (Uproszczony z `chats.ts`):

```typescript
{
  id: "0",
  emoji: "⚡",
  title: "Magazynowanie energii",
  category: "nauka",
  conversation: [
    {
      question: "Jak działa magazyn energii szczytowo-hydroelektryczny?",
      answer: "Elektrownia szczytowo-pompowa wykorzystuje..."
    },
    // Dodatkowe wymiany...
  ],
  skills: ["Progresywne zagłębianie", "Sygnalizowanie poziomu wiedzy"],
  analysis: "Analiza konwersacji...",
  relatedChats: ["2", "5", "8"],
  metrics: {
    clarity: 5,
    adaptation: 5,
    depth: 4,
    criticalThinking: 4
  },
  strengths: ["Mocna strona 1"],
  improvements: ["Obszar do rozwoju 1"],
  employerValue: ["Wartość praktyczna 1"]
}
```

### Kategorie

Czaty są zorganizowane w sześć kategorii tematycznych (enumy dla bezpieczeństwa typów):

```typescript
type Category =
  | "nauka" // Nauka: Fizyka, biologia itp.
  | "filozofia" // Filozofia: Etyka, epistemologia
  | "technologia" // Technologia: AI, inżynieria
  | "historia" // Historia: Wydarzenia, kultury
  | "polityka" // Polityka: Zarządzanie, ekonomia
  | "sztuka"; // Sztuka: Film, kreatywność
```

Używane do filtrowania; można wybrać wiele.

### System ocen i typy

Oceny są obliczane jako średnia z czterech metryk (z obiektu `metrics`), w zakresie od 4.0 do 5.0. Napędza to filtr ocen.

```typescript
type RatingFilter = 4 | 4.5 | 4.8 | 5 | null; // Opcje filtrowania
```

**Obliczanie oceny** (Wyprowadzane w filtrowaniu App.tsx):

- Średnia = (clarity + adaptation + depth + criticalThinking) / 4
- Dopasowanie filtrów z progami (np. 4.0: ≥4 i <4.5).

Dane są statyczne i ładowane synchronicznie przy starcie dla prostoty. Aby dodać nowe czaty, dołącz do tablicy `chats.ts` (zobacz Przewodnik deweloperski dla szczegółów). Ta struktura wspiera łatwe rozszerzenie, jak dodanie wyszukiwania przez tagi w przyszłych ulepszeniach.

## Funkcjonalności

Ta sekcja opisuje główne funkcjonalności aplikacji, bazując na komponentach i strukturach danych nakreślonych wcześniej. Skupia się na tym jak funkcje działają z perspektywy użytkownika i technicznej, włączając kluczowe algorytmy i interakcje. Odniesienia do komponentów (np. ChatCanvas) unikają powtórzeń—zobacz sekcję Komponenty dla szczegółów implementacji.

### Interaktywna animacja canvas

Canvas w ChatCanvas.tsx symuluje pływające kółka reprezentujące czaty, tworząc angażującą wizualną metaforę dla eksplorowania idei. Kółka poruszają się ciągle z zachowaniem opartym na fizyce, respektując kontrolki użytkownika jak prędkość i pauza.

**Jak to działa**:

- **Inicjalizacja**: Przy montowaniu, kółka są pozycjonowane losowo bez nakładania, każde powiązane z obiektem Chat (id, tytuł, emoji).
- **Symulacja fizyki**: Działa przy 60fps przez `requestAnimationFrame`. Każda klatka:
  - Oblicza siły odpychania między bliskimi kółkami i od ścian canvas.
  - Stosuje tłumienie do prędkości dla naturalnego spowolnienia.
  - Normalizuje prędkość dla utrzymania spójności.
- **Kontrolki użytkownika**: Mnożnik prędkości (0.1x–3x) skaluje prędkość; pauza zatrzymuje aktualizacje ale utrzymuje renderowanie dla statycznego oglądania.

**Kluczowy algorytm** (Kolizje i odpychanie):

```typescript
// Sprawdzanie kolizji między kółkami
for (let i = 0; i < circles.length; i++) {
  for (let j = i + 1; j < circles.length; j++) {
    const dx = circles[j].x - circles[i].x;
    const dy = circles[j].y - circles[i].y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < REPULSION_DISTANCE) {
      const overlap = REPULSION_DISTANCE - distance;
      const force = overlap * CIRCLE_REPULSION_STRENGTH;
      // Stosuje przeciwne siły do vx/vy...
    }
  }
}

// Odpychanie od ściany (przykład dla lewej ściany)
if (circle.x < WALL_REPULSION_DISTANCE) {
  const overlap = WALL_REPULSION_DISTANCE - circle.x;
  circle.vx += overlap * WALL_REPULSION_STRENGTH;
}

// Normalizacja prędkości do prędkość bazowa * prędkość użytkownika
const currentSpeed = Math.sqrt(vx * vx + vy * vy);
if (currentSpeed !== 0) {
  vx = (vx / currentSpeed) * (BASE_SPEED * speed);
  vy = (vy / currentSpeed) * (BASE_SPEED * speed);
}
```

To tworzy organiczny ruch; wykrywanie hover/kliknięcia przez pozycję myszy dla otwierania modali.

### System filtrowania

Filtrowanie w czasie rzeczywistym w Header.tsx aktualizuje widoczne czaty w ChatCanvas, używając stanu z App.tsx.

**Jak to działa**:

- **Filtrowanie kategorii**: Przełączniki multi-select (np. "nauka" i "filozofia") dopasowują się do Chat.category.
- **Filtrowanie ocen**: Wybiera na podstawie uśrednionych metryk (zobacz Dane i typy); wspiera wiele zakresów (np. 4.5 i 5.0).
- **Mechanizm aktualizacji**: Zmiany wyzwalają aktualizacje stanu w App, ponownie obliczając `filteredChats` z useMemo dla efektywności. Canvas re-renderuje tylko zmienione kółka.

Brak debounce potrzebny z powodu małego zestawu danych (22 czaty).

### Przeglądarka konwersacji (Modal)

ChatModal.tsx dostarcza szczegółowy widok wybranego czatu, oddzielając treść od analizy dla użyteczności.

**Jak to działa**:

- **Zakładki**: "Treść" pokazuje rozwijane pary Q&A (śledzone przez stan Set do przełączania widoczności); "Analiza" wyświetla umiejętności jako odznaki, metryki jako statystyki i listy dla mocnych stron/ulepszeń/wartości dla pracodawcy.
- **Powiązane czaty**: Klikalne linki pobierają i otwierają inny Chat przez ID z pełnej listy.
- **Interakcje**: Escape zamyka; focus uwięziony przez Headless UI. Responsywny: Dostosowuje padding/rozmiar tekstu dla niskich landscape.

**Fragment logiki rozwijanej**:

```typescript
const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

const toggleItem = (index: number) => {
  setExpandedItems((prev) => {
    const newSet = new Set(prev);
    if (newSet.has(index)) newSet.delete(index);
    else newSet.add(index);
    return newSet;
  });
};
```

### Interakcje użytkownika i responsywność

- **Hover/Kliknięcie**: Zdarzenia myszy na canvas wykrywają bliskość kółka dla podświetleń i otwarć modali.
- **Dotyk/Mobile**: Zdarzenia wskaźnika ujednolicają dotyk/mysz; menu hamburgerowe w Header dla małych ekranów.
- **Klawiatura**: System dwupoziomowy w ChatCanvas (Enter aby wejść w tryb nawigacji, strzałki aby wybierać, Enter aby otworzyć)—szczegóły w Funkcjach dostępności.

Wszystkie funkcjonalności priorytetyzują wydajność (np. refs dla animacji) i wiążą się z modelem danych dla bezproblemowych aktualizacji.

## Funkcje dostępności

Dostępność (a11y) była traktowana jako priorytetowa troska podczas projektowania interakcji, nie jako post-implementacyjna lista kontrolna. Aplikacja została zaprojektowana z myślą o wytycznych WCAG 2.1 AA, skupiając się na operacji klawiaturą, jasnym zarządzaniu focusem i kompatybilności z czytnikami ekranu tam gdzie to możliwe. Dostępność jest zintegrowana bezpośrednio w głównych komponentach takich jak ChatCanvas i ChatModal, z Headless UI używanym dla solidnej obsługi focus w złożonych wzorcach UI.

### Nawigacja klawiaturą

Dwupoziomowy system nawigacji klawiaturą w `ChatCanvas.tsx` zapobiega przypadkowym interakcjom zachowując pełną, efektywną kontrolę nad niestandardowym interfejsem opartym na canvas:

- **Poziom 1 – Focus zewnętrzny**:  
  Tabowanie focusuje canvas jako pojedynczy region interaktywny. Widoczny przerywaną obwódka pojawia się tylko dla użytkowników klawiatury aby unikać wizualnego bałaganu dla użytkowników myszy.
- **Poziom 2 – Tryb interakcji**:  
  Naciśnięcie `Enter` aktywuje nawigację wewnątrz canvas. Klawisze strzałek przesuwają między kółkami, `Enter` lub `Spacja` otwiera wybrany modal czatu, a `Escape` wychodzi z trybu interakcji i usuwa focus z canvas.

**Przegląd skrótów klawiszowych**:

| Kontekst             | Klawisz               | Akcja                                                |
| -------------------- | --------------------- | ---------------------------------------------------- |
| Canvas (Focus zewn.) | Tab                   | Focus canvas (widoczna obwódka tylko dla klawiatury) |
| Canvas (Focus zewn.) | Enter                 | Wejście w tryb interakcji                            |
| Canvas (Focus zewn.) | Escape                | Usunięcie focus z canvas                             |
| Tryb interakcji      | Strzałki / Home / End | Nawigacja między kółkami                             |
| Tryb interakcji      | Enter / Spacja        | Otwarcie wybranego modala czatu                      |
| Tryb interakcji      | Escape                | Wyjście z trybu interakcji                           |
| Modal                | Escape                | Zamknięcie modala                                    |
| Modal                | Tab                   | Nawigacja wewnątrz modala (focus trap)               |

Refs są używane do rozróżniania interakcji klawiaturą vs. wskaźnikiem, zapewniając że wskaźniki focus i udogodnienia nawigacji pojawiają się tylko gdy są odpowiednie.

### Wsparcie czytników ekranu

- **Role i etykiety ARIA**:  
  Canvas używa jawnej roli ARIA do wspierania niestandardowych interakcji klawiaturowych. Ta decyzja została podjęta świadomie z powodu niestandardowego, opartego na canvas modelu nawigacji i jego wzorców interakcji podobnych do gry. Opisowe atrybuty `aria-label` i `aria-describedby` wyjaśniają dostępne interakcje klawiaturowe (np. jak wejść w tryb nawigacji).
- **Modale i kontrolki**:  
  Headless UI dostarcza prawidłową semantykę dla dialogów (`role="dialog"`), pułapki focus i obsługę klawisza Escape. Kontrolki interaktywne takie jak przyciski i suwaki zawierają odpowiednie atrybuty ARIA (`aria-label`, `aria-valuenow`).
- **Ogłoszenia stanu**:  
  Rozwijane elementy Q&A w `ChatModal` używają `aria-expanded`, zapewniając że zmiany stanu są przekazywane do technologii wspomagających.

### Względy wizualne i ruchu

- **Kontrast kolorów**:  
  Tekst i elementy UI spełniają wymagania kontrastu WCAG AA (≥4.5:1 dla tekstu głównego), używając testowanej palety kolorów opartej na Tailwind.
- **Wskaźniki focus**:  
  Niestandardowe obwódki focus i pierścienie wyboru są wyraźnie widoczne dla użytkowników klawiatury zachowując dyskrecję dla interakcji opartych na wskaźniku.
- **Tekst i układ**:  
  Minimalne rozmiary czcionek i wysokości linii są wybrane aby utrzymać czytelność w różnych breakpointach, włączając układy landscape o niskiej wysokości.
- **Kontrola ruchu**:  
  Kontrolka pauzy pozwala użytkownikom całkowicie zatrzymać animacje canvas. Przyszłe ulepszenia mogą zawierać automatyczne wykrywanie media query `prefers-reduced-motion`.

### Testowanie i walidacja

Dostępność została zweryfikowana przez testy nawigacji tylko klawiaturą i manualny przegląd ról ARIA i zachowania focus w głównych przepływach interakcji. Testowanie czytników ekranu jest planowane jako przyszłe ulepszenie aby dalej walidować ogłoszenia i zachowanie nawigacji.

Kluczowe sprawdzenia dostępności obejmują:

- Pełna operacja tylko klawiaturą
- Brak polegania tylko na kolorze do przekazywania informacji
- Brak niespodziewanych pułapek focus poza modalami
- Brak migających lub wywołujących napady treści

Te funkcje demonstrują celowe, świadome kompromisów podejście do inkluzywnego projektu w niestandardowym, opartym na canvas interfejsie.

## Wydajność i optymalizacje

Aplikacja jest zaprojektowana dla płynnej wydajności na różnych urządzeniach, z ukierunkowanymi optymalizacjami w kluczowych wąskich gardłach. Podejście kładzie nacisk na manualne, strategiczne optymalizacje nad zautomatyzowanymi narzędziami, demonstrując rozumienie modelu renderowania React i możliwości przeglądarki.

### Memoizacja i zarządzanie stanem

- **Przefiltrowane czaty**: `useMemo` w `App.tsx` ponownie oblicza tylko gdy `activeCategories` lub `activeRatings` się zmienią, zapobiegając niepotrzebnemu filtrowaniu O(n) przy każdym renderze.
- **Stabilne callbacki**: Krytyczne funkcje w `ChatCanvas.tsx` opakowane w `useCallback` z precyzyjnymi zależnościami:
  - `normalizeVelocity`, `checkCircleCollision`, `initializeCircle`, `drawCircle` - puste tablice zależności dla czystych funkcji.
  - Zapobiega resetom efektów animacji ze zmieniających się referencji funkcji.
- **Brak zewnętrznych bibliotek stanu**: Wbudowane hooki React obsługują cały stan; unika narzutu Redux/Zustand.

### Optymalizacje renderowania canvas

- **Refs dla stanu animacji**: Pozycje kółek, prędkości i ID klatek animacji przechowywane w refs aby uniknąć wyzwalania re-renderów React podczas aktualizacji 60fps.
  ```typescript
  const circlesRef = useRef<Circle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  ```
- **Wsparcie HiDPI**: Canvas skaluje do współczynnika pikseli urządzenia dla ostrego renderowania na wyświetlaczach retina.
  ```typescript
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  ```
- **RequestAnimationFrame**: Synchronizuje aktualizacje z cyklem odświeżania przeglądarki dla płynnych 60fps; fizyka pomijana gdy zapauzowana aby oszczędzać CPU.
- **Wykrywanie kolizji**: Algorytm O(n²) efektywny dla ~22 kółek; używa porównań kwadratów dystansów aby unikać kosztownych operacji pierwiastka kwadratowego.

### Rozmiar bundle i build

- **Minimalne zależności**: Tylko `@headlessui/react` dla modali poza rdzeniem React; brak ciężkich bibliotek zarządzania stanem lub narzędziowych.
- **Optymalizacje Vite**: Code splitting, tree shaking i minifikacja obsługiwana przez Vite; pojedynczy zasób obrazu WebP.
- **Potencjalne ulepszenia**: Modal mógłby być lazy-loadowany z `React.lazy` dla dalszej redukcji ładowania początkowego (niewielka korzyść przy obecnej skali).

### Ogólne względy

- **Minimalizacja re-renderów**: Stabilne klucze w listach; komponenty zstrukturyzowane aby unikać niepotrzebnych aktualizacji.
- **Skalowalność**: Obecne optymalizacje odpowiednie dla 22 czatów; większe zestawy danych skorzystałyby z wirtualizacji lub Web Workers dla fizyki.
- **Kompromisy**: Wykrywanie kolizji O(n²) akceptowalne w tej skali; partycjonowanie przestrzenne niepotrzebną złożonością dla obecnych wymagań.

Te optymalizacje zapewniają płynne animacje 60fps i responsywny UI bez przedwczesnej złożoności. Wydajność może być walidowana z Chrome DevTools i audytami Lighthouse.

## Deployment

Aplikacja jest wdrożona jako strona statyczna zbudowana z Vite i hostowana na Vercel. Ta konfiguracja zapewnia szybką globalną dostawę przez CDN, automatyczny HTTPS i bezproblemową integrację CI/CD z GitHub.

### Konfiguracja produkcyjna

- Komenda build: `npm run build`
- Katalog wyjściowy: `dist`
- Build produkcyjny generuje zoptymalizowane, zminifikowane zasoby gotowe do hostingu statycznego.

### Platforma hostingowa: Vercel

Live demo dostępne pod: https://ai-prompting-sessions.vercel.app/

Vercel został wybrany dla:

- Wdrożenie zero-config dla projektów Vite
- Automatyczne wdrożenia przy każdym push do głównej gałęzi
- Wdrożenia preview dla pull requestów
- Globalna sieć edge dla dostawy o niskiej latencji

### Konfiguracja środowiska

Projekt obecnie nie wymaga zmiennych środowiskowych. Przyszłe integracje mogą wykorzystać `import.meta.env` Vite i konfigurację na poziomie platformy.

To podejście do wdrożenia zgadza się ze statyczną architekturą projektu i priorytetyzuje prostotę, niezawodność i wydajność.

## Przewodnik deweloperski

### Dodawanie nowych konwersacji

Aby dodać nowy czat do portfolio:

1. Otwórz `src/data/chats.ts`
2. Dodaj nowy obiekt `Chat` do tablicy podążając za istniejącą strukturą:
   ```typescript
   {
     id: "22", // Zwiększ od ostatniego ID
     emoji: "🔬",
     title: "Twój tytuł czatu",
     category: "nauka", // Jeden z: nauka, filozofia, technologia, historia, polityka, sztuka
     conversation: [
       {
         question: "Twoje pytanie...",
         answer: "Odpowiedź AI..."
       }
     ],
     skills: ["Technika 1", "Technika 2"],
     analysis: "Twoja analiza...",
     relatedChats: ["0", "5"], // ID powiązanych czatów
     metrics: {
       clarity: 5,
       adaptation: 4,
       depth: 4,
       criticalThinking: 5
     },
     strengths: ["Mocna strona 1"],
     improvements: ["Ulepszenie 1"],
     employerValue: ["Propozycja wartości 1"]
   }
   ```
3. Upewnij się że `id` jest unikalne a `relatedChats` referencjonują istniejące ID
4. Przetestuj filtrowanie i wyświetlanie modala w trybie deweloperskim

### Wytyczne stylu kodu

- Używaj TypeScript strict mode; wszystkie typy muszą być jawne
- Podążaj za istniejącymi konwencjami nazewnictwa:
  - `camelCase` dla zmiennych i funkcji
  - `PascalCase` dla komponentów i typów
  - `UPPER_SNAKE_CASE` dla stałych
- Uruchom `npm run lint` przed commitowaniem aby wychwycić problemy stylu
- Utrzymuj komponenty skupione na pojedynczych odpowiedzialnościach
- Dokumentuj złożoną logikę komentarzami inline

### Praca z Canvas

Animacja canvas w `ChatCanvas.tsx` jest krytyczna dla wydajności:

- **Unikaj zmian stanu wewnątrz pętli animacji** - używaj refs dla aktualizacji wysokiej częstotliwości (pozycje, prędkości)
- **Testuj responsywność** przy różnych rozmiarach ekranu i współczynnikach pikseli urządzenia (1x, 2x, 3x)
- **Monitoruj wydajność** używając panelu Performance Chrome DevTools przy modyfikowaniu fizyki
- **Pamiętaj o skalowalności** - wydajność wykrywania kolizji znacząco degraduje poza 50-100 kółkami

### Lista kontrolna testowania

Przed zgłaszaniem zmian:

- [ ] Przetestuj na wielu przeglądarkach (Chrome, Firefox, Safari)
- [ ] Zweryfikuj że nawigacja klawiaturą działa (Tab, Enter, strzałki, Escape)
- [ ] Sprawdź responsywny układ na viewportach mobile/tablet
- [ ] Upewnij się że nie ma błędów konsoli ani ostrzeżeń
- [ ] Uruchom `npm run build` aby zweryfikować że build produkcyjny się udaje
- [ ] Przetestuj wydajność animacji przy różnych prędkościach

### Workflow Git

- Twórz gałęzie feature z `main`: `git checkout -b feature/your-feature-name`
- Pisz opisowe wiadomości commit: `git commit -m "Add: search functionality for conversations"`
- Utrzymuj commity skupione i atomowe
- Aktualizuj dokumentację gdy dodajesz funkcje

## Wsparcie przeglądarek

Aplikacja targetuje nowoczesne przeglądarki ze wsparciem ES2020+:

### Wspierane przeglądarki:

- **Chrome/Edge**: Wersja 90+ (zalecana)
- **Firefox**: Wersja 88+
- **Safari**: Wersja 14+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+

### Funkcje wymagające wsparcia nowoczesnej przeglądarki:

- Funkcje ES2020 (optional chaining, nullish coalescing)
- CSS Grid i Flexbox dla layoutu
- Canvas 2D API ze wsparciem `devicePixelRatio`
- `requestAnimationFrame` dla płynnych animacji
- ResizeObserver dla responsywnego rozmiaru canvas
- Niestandardowe właściwości CSS (zmienne)

### Znane ograniczenia przeglądarek:

- **Safari <14**: Niespójności renderowania canvas na starszych wersjach
- **Firefox na Linux**: Mogą wystąpić niewielkie różnice renderowania czcionek
- **Przeglądarki mobilne**: Nawigacja klawiaturą dotykową ograniczona; polega na interakcjach dotykowych

Wsparcie legacy przeglądarek (IE11, starsze przeglądarki mobilne) nie jest zapewnione. Użytkownicy na niewspieranych przeglądarkach zobaczą zdegradowane lub niefunkcjonalne doświadczenie. Rozważ wyświetlanie powiadomienia o aktualizacji przeglądarki dla wykrytych niewspieranych przeglądarek w przyszłych wersjach.

## Znane ograniczenia

### Obecne ograniczenia:

#### Rozmiar zestawu danych

- **Zoptymalizowane dla ~22 konwersacji**: Obecna architektura obsługuje tę skalę efektywnie z wykrywaniem kolizji O(n²).
- **Degradacja wydajności poza 50-100 kółkami**: Bez zmian architektonicznych (partycjonowanie przestrzenne, Web Workers), frame rate animacji może spaść na urządzeniach niższej klasy.
- **Brak paginacji lub wirtualizacji**: Wszystkie czaty ładują się na raz; rozważ implementację tych dla większych zestawów danych.

#### Kompromisy dostępności

- **Ograniczenia UI opartego na canvas**: Elementy canvas mają wrodzone ograniczenia dostępności w porównaniu do tradycyjnych elementów DOM.
- **Nawigacja klawiaturą dotykową**: Zaprojektowane głównie dla użytkowników klawiatury desktop; użytkownicy mobile polegają na interakcjach dotykowych które nie mają równoważnych funkcji nawigacji klawiaturowej.
- **Nawigacja canvas przez czytniki ekranu**: Etykiety ARIA dostarczają kontekst, ale ogłoszenia mogą być mniej szczegółowe niż w pełni oparte na DOM alternatywy.

#### Urządzenie i wydajność

- **Animacja na urządzeniach niskiej klasy**: Symulacja fizyki może gubić klatki na bardzo starych urządzeniach mobilnych (sprzed 2018); kontrolka pauzy dostępna jako obejście.
- **Wyświetlacze wysokiej rozdzielczości**: Choć wspierane, bardzo wysokie gęstości pikseli (3x+) mogą wpłynąć na wydajność na starszym sprzęcie.

#### Specyficzne dla przeglądarki

- **Safari <14**: Niespójności renderowania canvas na starszych wersjach
- **Firefox na Linux**: Niewielkie różnice renderowania czcionek w typografii Tailwind

### Nie zaimplementowane (Celowe):

- **Współpraca w czasie rzeczywistym**: Architektura strony statycznej; brak backendu lub wsparcia WebSocket.
- **Konta użytkowników**: Brak funkcji autentykacji lub personalizacji.
- **Trwałość danych**: Filtry i stan resetują się przy przeładowaniu strony.
- **Wsparcie offline**: Brak service worker lub możliwości PWA.

Te ograniczenia są udokumentowane dla przejrzystości i aby kierować przyszłymi ulepszeniami. Wiele reprezentuje celowe wybory architektoniczne faworyzujące prostotę i wydajność dla obecnego zakresu.

## Przyszłe ulepszenia

Potencjalne ulepszenia dla przyszłych iteracji:

### Planowane funkcje:

- **Funkcjonalność wyszukiwania**: Wyszukiwanie pełnotekstowe w treści konwersacji i umiejętnościach
- **Opcje eksportu**: Pobieranie pojedynczych konwersacji lub całego portfolio jako PDF lub Markdown
- **System tagowania**: Wielowymiarowa kategoryzacja poza pojedynczymi kategoriami (np. tagi jak "zaawansowane", "przyjazne dla początkujących", "techniczne")
- **Dashboard metryk wydajności**: Wyświetlanie rzeczywistych wyników Lighthouse, analityki rozmiaru bundle i monitorowania frame rate

### W rozważaniu:

- **Presety animacji**: Predefiniowane konfiguracje prędkości/fizyki dla różnych preferencji oglądania (np. "spokojny", "energetyczny", "statyczny")
- **Rozszerzone wsparcie czytników ekranu**: Regiony live dla ogłoszeń stanu canvas, ulepszone opisy ARIA
- **Przełącznik trybu ciemnego/jasnego**: Preferencja użytkownika dla schematu kolorów z trwałym przechowywaniem
- **Porównanie konwersacji**: Widok obok siebie powiązanych konwersacji do analizy
- **Wykrywanie preferencji ruchu**: Automatyczne respektowanie media query `prefers-reduced-motion`
- **Lazy loading obrazów**: Odroczone ładowanie obrazów profilowych aż do potrzeby
- **Service Worker/PWA**: Wsparcie offline i doświadczenie instalowanej aplikacji

### Ulepszenia skalowalności:

- **Partycjonowanie przestrzenne**: Wykrywanie kolizji oparte na quadtree lub grid dla obsługi 100+ kółek
- **Web Workers**: Przeniesienie obliczeń fizyki do wątku w tle dla lepszej wydajności
- **Wirtualne przewijanie**: Dla dużych list konwersacji w modalach
- **Dynamiczne importy**: Code-split ChatModal i inne komponenty

### Doświadczenie deweloperskie:

- **Testy jednostkowe**: Testy Jest/Vitest dla narzędzi i hooków
- **Testy E2E**: Playwright/Cypress dla przepływów interakcji użytkownika
- **Storybook**: Dokumentacja komponentów i testowanie regresji wizualnej
- **Pipeline CI/CD**: Automatyczne testowanie i sprawdzenia wdrożenia

## Licencja

Ten projekt jest licencjonowany na **licencji MIT** - zobacz plik [LICENSE](LICENSE) dla szczegółów.
