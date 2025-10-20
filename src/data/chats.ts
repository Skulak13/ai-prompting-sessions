import type { Chat } from "../types";

export const chats: Chat[] = [
  {
    id: "1",
    title: "Analiza paradoksu Fermiego",
    category: "nauka",
    content: `**Użytkownik:** Jak wyjaśnić paradoks Fermiego w kontekście najnowszych odkryć egzoplanet?

**AI:** Paradoks Fermiego dotyczy pozornej sprzeczności między wysokim prawdopodobieństwem istnienia cywilizacji pozaziemskich a brakiem jakichkolwiek dowodów na ich istnienie...`,
    skills: ["Rozumowanie dedukcyjne", "Analiza wieloczynnikowa", "Synteza informacji"],
    analysis: "W tej konwersacji zastosowałem technikę stopniowego rozwijania tematu, prosząc o kontekstualizację problemu w świetle najnowszych odkryć. Wykorzystałem metodę 'Chain of Thought', prosząc AI o rozłożenie problemu na składowe.",
    relatedChats: ["2", "5"],
    emoji: "🚀",
  },
  {
    id: "2",
    title: "Etyka AI w społeczeństwie",
    category: "filozofia",
    content: `**Użytkownik:** Jakie są główne dylematy etyczne związane z rozwojem sztucznej inteligencji?

**AI:** Dylematy etyczne AI można podzielić na kilka kluczowych kategorii: odpowiedzialność za decyzje, przejrzystość algorytmów, ochrona prywatności...`,
    skills: ["Socratic questioning", "Analiza etyczna", "Krytyczne myślenie"],
    analysis: "Wykorzystałem metodę sokratejską, zadając pytania pogłębiające, które zmuszały AI do rozważenia różnych perspektyw. Zastosowałem technikę 'Devil's Advocate', prosząc o kontrargumenty.",
    relatedChats: ["1", "3"],
    emoji: "🤔",
  },
  {
    id: "3",
    title: "Rewolucja kwantowa",
    category: "technologia",
    content: `**Użytkownik:** Wyjaśnij w prosty sposób, jak komputery kwantowe różnią się od klasycznych.

**AI:** Komputery kwantowe wykorzystują zasady mechaniki kwantowej, takie jak superpozycja i splątanie...`,
    skills: ["Uproszczenie złożonych tematów", "Analogie", "Few-shot learning"],
    analysis: "Poprosiłem o wyjaśnienie 'dla laika', co zmusiło AI do użycia prostego języka i analogii. Następnie pogłębiłem temat poprzez pytania o konkretne zastosowania.",
    relatedChats: ["2", "4"],
    emoji: "💻",
  },
  {
    id: "4",
    title: "Upadek Rzymu - nowa perspektywa",
    category: "historia",
    content: `**Użytkownik:** Czy można znaleźć paralele między upadkiem Rzymu a współczesnymi wyzwaniami?

**AI:** To fascynujące porównanie. Cesarstwo Rzymskie upadło z wielu powodów: ekonomicznych, wojskowych, społecznych...`,
    skills: ["Analiza porównawcza", "Myślenie historyczne", "Kontekstualizacja"],
    analysis: "Zastosowałem metodę porównawczą, prosząc o znalezienie paraleli historycznych. Wykorzystałem technikę iteracyjnego doprecyzowywania, zadając kolejne pytania szczegółowe.",
    relatedChats: ["3", "6"],
    emoji: "🏛️",
  },
  {
    id: "5",
    title: "Przyszłość demokracji",
    category: "polityka",
    content: `**Użytkownik:** Jak media społecznościowe wpływają na jakość debaty publicznej?

**AI:** Media społecznościowe wywierają złożony wpływ na debatę publiczną. Z jednej strony demokratyzują dostęp do informacji...`,
    skills: ["Analiza wieloaspektowa", "Rozważanie perspektyw", "Neutralność"],
    analysis: "Poprosiłem o wieloaspektową analizę, unikając jednoznacznych ocen. Zastosowałem technikę 'Steel Man', prosząc o przedstawienie najmocniejszych argumentów obu stron debaty.",
    relatedChats: ["1", "4"],
    emoji: "🗳️",
  },
  {
    id: "6",
    title: "Impresjonizm i technologia",
    category: "sztuka",
    content: `**Użytkownik:** Jak wynalazek fotografii wpłynął na rozwój malarstwa impresjonistycznego?

**AI:** Wynalazek fotografii w XIX wieku fundamentalnie zmienił rolę malarstwa. Artyści nie musieli już...`,
    skills: ["Analiza przyczynowo-skutkowa", "Kontekst historyczny", "Interdyscyplinarność"],
    analysis: "Połączyłem dwie dziedziny - technologię i sztukę - prosząc o analizę wzajemnych wpływów. Zastosowałem metodę 'Co by było, gdyby...', pytając o alternatywne scenariusze rozwoju.",
    relatedChats: ["4", "3"],
    emoji: "🎨",
  },
  {
    id: "7",
    title: "Teoria strun dla początkujących",
    category: "nauka",
    content: `**Użytkownik:** Czy możesz wyjaśnić teorię strun bez używania skomplikowanej matematyki?

**AI:** Teoria strun próbuje odpowiedzieć na pytanie: z czego naprawdę zbudowany jest wszechświat?...`,
    skills: ["Simplifikacja", "Metafory", "Budowanie od podstaw"],
    analysis: "Zastosowałem ograniczenie 'bez matematyki', zmuszając AI do kreatywnego użycia analogii. Technika 'ELI5' (Explain Like I'm 5) okazała się bardzo skuteczna.",
    relatedChats: ["1", "3"],
    emoji: "🌌",
  },
  {
    id: "8",
    title: "Nihilizm vs. Egzystencjalizm",
    category: "filozofia",
    content: `**Użytkownik:** Jaka jest główna różnica między nihilizmem a egzystencjalizmem?

**AI:** Choć obie filozofie zaczynają od podobnego punktu - braku wewnętrznego sensu życia - ich konkluzje są radykalnie różne...`,
    skills: ["Porównanie konceptów", "Jasne rozgraniczenia", "Przykłady praktyczne"],
    analysis: "Poprosiłem o bezpośrednie porównanie dwóch pojęć, co wymagało od AI precyzji i strukturyzacji. Dodałem prośbę o praktyczne przykłady, co ukonkretniło abstrakcyjne koncepty.",
    relatedChats: ["2", "5"],
    emoji: "💭",
  },
];