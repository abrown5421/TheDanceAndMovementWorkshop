import React from 'react';
import { clsx } from "clsx";
import type { IconButtonProps } from './iconButtonTypes';

const IconButton: React.FC<IconButtonProps> = ({
  ariaLabel,
  children,
  color,
  ...props
}) => {
  return (
    <button
      aria-label={ariaLabel}
      className={clsx(
              "inline-flex cursor-pointer items-center justify-center p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition",
              color ? color : ""
            )}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
