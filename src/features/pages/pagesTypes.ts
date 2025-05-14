export interface PagesState {
  PageName: string;
  PageSlug: string;
  PageContent: string;
  PageNavConfig: {
    Order: number;
    Show: boolean;
  };
}
