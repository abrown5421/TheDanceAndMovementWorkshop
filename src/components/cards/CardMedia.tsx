import type { CardMediaProps } from './cardTypes';
import placeholder from '../../../public/assets/images/placeholder.jpg';

const CardMedia: React.FC<CardMediaProps> = ({ image, children, className = "" }) => {
  return (
    <div className={`relative h-50 overflow-hidden flex items-center justify-center ${className}`}>
      <img
        src={image || placeholder}
        alt="Card Media"
        className="object-cover w-full h-full"
      />
      {children}
    </div>
  );
};

export default CardMedia;
