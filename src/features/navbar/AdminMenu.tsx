import React from 'react';
import Block from '../../components/block/Block';
import Cookies from 'js-cookie';
import { deauthenticate } from '../../services/auth/authenticate';
import { useAppDispatch } from '../../app/store/hooks';
import { setDrawerState } from '../../components/drawer/drawerSlice';
import { initializeAdmin } from '../admin/adminSlice';
import { useNavigationHook } from '../../hooks/NavigationHook';
import { useAdminNavigationHook } from '../../hooks/AdminNavigationHook';
 
 const AdminMenu: React.FC = () => {
    const dispatch = useAppDispatch();
    const handleNavigation = useNavigationHook();
    const handleAdminNavigation = useAdminNavigationHook();

    const handleLogout = () => {
        handleNavigation('/', 'Home')()
        dispatch(setDrawerState({ key: 'drawerOpen', value: false }));
        deauthenticate();
        dispatch(initializeAdmin());
        Cookies.remove('authentication')  
        handleAdminNavigation('Dash');
    }

    return (
        <div className='flex flex-col justify-between flex-1'>
            <div className='flex flex-col flex-1'>
                Menu
            </div>
            <div className='flex flex-col'>
                <Block
                    as="button"
                    children="Logout"
                    tailwindClasses="mt-5 bg-primary text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-secondary transition"
                    onClick={handleLogout}
                />
            </div>
        </div>
    );
 };
 export default AdminMenu;
