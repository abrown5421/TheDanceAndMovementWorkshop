import type { CardSectionProps } from "./cardTypes";

const CardFooter: React.FC<CardSectionProps> = ({ children, className = "" }) => {
  return (
    <div className={`p-4 mt-auto card-footer ${className}`}>
      {children}
    </div>
  );
};

export default CardFooter;
