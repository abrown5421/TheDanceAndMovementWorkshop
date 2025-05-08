export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: boolean;
  helperText?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  onStartAdornmentClick?: () => void;
  onEndAdornmentClick?: () => void;
  className?: string;
}