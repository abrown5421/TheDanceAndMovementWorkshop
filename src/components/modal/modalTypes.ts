import type { ReactNode } from 'react';

export interface ModalState {
    modalOpen: boolean;
    modalTitle: string;
    modalContent: ReactNode;
}