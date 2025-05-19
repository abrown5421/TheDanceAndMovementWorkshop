export interface BlogSliceConfig {
  [key: string]: any; 
}

export interface BlogState {
  id: string; 
  BlogPostAuthor: string; 
  BlogPostBanner: string; 
  BlogPostCategory: string; 
  BlogPostContent: string;
  BlogPostDate: string;
  BlogPostTitle: string;
}