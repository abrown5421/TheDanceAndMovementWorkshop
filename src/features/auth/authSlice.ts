import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AuthState, UserState } from "./authTypes";

const initialState: AuthState = {
  authMode: true,
  user: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthMode: (state, action: PayloadAction<boolean>) => {
      state.authMode = action.payload;
    },
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload;
    },
  },
});

export const { setAuthMode, setUser } = authSlice.actions;

export default authSlice.reducer;
