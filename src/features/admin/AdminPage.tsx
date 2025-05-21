import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { setAdminMode } from './adminSlice';
import Transition from '../../components/transition/Transition';
import AdminAuth from './AdminAuth';
import AdminDash from './AdminDash';
import './admin-page.css';

 const AdminPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const admin = useAppSelector((state) => state.admin)

    useEffect(()=>{
        dispatch(setAdminMode(true));
    }, [])
    
    return (
        <div className='admin-shell'>
            <Transition 
                entry={admin.AdminPageState.activePageName === 'Auth' ? "animate__fadeInUp" : "animate__fadeIn"} 
                exit={admin.AdminPageState.activePageName === 'Auth' ? "animate__fadeOutDown" : "animate__fadeOut"}
                speed="fast" 
                isEntering={admin.AdminPageState.activePageIn} 
                tailwindClass='h-full flex flex-col justify-center items-center'
            >
                {admin.AdminPageState.activePageName === 'Auth' && (<AdminAuth />)}
                {admin.AdminPageState.activePageName === 'Dash' && (<AdminDash />)}
            </Transition>
        </div>
    );
 };
 export default AdminPage;
