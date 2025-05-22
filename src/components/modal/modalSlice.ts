import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ModalState } from "./modalTypes";

const initialState: ModalState = {
  modalOpen: false,
  modalTitle: '',
  modalContent: '',
  modalImageUrl: '',
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalOpen(state, action: PayloadAction<boolean>) {
      state.modalOpen = action.payload;
    },
    setModalTitle(state, action: PayloadAction<string>) {
      state.modalTitle = action.payload;
    },
    setModalContent(state, action: PayloadAction<string>) {
      state.modalContent = action.payload;
    },
    setModalImageUrl(state, action: PayloadAction<string>) {
      state.modalImageUrl = action.payload;
    },
    setEntireModal(_, action: PayloadAction<ModalState>) {
      return action.payload;
    },
    closeAndClearModal(state) {
      state.modalOpen = false;
      state.modalTitle = '';
      state.modalContent = '';
      state.modalImageUrl = '';
    },
  },
});

export const {
    setModalOpen,
    setModalTitle,
    setModalContent,
    setModalImageUrl,
    setEntireModal,
    closeAndClearModal,
} = modalSlice.actions;

export default modalSlice.reducer;
