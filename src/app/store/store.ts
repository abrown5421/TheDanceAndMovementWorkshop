import { configureStore } from '@reduxjs/toolkit';
import viewportReducer from './globalSlices/viewportSlice';
import modalReducer from '../../components/modal/modalSlice';
import drawerReducer from '../../components/drawer/drawerSlice';
import notificationReducer from '../../components/notification/notificationSlice';
import socialBarReducer from '../../features/socialBar/socialBarSlice';
import activePageReducer from '../../features/activePage/activePageSlice';
import pageReducer from '../../features/pages/pagesSlice';
import loaderReducer from '../../components/circularLoader/circularLoaderSlice';

export const store = configureStore({
  reducer: {
    viewport: viewportReducer,
    modal: modalReducer,
    drawer: drawerReducer,
    notification: notificationReducer,
    socialBar: socialBarReducer,
    activePage: activePageReducer,    
    pages: pageReducer,
    loader: loaderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
