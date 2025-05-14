import React from 'react';
import { componentsMap } from './pageComponentMap';

type PageNode = {
  type: string;
  props?: any;
  children?: PageNode[] | string;
};

interface PageRendererProps {
  node: PageNode;
}

const PageRenderer: React.FC<PageRendererProps> = ({ node }) => {
  const Component = componentsMap[node.type];

  if (!Component) {
    console.warn(`Component type "${node.type}" not found.`);
    return null;
  }

  let children = null;

  if (typeof node.children === 'string') {
    children = node.children;
  } else if (Array.isArray(node.children)) {
    children = node.children.map((child, index) => (
      <PageRenderer key={index} node={child} />
    ));
  }

  if (node.props && typeof node.props.children === 'string') {
    children = node.props.children;
  }

  return <Component {...node.props}>{children}</Component>;
};

export default PageRenderer;
