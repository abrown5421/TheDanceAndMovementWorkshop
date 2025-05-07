import type { ReactNode } from 'react';
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ModalState } from "./modalTypes";

const initialState: ModalState = {
  modalOpen: false,
  modalTitle: '',
  modalContent: null,
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
    setModalContent(state, action: PayloadAction<ReactNode>) {
      state.modalContent = action.payload;
    },
    setEntireModal(_, action: PayloadAction<ModalState>) {
      return action.payload;
    },
    closeAndClearModal(state) {
      state.modalOpen = false;
      state.modalTitle = '';
      state.modalContent = null;
    },
  },
});

export const {
    setModalOpen,
    setModalTitle,
    setModalContent,
    setEntireModal,
    closeAndClearModal,
} = modalSlice.actions;

export default modalSlice.reducer;
