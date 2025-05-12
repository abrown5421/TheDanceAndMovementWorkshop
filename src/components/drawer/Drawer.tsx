import React from 'react';
import { useAppSelector, useAppDispatch } from '../../app/store/hooks';
import { setDrawerState } from './drawerSlice';
import type { DrawerProps } from './drawerTypes';
import Transition from '../transition/Transition';
import { clsx } from "clsx";
import { X } from 'lucide-react';
import './drawer.css';
import Button from '../button/Button';
import { deauthenticate } from '../../services/auth/authenticate';
import { setAuthMode } from '../../features/auth/authSlice';
import Cookies from 'js-cookie';

const Drawer: React.FC<DrawerProps> = ({ children }) => {
  const drawer = useAppSelector((state) => state.drawer);
  const dashboard = useAppSelector((state) => state.dashboard);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setDrawerState({ key: 'drawerOpen', value: false }));
  };

  const handleLogout = () => {
    dispatch(setDrawerState({ key: 'drawerOpen', value: false }));
    deauthenticate();
    Cookies.remove('authentication')
    dispatch(setAuthMode(true))
  }

  return (
    <>
      <Transition isEntering={drawer.drawerOpen} tailwindClass="relative z-40" speed="overlay-duration">
        <div
          className="fixed inset-0 w-screen h-screen bg-black/80 z-50"
          onClick={handleClose} 
        />
      </Transition>
      <Transition 
          tailwindClass={clsx(
            'absolute z-50 bg-white p-3',
            (drawer.drawerPosition === 'right' && "right-0 top-0 bottom-0"),                 
            (drawer.drawerPosition === 'left' && "left-0 top-0 bottom-0"),                 
            (drawer.drawerPosition === 'top' && "top-0"),                 
            (drawer.drawerPosition === 'bottom' && "bottom-0")                 
          )}
          entry={
            drawer.drawerPosition === 'right' ? "animate__slideInRight" : 
            drawer.drawerPosition === 'left' ? "animate__slideInLeft" : 
            drawer.drawerPosition === 'top' ? "animate__slideInDown" : "animate__slideInUp"
          }
          exit={
            drawer.drawerPosition === 'right' ? "animate__slideOutRight" : 
            drawer.drawerPosition === 'left' ? "animate__slideOutLeft" : 
            drawer.drawerPosition === 'top' ? "animate__slideOutDown" : "animate__slideOutDown"
          }
          isEntering={drawer.drawerOpen}
      >
          <div className='relative' style={{width: drawer.drawerWidth, height: drawer.drawerHeight}}>
              <div className='flex flex-row mb-5 pb-5 drawer-title'>
                <div className='flex flex-col flex-10/12 font-primary text-xl'>
                  {drawer.drawerTitle}
                </div>
                <div className='flex flex-col flex-2/12 items-end justify-center' onClick={handleClose}>
                  <X />
                </div>
              </div>
              {children}
              {dashboard.dashboardMode && (<div className='absolute bottom-5 w-full pt-3 logout-area'>
                <Button
                  text="Logout"
                  onClick={handleLogout}
                  bgColor="bg-primary"
                  textColor="text-white"
                  className='w-full'
                />
              </div>)}
          </div>

      </Transition>
    </>
  );
};

export default Drawer;
