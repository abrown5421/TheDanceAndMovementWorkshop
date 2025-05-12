import React, { useEffect } from 'react';
import Transition from '../transition/Transition';
import { X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { closeNotification, setNotificationOpen } from './notificationSlice';

const Notification: React.FC = () => {
  const dispatch = useAppDispatch();
  const notification = useAppSelector((state) => state.notification);

  useEffect(() => {
    if (notification.notificationOpen) {
      setTimeout(() => {
        handleCloseNotif();
      }, 4000)
    }
  }, [notification.notificationOpen]);

  const handleCloseNotif = () => {
    dispatch(setNotificationOpen(false))
    setTimeout(() => {
      dispatch(closeNotification())
    }, 500)
  }

  return (
    <div className='absolute bottom-4 right-4'>
        <Transition entry="animate__fadeInRight" exit="animate__fadeOutRight" speed="fast" isEntering={notification.notificationOpen}>
            <div className={notification.notificationSeverity === 'error' ? "bg-red-300 border border-red-500 p-2 rounded relative w-lg flex justify-between" : "bg-green-200 border border-green-500 p-2 rounded relative w-lg flex justify-between"}>
              <div className={notification.notificationSeverity === 'error' ? 'text-red-800' : 'text-green-800'}>{notification.notificationMessage}</div>
              <div onClick={() => handleCloseNotif()} className='absolute right-2 cursor-pointer text-black'>
                <X />
              </div>
            </div>
        </Transition>
    </div>
  );
};

export default Notification;