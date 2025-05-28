import React from 'react';
import type { BlockProps } from './blockTypes';
import { useAppSelector } from '../../app/store/hooks';
import clsx from 'clsx';

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
  const admin = useAppSelector((state) => state.admin.adminMode);

  const dataProps = Object.keys(rest).reduce<Record<string, any>>((acc, key) => {
    if (key.startsWith('data-')) {
      acc[key] = (rest as any)[key];
    }
    return acc;
  }, {});

  const adminHoverClass = admin ? 'border-2 border-transparent hover:border-primary cursor-pointer' : '';

  return (
    <Component
      as={as}
      id={id}
      name={name}
      onClick={onClick}
      className={clsx(adminHoverClass, tailwindClasses)}
      {...rest}
      {...dataProps}
    >
      {children}
    </Component>
  );
};

export default Block;
