import type { ReactNode, CSSProperties  } from "react";

export interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: ()=> void;
}
export interface CardMediaProps {
    image?: string;
    children?: ReactNode;
    className?: string;
}
export interface CardSectionProps {
  children: ReactNode;
  className?: string;
}
export interface DeckProps {
    children: ReactNode;
    cardsPerRow?: number; 
    rowHeight?: string; 
    wrap?: boolean; 
    className?: string;
}