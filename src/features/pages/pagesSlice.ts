import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { PagesState, PagesSliceState } from "./pagesTypes";

const initialState: PagesSliceState = {
  pages: [],
};

const pageSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    setPages: (state, action: PayloadAction<PagesState[]>) => {
      state.pages = action.payload;
    },
  },
});

export const { setPages } = pageSlice.actions;
export default pageSlice.reducer;
