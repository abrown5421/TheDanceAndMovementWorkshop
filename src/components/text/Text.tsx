import React from 'react';
import type { TextProps } from './textTypes';

const Text: React.FC<TextProps> = ({ children, tailwindClasses = '' }) => {
  const renderWithAmpersandHighlight = (text: string) => {
    const parts = text.split(/(&)/); 
    return parts.map((part, index) =>
      part === '&' ? (
        <span key={index} className="text-primary">
          {part}
        </span>
      ) : (
        <React.Fragment key={index}>{part}</React.Fragment>
      )
    );
  };

  return (
    <div className={`${tailwindClasses}`}>
      {typeof children === 'string' ? renderWithAmpersandHighlight(children) : children}
    </div>
  );
};

export default Text;
