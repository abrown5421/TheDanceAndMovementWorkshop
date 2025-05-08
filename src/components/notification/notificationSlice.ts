import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { NotificationState } from './notificationTypes';

const initialState: NotificationState = {
    notificationOpen: false,
    notificationSeverity: '',
    notificationMessage: '',
};

const searchParamsSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationOpen: (state, action: PayloadAction<boolean>) => {
      state.notificationOpen = action.payload;
    },
    setNotificationSeverity: (state, action: PayloadAction<string>) => {
      state.notificationSeverity = action.payload;
    },
    setNotificationMessage: (state, action: PayloadAction<string>) => {
      state.notificationMessage = action.payload;
    },
    setEntireNotification(_, action: PayloadAction<NotificationState>) {
        return action.payload;
    },
    closeNotification: (state) => {
      state.notificationOpen = false;
      state.notificationSeverity = '';
      state.notificationMessage = '';
    },
  },
});

export const { setNotificationOpen, setNotificationSeverity, setNotificationMessage, setEntireNotification, closeNotification } = searchParamsSlice.actions;

export default searchParamsSlice.reducer;