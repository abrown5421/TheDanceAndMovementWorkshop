import React from 'react';
import { componentsMap } from './pageComponentMap';
import type { ExtendedPageRendererProps, FunctionDescriptor } from './pagesTypes';

const PageRenderer: React.FC<ExtendedPageRendererProps> = ({ node, functionMap = {} }) => {
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
      <PageRenderer key={index} node={child} functionMap={functionMap} />
    ));
  }
  
  function isFunctionDescriptor(value: any): value is FunctionDescriptor {
    return (
      typeof value === 'object' &&
      value !== null &&
      value.type === 'function' &&
      typeof value.name === 'string'
    );
  }

  const props = { ...node.props };

  for (const [key, value] of Object.entries(props)) {
  if (isFunctionDescriptor(value)) {
    const actualFunc = functionMap[value.name];
    if (actualFunc) {
      props[key] = actualFunc(...(value.args || []));
    } else {
      console.warn(`Function "${value.name}" not found in functionMap.`);
    }
  }
}

  if (typeof node.props?.children === 'string') {
    children = node.props.children;
  }

  return <Component {...props}>{children}</Component>;
};

export default PageRenderer;
