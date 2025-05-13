import React from 'react';
import type { TextProps } from './textTypes';

const Text: React.FC<TextProps> = ({ children, tailwindClasses = '' }) => {
  return (
    <div className={`${tailwindClasses}`}>
      {children}
    </div>
  );
};

export default Text;
