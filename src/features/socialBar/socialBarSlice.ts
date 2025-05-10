import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SocialMedia, Social } from "./socialBarTypes";

const initialState: SocialMedia = {
  socials: [],
  iconColor: "primary",
};

const socialBarSlice = createSlice({
  name: "socialBar",
  initialState,
  reducers: {
    setSocialBarIconColor(state, action: PayloadAction<string>) {
      state.iconColor = action.payload;
    },
    addSocialBarSocial(state, action: PayloadAction<Social>) {
      state.socials.push(action.payload);
    },
    removeSocialBarSocial(state, action: PayloadAction<string>) {
      state.socials = state.socials.filter(
        (social) => social.socialName !== action.payload
      );
    },
    setSocialBar: (state, action: PayloadAction<SocialMedia>) => {
      return { ...state, ...action.payload };
    }
  },
});

export const { setSocialBarIconColor, addSocialBarSocial, removeSocialBarSocial, setSocialBar } =
  socialBarSlice.actions;

export default socialBarSlice.reducer;
