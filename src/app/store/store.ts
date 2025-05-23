import { configureStore } from '@reduxjs/toolkit';
import viewportReducer from './globalSlices/viewportSlice';
import modalReducer from '../../components/modal/modalSlice';
import drawerReducer from '../../components/drawer/drawerSlice';
import notificationReducer from '../../components/notification/notificationSlice';
import socialBarReducer from '../../features/socialBar/socialBarSlice';
import activePageReducer from '../../features/pages/activePageSlice';
import pageReducer from '../../features/pages/pagesSlice';
import loaderReducer from '../../components/circularLoader/circularLoaderSlice';
import navbarReducer from '../../features/navbar/navbarSlice';
import staffReducer from '../../features/staff/staffSlice';
import blogReducer from '../../features/blog/blogSlice';
import adminReducer from '../../features/admin/adminSlice';
import timecardReducer from '../../features/admin/features/timecard/timecardSlice';
import galleryReducer from '../../features/gallery/gallerySlice';

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
    navbar: navbarReducer,
    staff: staffReducer,
    blog: blogReducer,
    gallery: galleryReducer,
    admin: adminReducer,
    timecard: timecardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
