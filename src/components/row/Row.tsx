import React from 'react';
import type { RowProps } from './rowTypes';

const Row: React.FC<RowProps> = ({ children, breakpoint, tailwindClasses = '' }) => {
  return (
    <div className={`${breakpoint ? 'flex flex-col ' + breakpoint + ':flex-row' : 'flex flex-row'} ${tailwindClasses}`}>
      {children}
    </div>
  );
};

export default Row;
