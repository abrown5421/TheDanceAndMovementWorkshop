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
  tailwindClass = ""
}) => {
  const [shouldRender, setShouldRender] = useState(isEntering);

  useEffect(() => {
    if (isEntering) {
      setShouldRender(true);
    } else {
      const timeout = setTimeout(() => setShouldRender(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [isEntering]);

  const speedClass = speed === "slow" ? "animate__slow" : speed === "fast" ? "animate__fast" : speed === "overlay-duration" ? "overlay-duration" : "animate__normal";
  
  return (
    shouldRender && (
      <div
        className={`${tailwindClass} animate__animated ${speedClass} ${
          isEntering ? entry : exit
        }`}
      >
        {children}
      </div>
    )
  );
};

export default Transition;
