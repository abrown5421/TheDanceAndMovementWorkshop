import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { BlogSliceConfig, BlogState } from "./blogTypes";

const initialState: BlogSliceConfig = {
  blog: [],
};

const pageSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlog: (state, action: PayloadAction<BlogState[]>) => {
      state.blog = action.payload;
    },
  },
});

export const { setBlog } = pageSlice.actions;
export default pageSlice.reducer;
