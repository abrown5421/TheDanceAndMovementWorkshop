export interface ModalState {
  modalOpen: boolean;
  modalTitle: string;
  modalContent: string;
  modalImageUrl?: string;
  modalCallback?: () => void;
}

export interface ConfirmOrDenyModalProps {
  onConfirm: () => void;
  onCancel?: () => void;
}