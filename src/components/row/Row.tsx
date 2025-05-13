import React from 'react';
import type { RowProps } from './rowTypes';

const Row: React.FC<RowProps> = ({ children, tailwindClasses = '' }) => {
  return (
    <div className={`flex flex-row ${tailwindClasses}`}>
      {children}
    </div>
  );
};

export default Row;
