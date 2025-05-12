import { configureStore } from '@reduxjs/toolkit';
import viewportReducer from './globalSlices/viewportSlice';
import modalReducer from '../../components/modal/modalSlice';
import drawerReducer from '../../components/drawer/drawerSlice';
import notificationReducer from '../../components/notification/notificationSlice';
import buttonLoadReducer from '../../components/button/buttonLoadSlice';
import activePageReducer from '../../features/pageShell/pageShellSlice';
import dashboardReducer from '../../features/dashboard/dashboardSlice';
import socialBarReducer from '../../features/socialBar/socialBarSlice';
import authReducer from '../../features/auth/authSlice';

export const store = configureStore({
  reducer: {
    viewport: viewportReducer,
    modal: modalReducer,
    drawer: drawerReducer,
    notification: notificationReducer,
    buttonLoad: buttonLoadReducer,
    activePage: activePageReducer,
    dashboard: dashboardReducer,
    socialBar: socialBarReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
