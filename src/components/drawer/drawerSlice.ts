import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { DrawerState } from "./drawerTypes";

const initialState: DrawerState = {
  drawerOpen: false,
  drawerTitle: '',
  drawerWidth: '325px',
  drawerHeight: 'calc(100vh - 24px)',
  drawerPosition: 'right',
};

const modalSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    setDrawerState<T extends keyof DrawerState>(
      state: DrawerState,
      action: PayloadAction<{ key: T; value: DrawerState[T] }>
    ) {
      state[action.payload.key] = action.payload.value;
    },
    setEntireDrawer(_, action: PayloadAction<DrawerState>) {
      return action.payload;
    },
    closeAndClearDrawer() {
      return initialState;
    },
  },
});

export const { setDrawerState, setEntireDrawer, closeAndClearDrawer } = modalSlice.actions;

export default modalSlice.reducer;
