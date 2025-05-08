import { configureStore } from '@reduxjs/toolkit';
import viewportReducer from './globalSlices/viewportSlice';
import modalReducer from '../../components/modal/modalSlice';
import notificationReducer from '../../components/notification/notificationSlice';
import buttonLoadReducer from '../../components/button/buttonLoadSlice';

export const store = configureStore({
  reducer: {
    viewport: viewportReducer,
    modal: modalReducer,
    notification: notificationReducer,
    buttonLoad: buttonLoadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
