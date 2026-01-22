# AI Prompting Sessions - Documentation

**🚀 [View Live Demo](https://ai-prompting-sessions.vercel.app/)**

**Author:** Tomek Skulski ([@Skulak13](https://github.com/Skulak13))  
**Connect:** [LinkedIn](https://linkedin.com/in/tomasz-skulski) | [GitHub](https://github.com/Skulak13) | [Codewars](https://www.codewars.com/users/Skulak13)

---

## 💡 About This Project

This project is not a typical code portfolio. It's documentation of my way of thinking and prompting skills.

I'm a self-taught programmer with a background in sociology and psychology, and a wide spectrum of interests. The project contains 22 conversations with AI that show how I systematically build knowledge from scratch, how I question assumptions, how I investigate mechanisms instead of settling for descriptions.

The conversations are an example of what I brought from the humanities and what I transfer to programming: the ability to ask good questions, catch inconsistencies, build mental models of complex systems. Skills that can't be learned from tutorials.

Each of the 22 conversations has:

- Specific prompting skills (progressive deepening, questioning assumptions, gap filling)
- Quality rating (clarity, adaptation, depth, critical thinking - average 4.7/5)
- Employer value analysis (transferable skills to tech: debugging mindset, stakeholder management, systems thinking)

AI Prompting Sessions is an interactive visualization of these conversations. It shows my curiosity, how I think, analyze, and solve problems - that I can not only ask questions, but ask the right questions.

**Methodology**: The analysis of each conversation—identification of prompting techniques, quality ratings (clarity, adaptation, depth, critical thinking), and employer value—was performed by AI to ensure objective and systematic evaluation.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technical Stack](#technical-stack)
3. [Installation and Setup](#installation-and-setup)
4. [Project Structure](#project-structure)
5. [Components](#components)
6. [Data and Types](#data-and-types)
7. [Functionalities](#functionalities)
8. [Accessibility Features](#accessibility-features)
9. [Performance and Optimizations](#performance-and-optimizations)
10. [Deployment](#deployment)
11. [Development Guide](#development-guide)
12. [Browser Support](#browser-support)
13. [Known Limitations](#known-limitations)
14. [Future Enhancements](#future-enhancements)

## Project Overview

AI Prompting Sessions is an interactive portfolio showcasing 22 curated conversations with AI, demonstrating advanced prompting techniques and critical thinking skills. The application presents these conversations as animated circles on a canvas, creating an engaging visual experience that allows users to explore different topics and analyze the prompting strategies used.

### Key Features:

- 🎯 **Interactive Visualization**: Conversations appear as moving circles on a canvas, with smooth animations and physics for an immersive exploration.
- 🔍 **Flexible Filtering**: Sort by categories (Science, Philosophy, Technology, History, Politics, Art) or ratings (4.0+ to 5.0 stars based on clarity, depth, etc.).
- ⚙️ **Animation Controls**: Adjust speed (0.1x to 3x) and pause the movement for easier inspection of circles.
- 📊 **In-Depth Analysis**: Each conversation includes detailed breakdowns of prompting techniques, skill metrics, strengths, improvements, and employer value.
- 🔗 **Connected Topics**: Links to related conversations create a network of ideas for deeper discovery.
- ⌨️ **Full Accessibility**: Keyboard navigation, screen reader support, and ARIA compliance ensure inclusivity.
- 📱 **Responsive Design**: Seamlessly adapts to desktop, tablet, and mobile devices, with touch-friendly controls.

### Analysis Methodology

The analysis of each conversation—including identification of prompting techniques, quality ratings (clarity, adaptation, depth, critical thinking), and employer value assessment—was performed by AI to ensure objective and systematic evaluation.

## Technical Stack

The application is built using modern web technologies focused on performance, type safety, and accessibility. Below is a breakdown of the core stack:

### Core Framework and Language

- **React 19**: Leverages the latest features and concurrent rendering capabilities.
- **TypeScript 5.9**: Provides strong typing across the codebase for improved maintainability and error prevention.

### Build and Tooling

- **Vite 7**: Fast development server and production bundler with hot module replacement, code splitting, and minification.
- **ESLint 9**: Code linting with TypeScript support to enforce consistent style and catch issues early.

### Styling and UI Components

- **Tailwind CSS 4**: Utility-first CSS framework for rapid, responsive styling without custom CSS files (integrated via Vite plugin).
- **Headless UI 2**: Accessible, unstyled UI components for modals, dialogs, and transitions, ensuring WCAG compliance.

### Additional Dependencies

No heavy external libraries are used beyond the essentials, keeping the bundle size small. The full list can be found in `package.json`, with key production dependencies including `@headlessui/react` for modals and no runtime state management libraries (handled via React's built-in hooks).

This stack emphasizes efficiency: React hooks manage state without external libraries, Vite ensures fast builds, and Tailwind/Headless UI enable a clean, accessible UI.

## Installation and Setup

### Requirements

- **Node.js**: Version ≥20.19.0 or ≥22.12.0 (recommended for compatibility with Vite and React 19).
- **npm**: Version ≥8.0.0 (or use yarn/pnpm as alternatives).

### Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Skulak13/ai-prompting-sessions.git
   cd ai-prompting-sessions
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

- **Development Mode**: Starts a local server with hot module replacement at `http://localhost:5173`.

  ```bash
  npm run dev
  ```

- **Production Build**: Generates optimized static files in the `dist` directory.

  ```bash
  npm run build
  ```

- **Preview Build**: Serves the production build locally for testing.

  ```bash
  npm run preview
  ```

- **Linting**: Checks code for style and potential issues using ESLint.
  ```bash
  npm run lint
  ```

Note: The application is a static site, so after building, you can deploy the `dist` folder to any static hosting service (see Deployment section for details). If you encounter issues, ensure your Node.js version matches the requirements and clear the npm cache if needed.

## Project Structure

The project follows a clean, modular React + TypeScript architecture built with Vite. Below is the directory structure:

```
ai-prompting-sessions/
├── src/
│   ├── components/
│   │   ├── ChatCanvas.tsx      # Handles canvas animation and interactions
│   │   ├── ChatModal.tsx       # Displays conversation details and analysis
│   │   ├── Header.tsx          # Filtering controls and header UI
│   │   └── Footer.tsx          # Social links footer
│   ├── data/
│   │   └── chats.ts            # Array of 22 conversation objects
│   ├── types/
│   │   └── index.ts            # TypeScript interfaces (e.g., Chat, Category)
│   ├── assets/
│   │   └── images/             # Profile image (skulfancy.webp)
│   ├── App.tsx                 # Root component managing global state
│   ├── main.tsx                # Application entry point
│   └── index.css               # Global styles with Tailwind
├── index.html                  # HTML template
├── vite.config.ts              # Vite configuration (React and Tailwind plugins)
└── package.json                # Dependencies and scripts
```

### Architecture Pattern: Component-Based with Lifted State

The app uses a simple hierarchical structure where state is lifted to the root (App.tsx) for efficient management without external libraries. This promotes unidirectional data flow and easy scalability.

```
┌─────────────────────────────────────┐
│           App (root)                │
│  - activeCategories                 │
│  - activeRatings                    │
│  - speed, isPaused                  │
│  - selectedChat                     │
└────────┬────────────────────────────┘
         │
         ├─► Header (controls)
         │   - Category filters
         │   - Rating filters
         │   - Speed control
         │   - Pause/Resume
         │
         ├─► ChatCanvas (visualization)
         │   - Physics simulation
         │   - Collision detection
         │   - Keyboard navigation
         │   - Hover/click interactions
         │
         ├─► Footer (links)
         │
         └─► ChatModal (details)
             - Conversation tabs
             - Skills analysis
             - Metrics visualization
             - Related chats
```

### Data Flow

User interactions follow React's unidirectional pattern:

```
User Action → Component Event → State Update (App.tsx) → Props → Re-render
```

For example, changing filters in Header updates state in App, triggering a memoized re-filter of chats and re-render of ChatCanvas.

This setup keeps the codebase maintainable: State is centralized, components are pure where possible, and optimizations like useMemo prevent unnecessary computations.

## Components

This section provides detailed documentation for the main components of the application. Each component is described with its key responsibilities, props, state (if applicable), and relevant code snippets. The architecture is component-based, with state lifted to the root (see Project Structure for hierarchy). Components use React hooks for logic, Tailwind for styling, and Headless UI for accessible elements like modals.

### App.tsx (Root Component)

**Responsibilities**:

- Orchestrates the entire app by managing global state (filters, speed, pause, selected chat).
- Computes filtered chats using memoization for performance.
- Renders and coordinates child components: Header, ChatCanvas, Footer, and conditionally ChatModal.

**State**:

```typescript
const [activeCategories, setActiveCategories] = useState<Category[]>([]); // Array of selected categories
const [activeRatings, setActiveRatings] = useState<
  Array<Exclude<RatingFilter, null>>
>([]); // Selected rating filters
const [speed, setSpeed] = useState(1.0); // Animation speed multiplier
const [isPaused, setIsPaused] = useState(false); // Pause state for animation
const [selectedChat, setSelectedChat] = useState<Chat | null>(null); // Currently open chat
```

**Key Logic** (Filtered Chats Memoization):

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

No props; this is the top-level component.

### Header.tsx (Controls Component)

**Responsibilities**:

- Displays user profile, branding, and filtering controls.
- Handles category and rating toggles, speed slider, and pause button.
- Responsive: Full layout on desktop (≥1280px); hamburger menu on smaller screens using Headless UI Dialog.

**Props**:

```typescript
interface HeaderProps {
  activeCategories: Category[]; // Current selected categories
  setActiveCategories: (categories: Category[]) => void;
  activeRatings: Array<Exclude<RatingFilter, null>>; // Current selected ratings
  setActiveRatings: (ratings: Array<Exclude<RatingFilter, null>>) => void;
  speed: number; // Current animation speed
  setSpeed: (speed: number) => void;
  isPaused: boolean; // Current pause state
  setIsPaused: (paused: boolean) => void;
}
```

**Key Features**:

- Multi-select buttons for categories and ratings.
- Range slider for speed with ARIA labels.
- Mobile menu with focus trap and overlay positioning below the header.

No local state beyond menu open/close; relies on parent props.

### ChatCanvas.tsx (Visualization Component)

**Responsibilities**:

- Renders the animated canvas with circles representing chats.
- Implements physics simulation (velocity, collisions, boundary repulsion) at 60fps using requestAnimationFrame.
- Handles user interactions: hover, click to open modal, keyboard navigation.
- Initializes circles with random positions avoiding overlaps.

**Props**:

```typescript
interface ChatCanvasProps {
  chats: Chat[]; // Filtered list of chats to display
  onChatClick: (chat: Chat) => void; // Callback to open modal
  speed: number; // Animation speed multiplier
  isPaused: boolean; // Whether animation is paused
}
```

**Key Constants (Physics Configuration)**:

```typescript
const BASE_SPEED = 1.25; // Base movement speed
const REPULSION_DISTANCE = RADIUS * 2.2; // Distance for circle repulsion
const WALL_REPULSION_STRENGTH = 1.0; // Force from canvas edges
const DAMPING = 0.97; // Velocity decay factor
```

**Animation Loop Snippet**:

```typescript
const animate = () => {
  if (ctx) {
    ctx.clearRect(0, 0, width, height);
    if (!isPaused) {
      updatePhysics();  // Apply forces, collisions, normalize velocity
    }
    circles.forEach((circle, idx) => {
      const isHovered = /* hover check */;
      const isSelected = /* keyboard selection check */;
      drawCircle(ctx, circle, isHovered, isSelected);
    });
  }
  animationRef.current = requestAnimationFrame(animate);
};
```

**Accessibility**: Two-level keyboard navigation (outer focus, inner interaction mode) with ARIA labels.

Uses refs for canvas and circles to avoid re-renders during animation.

### ChatModal.tsx (Details Viewer)

**Responsibilities**:

- Displays selected chat in a modal dialog with two tabs: Content (expandable Q&A) and Analysis (skills, metrics, strengths, etc.).
- Handles tab switching, expandable items, and related chat links.
- Optimizes for mobile/landscape with responsive spacing.

**Props**:

```typescript
interface ChatModalProps {
  chat: Chat; // The selected chat data
  onClose: () => void; // Callback to close modal
  allChats: Chat[]; // Full list for related chats
  onOpenRelated: (id: string) => void; // Callback to open another chat
}
```

**Key Features**:

- Tabs separate content from analysis.
- Expandable Q&A pairs using Set for tracking open items.
- Metrics visualized as progress bars or stats.
- Related chats as clickable buttons.

Uses Headless UI Dialog for focus trap, transitions, and accessibility.

### Footer.tsx (Social Links)

**Responsibilities**:

- Simple footer displaying links to LinkedIn, GitHub, and Codewars with icons.
- Hover effects for interactivity.

No props or state; static component with Tailwind styling.

These components are designed for reusability and performance, with memoization and refs where needed to minimize re-renders. For adding new components, follow the existing pattern of functional components with hooks.

## Data and Types

The application's data is structured around conversations (chats) stored in `src/data/chats.ts` as an array of 22 `Chat` objects. All types are defined in `src/types/index.ts` using TypeScript for strong typing. This ensures consistency, especially for filtering, metrics calculation, and related chats linking. Categories are thematic enums, and ratings are derived from averaged metrics.

### Chat Interface

Each conversation follows this TypeScript interface:

```typescript
interface Chat {
  id: string; // Unique identifier (e.g., "0")
  title: string; // Short title (e.g., "Magazynowanie energii")
  category: Category; // Thematic category
  emoji?: string; // Optional emoji for visual representation (e.g., "⚡")
  conversation: Array<{
    // Array of Q&A exchanges
    question: string; // User's prompt/question
    answer: string; // AI's response
  }>;
  skills: string[]; // Prompting techniques applied (e.g., "Progresywne zagłębianie")
  analysis: string; // Overall conversation assessment
  relatedChats: string[]; // Array of related chat IDs for linking
  metrics?: {
    // Optional quality scores (1-5 scale)
    clarity: number; // Communication clarity
    adaptation: number; // Adaptation to responses
    depth: number; // Topic exploration depth
    criticalThinking: number; // Analytical reasoning
  };
  strengths?: string[]; // Strengths demonstrated
  improvements?: string[]; // Areas for improvement
  employerValue?: string[]; // Professional relevance
}
```

**Example Chat Object** (Simplified from `chats.ts`):

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
    // Additional exchanges...
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

### Categories

Chats are organized into six thematic categories (enums for type safety):

```typescript
type Category =
  | "nauka" // Science: Physics, biology, etc.
  | "filozofia" // Philosophy: Ethics, epistemology
  | "technologia" // Technology: AI, engineering
  | "historia" // History: Events, cultures
  | "polityka" // Politics: Governance, economics
  | "sztuka"; // Art: Film, creativity
```

Used for filtering; multiple can be selected.

### Rating System and Types

Ratings are calculated as the average of four metrics (from `metrics` object), ranging from 4.0 to 5.0. This powers the rating filter.

```typescript
type RatingFilter = 4 | 4.5 | 4.8 | 5 | null; // Filter options
```

**Rating Calculation** (Derived in App.tsx filtering):

- Average = (clarity + adaptation + depth + criticalThinking) / 4
- Matches filters with thresholds (e.g., 4.0: ≥4 and <4.5).

Data is static and loaded synchronously at startup for simplicity. To add new chats, append to `chats.ts` array (see Development Guide for details). This structure supports easy extension, like adding search via tags in future enhancements.

## Functionalities

This section describes the core functionalities of the application, building on the components and data structures outlined earlier. It focuses on how features work from a user and technical perspective, including key algorithms and interactions. References to components (e.g., ChatCanvas) avoid repetition—see the Components section for implementation details.

### Interactive Canvas Animation

The canvas in ChatCanvas.tsx simulates floating circles representing chats, creating an engaging visual metaphor for exploring ideas. Circles move continuously with physics-based behavior, respecting user controls like speed and pause.

**How It Works**:

- **Initialization**: On mount, circles are positioned randomly without overlaps, each tied to a Chat object (id, title, emoji).
- **Physics Simulation**: Runs at 60fps via `requestAnimationFrame`. Each frame:
  - Calculates repulsion forces between close circles and from canvas walls.
  - Applies damping to velocity for natural slowdown.
  - Normalizes speed to maintain consistency.
- **User Controls**: Speed multiplier (0.1x–3x) scales velocity; pause halts updates but keeps rendering for static viewing.

**Key Algorithm** (Collision and Repulsion):

```typescript
// Check collisions between circles
for (let i = 0; i < circles.length; i++) {
  for (let j = i + 1; j < circles.length; j++) {
    const dx = circles[j].x - circles[i].x;
    const dy = circles[j].y - circles[i].y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < REPULSION_DISTANCE) {
      const overlap = REPULSION_DISTANCE - distance;
      const force = overlap * CIRCLE_REPULSION_STRENGTH;
      // Apply opposing forces to vx/vy...
    }
  }
}

// Wall repulsion (example for left wall)
if (circle.x < WALL_REPULSION_DISTANCE) {
  const overlap = WALL_REPULSION_DISTANCE - circle.x;
  circle.vx += overlap * WALL_REPULSION_STRENGTH;
}

// Normalize velocity to base speed * user speed
const currentSpeed = Math.sqrt(vx * vx + vy * vy);
if (currentSpeed !== 0) {
  vx = (vx / currentSpeed) * (BASE_SPEED * speed);
  vy = (vy / currentSpeed) * (BASE_SPEED * speed);
}
```

This creates organic movement; hover/click detects via mouse position for opening modals.

### Filtering System

Real-time filtering in Header.tsx updates the visible chats in ChatCanvas, using state from App.tsx.

**How It Works**:

- **Category Filtering**: Multi-select toggles (e.g., "nauka" and "filozofia") match against Chat.category.
- **Rating Filtering**: Selects based on averaged metrics (see Data and Types); supports multiple ranges (e.g., 4.5 and 5.0).
- **Update Mechanism**: Changes trigger state updates in App, recomputing `filteredChats` with useMemo for efficiency. Canvas re-renders only changed circles.

No debounce needed due to small dataset (22 chats).

### Conversation Viewer (Modal)

ChatModal.tsx provides a detailed view of a selected chat, separating content from analysis for usability.

**How It Works**:

- **Tabs**: "Content" shows expandable Q&A pairs (tracked via Set state to toggle visibility); "Analysis" displays skills as badges, metrics as stats, and lists for strengths/improvements/employerValue.
- **Related Chats**: Clickable links fetch and open another Chat by ID from the full list.
- **Interactions**: Escape closes; focus trapped via Headless UI. Responsive: Adjusts padding/text size for low-height landscapes.

**Expandable Logic Snippet**:

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

### User Interactions and Responsiveness

- **Hover/Click**: Mouse events on canvas detect circle proximity for highlights and modal opens.
- **Touch/Mobile**: Pointer events unify touch/mouse; hamburger menu in Header for small screens.
- **Keyboard**: Two-level system in ChatCanvas (Enter to enter nav mode, arrows to select, Enter to open)—detailed in Accessibility Features.

All functionalities prioritize performance (e.g., refs for animation) and tie back to the data model for seamless updates.

## Accessibility Features

Accessibility (a11y) was treated as a first-class concern during interaction design, not as a post-implementation checklist. The application was designed with WCAG 2.1 AA guidelines in mind, focusing on keyboard operability, clear focus management, and screen reader compatibility where feasible. Accessibility is integrated directly into core components such as ChatCanvas and ChatModal, with Headless UI used for robust focus handling in complex UI patterns.

### Keyboard Navigation

A two-level keyboard navigation system in `ChatCanvas.tsx` prevents accidental interactions while still allowing full, efficient control over a non-standard canvas-based interface:

- **Level 1 – Outer Focus**:  
  Tabbing focuses the canvas as a single interactive region. A visible dashed outline appears only for keyboard users to avoid visual clutter for mouse users.
- **Level 2 – Interaction Mode**:  
  Pressing `Enter` activates navigation within the canvas. Arrow keys move between circles, `Enter` or `Space` opens the selected chat modal, and `Escape` exits interaction mode and blurs the canvas.

**Key Bindings Overview**:

| Context              | Key                     | Action                                       |
| -------------------- | ----------------------- | -------------------------------------------- |
| Canvas (Outer Focus) | Tab                     | Focus canvas (keyboard-only visible outline) |
| Canvas (Outer Focus) | Enter                   | Enter interaction mode                       |
| Canvas (Outer Focus) | Escape                  | Blur canvas                                  |
| Interaction Mode     | Arrow Keys / Home / End | Navigate between circles                     |
| Interaction Mode     | Enter / Space           | Open selected chat modal                     |
| Interaction Mode     | Escape                  | Exit interaction mode                        |
| Modal                | Escape                  | Close modal                                  |
| Modal                | Tab                     | Navigate within modal (focus trap)           |

Refs are used to distinguish keyboard vs. pointer interactions, ensuring focus indicators and navigation affordances appear only when relevant.

### Screen Reader Support

- **ARIA Roles and Labels**:  
  The canvas uses an explicit ARIA role to support custom keyboard interactions. This decision was made consciously due to the non-standard, canvas-based navigation model and its game-like interaction patterns. Descriptive `aria-label` and `aria-describedby` attributes explain available keyboard interactions (e.g., how to enter navigation mode).
- **Modals and Controls**:  
  Headless UI provides correct semantics for dialogs (`role="dialog"`), focus trapping, and Escape key handling. Interactive controls such as buttons and sliders include appropriate ARIA attributes (`aria-label`, `aria-valuenow`).
- **State Announcements**:  
  Expandable Q&A items in `ChatModal` use `aria-expanded`, ensuring state changes are conveyed to assistive technologies.

### Visual and Motion Considerations

- **Color Contrast**:  
  Text and UI elements meet WCAG AA contrast requirements (≥4.5:1 for body text), using a tested Tailwind-based color palette.
- **Focus Indicators**:  
  Custom focus outlines and selection rings are clearly visible for keyboard users while remaining unobtrusive for pointer-based interaction.
- **Text and Layout**:  
  Minimum font sizes and line heights are chosen to maintain readability across breakpoints, including low-height landscape layouts.
- **Motion Control**:  
  A pause control allows users to stop canvas animations entirely. Future enhancements may include automatic detection of the `prefers-reduced-motion` media query.

### Testing and Validation

Accessibility was verified through keyboard-only navigation testing and manual review of ARIA roles and focus behavior across core interaction flows. Screen reader testing is planned as a future improvement to further validate announcements and navigation behavior.

Key accessibility checks include:

- Full keyboard-only operation
- No reliance on color alone to convey information
- No unexpected focus traps outside modals
- No flashing or seizure-inducing content

These features demonstrate a deliberate, trade-off-aware approach to inclusive design in a non-standard, canvas-driven interface.

## Performance and Optimizations

The application is designed for smooth performance across devices, with targeted optimizations at key bottlenecks. The approach emphasizes manual, strategic optimizations over automated tools, demonstrating understanding of React's rendering model and browser capabilities.

### Memoization and State Management

- **Filtered Chats**: `useMemo` in `App.tsx` recomputes only when `activeCategories` or `activeRatings` change, preventing unnecessary O(n) filtering on every render.
- **Stable Callbacks**: Critical functions in `ChatCanvas.tsx` wrapped in `useCallback` with precise dependencies:
  - `normalizeVelocity`, `checkCircleCollision`, `initializeCircle`, `drawCircle` - empty dependency arrays for pure functions.
  - Prevents animation effect resets from changing function references.
- **No External State Libraries**: Built-in React hooks handle all state; avoids Redux/Zustand overhead.

### Canvas Rendering Optimizations

- **Refs for Animation State**: Circle positions, velocities, and animation frame IDs stored in refs to avoid triggering React re-renders during 60fps updates.
  ```typescript
  const circlesRef = useRef<Circle[]>([]);
  const animationRef = useRef<number | undefined>(undefined);
  ```
- **HiDPI Support**: Canvas scales to device pixel ratio for sharp rendering on retina displays.
  ```typescript
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);
  ```
- **RequestAnimationFrame**: Synchronizes updates with browser refresh cycle for smooth 60fps; physics skipped when paused to save CPU.
- **Collision Detection**: O(n²) algorithm efficient for ~22 circles; uses squared distance comparisons to avoid expensive square root operations.

### Bundle Size and Build

- **Minimal Dependencies**: Only `@headlessui/react` for modals beyond React core; no heavy state management or utility libraries.
- **Vite Optimizations**: Code splitting, tree shaking, and minification handled by Vite; single WebP image asset.
- **Potential Enhancements**: Modal could be lazy-loaded with `React.lazy` for further initial load reduction (minor benefit at current scale).

### General Considerations

- **Re-Render Minimization**: Stable keys in lists; components structured to avoid unnecessary updates.
- **Scalability**: Current optimizations appropriate for 22 chats; larger datasets would benefit from virtualization or Web Workers for physics.
- **Trade-offs**: O(n²) collision detection acceptable at this scale; spatial partitioning unnecessary complexity for current requirements.

These optimizations ensure smooth 60fps animations and responsive UI without premature complexity. Performance can be validated with Chrome DevTools and Lighthouse audits.

## Deployment

The application is deployed as a static site built with Vite and hosted on Vercel. This setup ensures fast global delivery via CDN, automatic HTTPS, and seamless CI/CD integration with GitHub.

### Production Setup

- Build command: `npm run build`
- Output directory: `dist`
- The production build generates optimized, minified assets ready for static hosting.

### Hosting Platform: Vercel

The live demo is available at: https://ai-prompting-sessions.vercel.app/

Vercel was chosen for:

- Zero-config deployment for Vite projects
- Automatic deployments on every push to the main branch
- Preview deployments for pull requests
- Global edge network for low-latency delivery

### Environment Configuration

The project currently does not require environment variables. Future integrations can leverage Vite's `import.meta.env` and platform-level configuration.

This deployment approach aligns with the project's static architecture and prioritizes simplicity, reliability, and performance.

## Development Guide

### Adding New Conversations

To add a new chat to the portfolio:

1. Open `src/data/chats.ts`
2. Add a new `Chat` object to the array following the existing structure:
   ```typescript
   {
     id: "22", // Increment from last ID
     emoji: "🔬",
     title: "Your chat title",
     category: "nauka", // One of: nauka, filozofia, technologia, historia, polityka, sztuka
     conversation: [
       {
         question: "Your question...",
         answer: "AI's response..."
       }
     ],
     skills: ["Technique 1", "Technique 2"],
     analysis: "Your analysis...",
     relatedChats: ["0", "5"], // IDs of related chats
     metrics: {
       clarity: 5,
       adaptation: 4,
       depth: 4,
       criticalThinking: 5
     },
     strengths: ["Strength 1"],
     improvements: ["Improvement 1"],
     employerValue: ["Value proposition 1"]
   }
   ```
3. Ensure the `id` is unique and `relatedChats` reference existing IDs
4. Test filtering and modal display in development mode

### Code Style Guidelines

- Use TypeScript strict mode; all types must be explicit
- Follow existing naming conventions:
  - `camelCase` for variables and functions
  - `PascalCase` for components and types
  - `UPPER_SNAKE_CASE` for constants
- Run `npm run lint` before committing to catch style issues
- Keep components focused on single responsibilities
- Document complex logic with inline comments

### Working with Canvas

The canvas animation in `ChatCanvas.tsx` is performance-critical:

- **Avoid state changes inside the animation loop** - use refs for high-frequency updates (positions, velocities)
- **Test responsiveness** at different screen sizes and device pixel ratios (1x, 2x, 3x)
- **Monitor performance** using Chrome DevTools Performance panel when modifying physics
- **Be mindful of scalability** - collision detection performance degrades significantly beyond 50-100 circles

### Testing Checklist

Before submitting changes:

- [ ] Test on multiple browsers (Chrome, Firefox, Safari)
- [ ] Verify keyboard navigation works (Tab, Enter, arrows, Escape)
- [ ] Check responsive layout on mobile/tablet viewports
- [ ] Ensure no console errors or warnings
- [ ] Run `npm run build` to verify production build succeeds
- [ ] Test animation performance at different speeds

### Git Workflow

- Create feature branches from `main`: `git checkout -b feature/your-feature-name`
- Write descriptive commit messages: `git commit -m "Add: search functionality for conversations"`
- Keep commits focused and atomic
- Update documentation when adding features

## Browser Support

The application targets modern browsers with ES2020+ support:

### Supported Browsers:

- **Chrome/Edge**: Version 90+ (recommended)
- **Firefox**: Version 88+
- **Safari**: Version 14+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+

### Features Requiring Modern Browser Support:

- ES2020 features (optional chaining, nullish coalescing)
- CSS Grid and Flexbox for layout
- Canvas 2D API with `devicePixelRatio` support
- `requestAnimationFrame` for smooth animations
- ResizeObserver for responsive canvas sizing
- CSS custom properties (variables)

### Known Browser Limitations:

- **Safari <14**: Canvas rendering inconsistencies on older versions
- **Firefox on Linux**: Minor font rendering differences may occur
- **Mobile browsers**: Touch keyboard navigation limited; relies on touch interactions

Legacy browser support (IE11, older mobile browsers) is not provided. Users on unsupported browsers will see degraded or non-functional experience. Consider displaying a browser update notice for detected unsupported browsers in future versions.

## Known Limitations

### Current Constraints:

#### Dataset Size

- **Optimized for ~22 conversations**: Current architecture handles this scale efficiently with O(n²) collision detection.
- **Performance degradation beyond 50-100 circles**: Without architectural changes (spatial partitioning, Web Workers), animation frame rate may drop on lower-end devices.
- **No pagination or virtualization**: All chats load at once; consider implementing these for larger datasets.

#### Accessibility Trade-offs

- **Canvas-based UI limitations**: Canvas elements have inherent accessibility constraints compared to traditional DOM elements.
- **Touch keyboard navigation**: Designed primarily for desktop keyboard users; mobile users rely on touch interactions which lack equivalent keyboard navigation features.
- **Screen reader canvas navigation**: ARIA labels provide context, but announcements may be less detailed than fully DOM-based alternatives.

#### Device and Performance

- **Animation on low-end devices**: Physics simulation may drop frames on very old mobile devices (pre-2018); pause control available as workaround.
- **High-DPI displays**: While supported, very high pixel densities (3x+) may impact performance on older hardware.

#### Browser-Specific

- **Safari <14**: Canvas rendering inconsistencies on older versions
- **Firefox on Linux**: Minor font rendering differences in Tailwind typography

### Not Implemented (Intentional):

- **Real-time collaboration**: Static site architecture; no backend or WebSocket support.
- **User accounts**: No authentication or personalization features.
- **Data persistence**: Filters and state reset on page reload.
- **Offline support**: No service worker or PWA capabilities.

These limitations are documented for transparency and to guide future improvements. Many represent deliberate architectural choices favoring simplicity and performance for the current scope.

## Future Enhancements

Potential improvements for future iterations:

### Planned Features:

- **Search Functionality**: Full-text search across conversation content and skills
- **Export Options**: Download individual conversations or entire portfolio as PDF or Markdown
- **Tagging System**: Multi-dimensional categorization beyond single categories (e.g., tags like "advanced", "beginner-friendly", "technical")
- **Performance Metrics Dashboard**: Display actual Lighthouse scores, bundle size analytics, and frame rate monitoring

### Under Consideration:

- **Animation Presets**: Pre-defined speed/physics configurations for different viewing preferences (e.g., "calm", "energetic", "static")
- **Enhanced Screen Reader Support**: Live regions for canvas state announcements, improved ARIA descriptions
- **Dark/Light Mode Toggle**: User preference for color scheme with persistent storage
- **Conversation Comparison**: Side-by-side view of related conversations for analysis
- **Motion Preference Detection**: Automatic respect for `prefers-reduced-motion` media query
- **Lazy Loading Images**: Defer loading of profile images until needed
- **Service Worker/PWA**: Offline support and installable app experience

### Scalability Improvements:

- **Spatial Partitioning**: Quadtree or grid-based collision detection for handling 100+ circles
- **Web Workers**: Offload physics calculations to background thread for better performance
- **Virtual Scrolling**: For large conversation lists in modals
- **Dynamic Imports**: Code-split ChatModal and other components

### Developer Experience:

- **Unit Tests**: Jest/Vitest tests for utilities and hooks
- **E2E Tests**: Playwright/Cypress for user interaction flows
- **Storybook**: Component documentation and visual regression testing
- **CI/CD Pipeline**: Automated testing and deployment checks

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.
