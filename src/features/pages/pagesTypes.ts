export interface PagesState {
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