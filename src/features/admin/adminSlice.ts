import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AdminSliceConfig } from "./adminTypes";

const initialState: AdminSliceConfig = {
  adminMode: false,
};

const pageSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<AdminSliceConfig>) => {
      state.adminMode = action.payload.adminMode;
    },
  },
});

export const { setAdmin } = pageSlice.actions;
export default pageSlice.reducer;
