export interface PagesSliceState {
  pages: PagesState[];
}

export interface PagesState {
  PageActive: boolean;
  PageID: string;
  PageName: string;
  PageSlug: string;
  PageContent: PageNode;
  PageNavConfig: {
    Order: number;
    Show: boolean;
  };
}

export type PageNode = {
  type: string;
  props?: any;
  children?: PageNode[] | string;
};

export interface PageRendererProps {
  node: PageNode;
}

export interface ExtendedPageRendererProps extends PageRendererProps {
  functionMap?: Record<string, (...args: any[]) => any>;
}

export type FunctionDescriptor = {
  type: 'function';
  name: string;
  args?: any[];
};
