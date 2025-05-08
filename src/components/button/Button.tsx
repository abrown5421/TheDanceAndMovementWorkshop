import React from "react";
import type { ButtonProps } from "./buttonTypes";
import { Loader2 } from "lucide-react"; 
import { clsx } from "clsx";

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  bgColor = "bg-primary",
  textColor = "text-white",
  loading = false,
  disabled = false,
  className = "",
  type = "button",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center rounded px-4 py-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        bgColor,
        textColor,
        (disabled || loading) && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        text
      )}
    </button>
  );
};

export default Button;