export interface Step {
  id: number;
  title: string;
  desc: string;
  highlight: string;
  pitfall: string;
}

export interface Product {
  name: string;
  p: number;
  category?: string;
}

export interface FaqItem {
  q: string;
  a: string;
  category: string;
}

export interface GlossaryItem {
  term: string;
  meaning: string;
}
