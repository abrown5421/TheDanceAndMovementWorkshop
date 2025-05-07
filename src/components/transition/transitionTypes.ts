export interface TransitionProps {
    children: React.ReactNode;
    isEntering: boolean;
    entry?: string;
    exit?: string;
    speed?: string; 
}