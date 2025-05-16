import type { ReactNode } from "react";

export interface RowProps {
  children: ReactNode;
  tailwindClasses?: string; 
  breakpoint?: 'sm' | 'md' | 'lg'
}