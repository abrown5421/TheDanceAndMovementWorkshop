import type { CardSectionProps } from "./cardTypes";

const CardBody: React.FC<CardSectionProps> = ({ children, className = "" }) => {
  return (
    <div className={`flex-grow p-4 ${className}`}>
      {children}
    </div>
  );
};

export default CardBody;
