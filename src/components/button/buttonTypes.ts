export interface ButtonProps {
  text: string;
  onClick: () => void;
  bgColor?: string;
  textColor?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export interface ButtonLoadState {
    buttonLoad: boolean;
    buttonIdentify: string;
}