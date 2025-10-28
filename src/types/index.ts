export interface Chat {
  id: string;
  title: string;
  category: Category;
  conversation: Array<{
    question: string;
    answer: string;
  }>;
  skills: string[]; // Umiejętności promptowania
  analysis: string; // Analiza konwersacji
  relatedChats: string[]; // ID powiązanych chatów (dla konstelacji)
  emoji?: string; // Opcjonalna emotka
  metrics?: {
    clarity: number;
    adaptation: number;
    depth: number;
    criticalThinking: number;
  };
  strengths?: string[];
  improvements?: string[];
  employerValue?: string[];
}

export type Category =
  | "nauka"
  | "filozofia"
  | "technologia"
  | "historia"
  | "polityka"
  | "sztuka"
  | "wszystkie";

export type RatingFilter = 4 | 4.5 | 4.8 | 5 | null;
