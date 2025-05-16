import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { NavbarState } from "./navbarTypes";

interface NavbarSliceState {
  links: NavbarState[];
}

const initialState: NavbarSliceState = {
  links: [],
};

const pageSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setNavbar: (state, action: PayloadAction<NavbarState[]>) => {
      state.links = action.payload;
    },
  },
});

export const { setNavbar } = pageSlice.actions;
export default pageSlice.reducer;
