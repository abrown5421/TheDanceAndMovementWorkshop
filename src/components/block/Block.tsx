import React from 'react';
import type { BlockProps } from './blockTypes';

const Block = <T extends React.ElementType = 'div'>({
  as,
  tailwindClasses = '',
  children,
  onClick,
  id,
  name,
  ...rest
}: BlockProps<T>) => {
  const Component = as || 'div';

  const dataProps = Object.keys(rest).reduce<Record<string, any>>((acc, key) => {
    if (key.startsWith('data-')) {
      acc[key] = (rest as any)[key];
    }
    return acc;
  }, {});

  return (
    <Component
      as={as}
      id={id}
      name={name}
      onClick={onClick}
      className={tailwindClasses}
      {...rest}
      {...dataProps}
    >
      {children}
    </Component>
  );
};

export default Block;
