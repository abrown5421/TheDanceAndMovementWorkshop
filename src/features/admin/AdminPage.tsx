import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { setAdminMode } from './adminSlice';
import Transition from '../../components/transition/Transition';
import AdminAuth from './AdminAuth';
import AdminDash from './AdminDash';
 
 const AdminPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const admin = useAppSelector((state) => state.admin)

    useEffect(()=>{
        dispatch(setAdminMode(true));
    }, [])
    
    return (
         <Transition entry="animate__fadeInUp" exit="animate__fadeOutDown" speed="fast" isEntering={admin.AdminPageState.activePageIn}>
           {admin.AdminPageState.activePageName === 'Auth' && (<AdminAuth />)}
           {admin.AdminPageState.activePageName === 'Dash' && (<AdminDash />)}
         </Transition>
    );
 };
 export default AdminPage;
