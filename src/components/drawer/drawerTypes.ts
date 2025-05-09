import type { ReactNode } from "react";

export interface DrawerState {
    drawerOpen: boolean;
    drawerWidth: string;
    drawerTitle?: string;
    drawerHeight: string;
    drawerX: string[] | string;
    drawerY: string[] | string;
}
export interface DrawerProps {
    children: ReactNode;
}