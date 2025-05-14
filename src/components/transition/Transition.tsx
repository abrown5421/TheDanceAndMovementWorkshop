import React, { useEffect, useState } from "react";  
import type { TransitionProps } from "./transitionTypes";
import "animate.css";
import './transition.css';

const Transition: React.FC<TransitionProps> = ({
  children,
  isEntering,
  entry = "animate__fadeIn",
  exit = "animate__fadeOut",
  speed = "normal", 
  delay = 0,
  tailwindClass = ""
}) => {
  const [shouldRender, setShouldRender] = useState(isEntering);

  useEffect(() => {
    if (isEntering) {
      const timeout = setTimeout(() => setShouldRender(true), delay);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setShouldRender(false), 500 + delay);
      return () => clearTimeout(timeout);
    }
  }, [isEntering, delay]);

  const speedClass =
    speed === "slow" ? "animate__slow"
    : speed === "fast" ? "animate__fast"
    : speed === "overlay-duration" ? "overlay-duration"
    : "animate__normal";

  return (
    shouldRender && (
      <div
        className={`${tailwindClass} animate__animated ${speedClass} ${isEntering ? entry : exit}`}
        style={{ animationDelay: `${delay}ms` }}
      >
        {children}
      </div>
    )
  );
};

export default Transition;
