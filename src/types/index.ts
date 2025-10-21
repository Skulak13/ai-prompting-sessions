export interface Chat {
  id: string;
  title: string;
  category: Category;
  content: string; // Treść konwersacji
  skills: string[]; // Umiejętności promptowania
  analysis: string; // Analiza konwersacji
  relatedChats: string[]; // ID powiązanych chatów (dla konstelacji)
  emoji?: string; // Opcjonalna emotka
}

export type Category = 
  | 'nauka'
  | 'filozofia'
  | 'technologia'
  | 'historia'
  | 'polityka'
  | 'sztuka'
  | 'wszystkie';