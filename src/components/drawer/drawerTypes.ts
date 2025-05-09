import type { ReactNode } from "react";

export interface DrawerState {
    drawerOpen: boolean;
    drawerWidth: string;
    drawerTitle?: string;
    drawerHeight: string;
    drawerPosition: string;
}
export interface DrawerProps {
    children: ReactNode;
}