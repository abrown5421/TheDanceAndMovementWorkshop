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

  const speedClass = speed === "slow" ? "animate__slow" : speed === "fast" ? "animate__fast" : speed === "modal-duration" ? "modal-duration" : "animate__normal";
  
  return (
    shouldRender && (
      <div
        className={`animate__animated ${speedClass} ${
          isEntering ? entry : exit
        }`}
      >
        {children}
      </div>
    )
  );
};

export default Transition;
