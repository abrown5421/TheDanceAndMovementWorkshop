import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { setAdminAuth, setAdminMode, setAdminUser, setAdminUserStaffDoc } from './adminSlice';
import Transition from '../../components/transition/Transition';
import AdminAuth from './AdminAuth';
import AdminDash from './AdminDash';
import './admin-page.css';
import Cookies from 'js-cookie';
import type { AdminUser, AdminUserStaffDoc } from './adminTypes';
import { getDocumentById } from '../../services/db/getData';
import { useAdminNavigationHook } from '../../hooks/AdminNavigationHook';

 const AdminPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const handleAdminNavigation = useAdminNavigationHook();
    const admin = useAppSelector((state) => state.admin)
    const AdminUserPersist = Cookies.get('authentication');

    useEffect(()=>{
        dispatch(setAdminMode(true));
        const fetchData = async () => {
        if (AdminUserPersist !== null && AdminUserPersist !== undefined) {
        try {
            const userDoc = await getDocumentById("Users", AdminUserPersist);
            const staffDoc = await getDocumentById("Staff", AdminUserPersist);

            if (userDoc) {
            dispatch(setAdminUser(userDoc as AdminUser));
            } else {
                console.warn(`No user document found for UID: ${AdminUserPersist}`);
            }

            if (staffDoc) {
            dispatch(setAdminUserStaffDoc(staffDoc as AdminUserStaffDoc));
            } else {
                console.warn(`No staff document found for UID: ${AdminUserPersist}`);
            }

            dispatch(setAdminAuth(true));
            handleAdminNavigation('Dash');
        } catch (error) {
            console.error("Error fetching documents:", error);
        }
        }
    };

    fetchData();
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
