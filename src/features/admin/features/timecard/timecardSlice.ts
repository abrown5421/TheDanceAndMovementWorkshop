import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Locale, Timecard } from './timecardTypes';

const initialState: Timecard = {
  UserID: '',
  TimecardInfo: {
    ClockIn: '',
    ClockOut: '',
    Duration: 0,
    Rate: 0,
    IPAddress: '',
    Location: {
      Lat: 0,
      Lng: 0
    }
  },
  Active: false,
  Complete: false
};

const timecardSlice = createSlice({
  name: 'timecard',
  initialState,
  reducers: {
    setUserID(state, action: PayloadAction<string>) {
      state.UserID = action.payload;
    },
    setClockIn(state, action: PayloadAction<string>) {
      state.TimecardInfo.ClockIn = action.payload;
    },
    setClockOut(state, action: PayloadAction<string>) {
      state.TimecardInfo.ClockOut = action.payload;
    },
    setDuration(state, action: PayloadAction<number>) {
      state.TimecardInfo.Duration = action.payload;
    },
    setRate(state, action: PayloadAction<number>) {
      state.TimecardInfo.Rate = action.payload;
    },
    setIPAddress(state, action: PayloadAction<string>) {
      state.TimecardInfo.IPAddress = action.payload;
    },
    setLocation(state, action: PayloadAction<Locale>) {
      state.TimecardInfo.Location = action.payload;
    },
    setActive(state, action: PayloadAction<boolean>) {
      state.Active = action.payload;
    },
    setComplete(state, action: PayloadAction<boolean>) {
      state.Complete = action.payload;
    },
    resetTimecard(state) {
      Object.assign(state, initialState);
    }
  }
});

export const {
  setUserID,
  setClockIn,
  setClockOut,
  setDuration,
  setRate,
  setIPAddress,
  setLocation,
  setActive,
  setComplete,
  resetTimecard
} = timecardSlice.actions;

export default timecardSlice.reducer;
