export type ValidSlugs = 'Blog' | 'Calendar' | 'Events' | 'Contact' | 'Gallery' | 'blog' | 'calendar' | 'events' | 'contact' | 'gallery';

export interface ActivePageState {
    activePageName: string;
    activePageIn: boolean;
}