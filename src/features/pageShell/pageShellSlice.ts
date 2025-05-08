import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { ActivePageState } from "./pageShellTypes";

const initialState: ActivePageState = {
  activePageName: "Home",
  activePageIn: true,
};

const activePageSlice = createSlice({
  name: "activePage",
  initialState,
  reducers: {
    setActivePage: <K extends keyof ActivePageState>(
      state: ActivePageState,
      action: PayloadAction<{ key: K; value: ActivePageState[K] }>
    ) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});

export const { setActivePage } = activePageSlice.actions;
export default activePageSlice.reducer;

