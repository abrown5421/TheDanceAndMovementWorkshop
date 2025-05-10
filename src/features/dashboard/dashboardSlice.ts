import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { DashboardState } from "./dashboardTypes";

const initialState: DashboardState = {
    dashboardMode: false
};

const modalSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardMode: (state, action: PayloadAction<boolean>) => {
      state.dashboardMode = action.payload;
    },
  },
});

export const { setDashboardMode } = modalSlice.actions;

export default modalSlice.reducer;
