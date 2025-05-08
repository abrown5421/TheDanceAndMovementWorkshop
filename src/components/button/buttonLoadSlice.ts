import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { ButtonLoadState } from './buttonTypes';

const initialState: ButtonLoadState = {
    buttonLoad: false,
    buttonIdentify: ''
};

const searchParamsSlice = createSlice({
  name: 'buttonLoad',
  initialState,
  reducers: {
    setButtonLoad: (state, action: PayloadAction<boolean>) => {
      state.buttonLoad = action.payload;
    },
    setButtonIdentify: (state, action: PayloadAction<string>) => {
      state.buttonIdentify = action.payload;
    },
    setEntireButtonLoadState(_, action: PayloadAction<ButtonLoadState>) {
        return action.payload;
    },
    unsetButtonLoadState: (state) => {
      state.buttonLoad = false;
      state.buttonIdentify = '';
    },
  },
});

export const { setEntireButtonLoadState, unsetButtonLoadState } = searchParamsSlice.actions;

export default searchParamsSlice.reducer;