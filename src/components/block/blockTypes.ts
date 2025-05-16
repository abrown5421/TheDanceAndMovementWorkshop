export type BlockProps<T extends React.ElementType = 'div'> = {
  as?: T;
  tailwindClasses?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler;
  id?: string;
  name?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, 'className' | 'children' | 'onClick'>;