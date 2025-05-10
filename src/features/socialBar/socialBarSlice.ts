import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SocialMedia, Social } from "./socialTypes";

const initialState: SocialMedia = {
  socials: [],
  iconColor: "primary",
};

const socialBarSlice = createSlice({
  name: "socialBar",
  initialState,
  reducers: {
    setIconColor(state, action: PayloadAction<string>) {
      state.iconColor = action.payload;
    },
    addSocial(state, action: PayloadAction<Social>) {
      state.socials.push(action.payload);
    },
    removeSocial(state, action: PayloadAction<string>) {
      state.socials = state.socials.filter(
        (social) => social.socialName !== action.payload
      );
    },
    updateSocial(state, action: PayloadAction<Social>) {
      const index = state.socials.findIndex(
        (s) => s.socialName === action.payload.socialName
      );
      if (index !== -1) {
        state.socials[index] = action.payload;
      }
    },
  },
});

export const { setIconColor, addSocial, removeSocial, updateSocial } =
  socialBarSlice.actions;

export default socialBarSlice.reducer;
