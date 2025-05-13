import React from 'react';
import type { ColumnProps } from './columnTypes';

const Column: React.FC<ColumnProps> = ({ children, tailwindClasses = '' }) => {
  return (
    <div className={`flex flex-col ${tailwindClasses}`}>
        {children}
    </div>
  );
};

export default Column;
