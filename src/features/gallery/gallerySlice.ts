import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { GallerySliceConfig, GalleryState } from "./galleryTypes";

const initialState: GallerySliceConfig = {
  gallery: [],
};

const pageSlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    setGallery: (state, action: PayloadAction<GalleryState[]>) => {
      state.gallery = action.payload;
    },
    addToGallery: (state, action: PayloadAction<GalleryState>) => {
      state.gallery.push(action.payload);
    },
    removeFromGallery: (state, action: PayloadAction<string>) => {
      state.gallery = state.gallery.filter(
        (item: GalleryState) => item.id !== action.payload
      );
    },
  },
});

export const { setGallery, addToGallery, removeFromGallery } = pageSlice.actions;
export default pageSlice.reducer;
