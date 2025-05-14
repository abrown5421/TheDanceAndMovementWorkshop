import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { CircularLoaderState } from './circularLoaderTypes';

const initialState: CircularLoaderState = {
    loaderLoad: true,
    loaderIdentify: 'pageShell'
};

const searchParamsSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoaderLoad: (state, action: PayloadAction<boolean>) => {
      state.loaderLoad = action.payload;
    },
    setLoaderIdentify: (state, action: PayloadAction<string>) => {
      state.loaderIdentify = action.payload;
    },
    setEntireLoaderLoadState(_, action: PayloadAction<CircularLoaderState>) {
        return action.payload;
    },
    unsetLoaderLoadState: (state) => {
      state.loaderLoad = false;
      state.loaderIdentify = '';
    },
  },
});

export const { setEntireLoaderLoadState, unsetLoaderLoadState } = searchParamsSlice.actions;

export default searchParamsSlice.reducer;