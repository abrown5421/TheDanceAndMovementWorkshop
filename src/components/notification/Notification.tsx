import React, { useEffect } from 'react';
import Transition from '../transition/Transition';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { closeNotification, setNotificationOpen } from './notificationSlice';

const Notification: React.FC = () => {
  const dispatch = useAppDispatch();
  const notification = useAppSelector((state) => state.notification);

  useEffect(() => {
    const timer = setTimeout(() => {
        handleCloseNotif()
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseNotif = () => {
    dispatch(setNotificationOpen(false))
    setTimeout(() => {
        closeNotification()
    }, 500)
  }

  return (
    <div className='absolute bottom-4 right-4'>
        <Transition entry="animate__fadeInRight" exit="animate__fadeOutRight" speed="fast" isEntering={notification.notificationOpen}>
            <div className={notification.notificationSeverity === 'error' ? "bg-red-300 border border-red-500 p-2 rounded relative min-w-80" : "bg-green-200 border border-green-500 p-2 rounded relative min-w-80"}>
                <div onClick={() => handleCloseNotif()} className='absolute right-2'>X</div>
                <div className={notification.notificationSeverity === 'error' ? 'text-red-800' : 'text-green-800'}>{notification.notificationMessage}</div>
            </div>
        </Transition>
    </div>
  );
};

export default Notification;