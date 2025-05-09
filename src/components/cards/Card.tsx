import type { CardProps } from "./cardTypes";
import './cards.css';

const Card: React.FC<CardProps> = ({ children, className = "", onClick }) => {
  return (
    <div onClick={onClick} className={`rounded relative flex flex-col justify-between h-full card ${className}`}>
      {children}
    </div>
  );
};

export default Card;
