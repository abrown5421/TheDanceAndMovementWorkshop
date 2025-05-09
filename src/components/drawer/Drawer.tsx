import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/store/hooks';
import { setDrawerState } from './drawerSlice';
import type { DrawerProps } from './drawerTypes';
import Transition from '../transition/Transition';
import { clsx } from "clsx";

const Drawer: React.FC<DrawerProps> = ({ children }) => {
  const drawer = useAppSelector((state) => state.drawer);

  useEffect(()=>{console.log(drawer.drawerX.length)}, [drawer])

  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(setDrawerState({ key: 'drawerOpen', value: false }));
  };

  return (
    <>
      <Transition isEntering={drawer.drawerOpen} speed="overlay-duration">
        <div
          className="fixed inset-0 w-screen h-screen bg-black/80 z-40"
          onClick={handleClose} 
        />
      </Transition>
      <Transition 
          tailwindClass={clsx(
            'absolute z-50 bg-white',
            !Array.isArray(drawer.drawerX) && (drawer.drawerX === 'right' ? "right-0 top-0" : "left-0 top-0"),                 
            !Array.isArray(drawer.drawerY) && (drawer.drawerY === 'top' ? "top-0" : "bottom-0")                 
          )}
          entry={
            Array.isArray(drawer.drawerX)
              ? (drawer.drawerY === 'top' ? "animate__slideInDown" : "animate__slideInUp")
              : (drawer.drawerX === 'right' ? "animate__slideInRight" : "animate__slideInLeft")
          }
          exit={
            Array.isArray(drawer.drawerX)
              ? (drawer.drawerY === 'top' ? "animate__slideOutUp" : "animate__slideOutDown")
              : (drawer.drawerX === 'right' ? "animate__slideOutRight" : "animate__slideOutLeft")
          }
          isEntering={drawer.drawerOpen}
      >
          <div style={{width: drawer.drawerWidth, height: drawer.drawerHeight}}>
              {children}
          </div>
      </Transition>
    </>
  );
};

export default Drawer;
