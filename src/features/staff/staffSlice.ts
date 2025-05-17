import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { StaffSliceConfig, StaffState } from "./staffTypes";

const initialState: StaffSliceConfig = {
  staff: [],
};

const pageSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    setStaff: (state, action: PayloadAction<StaffState[]>) => {
      state.staff = action.payload;
    },
  },
});

export const { setStaff } = pageSlice.actions;
export default pageSlice.reducer;
