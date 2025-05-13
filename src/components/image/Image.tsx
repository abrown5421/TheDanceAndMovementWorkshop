import React from 'react';
import type { ImageProps } from './imageTypes';

const Image: React.FC<ImageProps> = ({ src, alt, tailwindClasses = '' }) => {
  return (
    <img src={src} alt={alt} className={`${tailwindClasses}`} />
  );
};

export default Image;
