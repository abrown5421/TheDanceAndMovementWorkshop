export interface ViewportState {
    width: number;
    height: number;
    type: "mobile" | "tablet" | "desktop";
}

export interface FormState {
  [key: string]: string;
}

export interface ErrorState {
  [key: string]: boolean;
}

export interface HelperTextState {
  [key: string]: string;
}