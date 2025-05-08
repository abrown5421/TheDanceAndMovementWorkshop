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
    setEntireActivePageState(_, action: PayloadAction<ActivePageState>) {
        return action.payload;
    },
  },
});

export const { setActivePage, setEntireActivePageState } = activePageSlice.actions;
export default activePageSlice.reducer;

