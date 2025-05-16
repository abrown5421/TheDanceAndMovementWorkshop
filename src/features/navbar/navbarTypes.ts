export interface LinkNavConfig {
  [key: string]: any; 
}

export interface NavbarState {
  id: string; // Firestore document ID
  LinkName: string;
  LinkNavConfig: LinkNavConfig;
  Order: number;
  Show: boolean;
  LinkURL: string;
}
