import React from 'react';
import Block from '../../../../components/block/Block';
import Cookies from 'js-cookie';
import { deauthenticate } from '../../../../services/auth/authenticate';
import { useAppDispatch } from '../../../../app/store/hooks';
import { setDrawerState } from '../../../../components/drawer/drawerSlice';
import { initializeAdmin } from '../../adminSlice';
import { useNavigationHook } from '../../../../hooks/NavigationHook';
import { useAdminNavigationHook } from '../../../../hooks/AdminNavigationHook';
import { LayoutDashboard, Image, Settings, FileText, Users } from 'lucide-react';

const AdminMenu: React.FC = () => {
    const dispatch = useAppDispatch();
    const handleNavigation = useNavigationHook();
    const handleAdminNavigation = useAdminNavigationHook();

    const handleLogout = () => {
        handleNavigation('/', 'Home', 'KFPPkE3kWYrsWUSpHqF6')();
        dispatch(setDrawerState({ key: 'drawerOpen', value: false }));
        deauthenticate();
        dispatch(initializeAdmin());
        Cookies.remove('authentication');
        handleAdminNavigation('Dash');
    };

    const pages = [
        { label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: "Dash" },
        { label: 'Site Settings', icon: <Settings size={20} />, path: "Settings" },
        { label: 'Page Editor', icon: <FileText size={20} />, path: "PageEditor" },
        { label: 'Employee Management', icon: <Users size={20} />, path: "EmployeeManager" },
    ];

    const handleAdminNav = (path: string) => {
        dispatch(setDrawerState({ key: 'drawerOpen', value: false }));
        handleAdminNavigation(path)
    }

    return (
        <div className='flex flex-col justify-between flex-1'>
            <div className='flex flex-col flex-1'>
                {pages.map(({ label, icon, path }) => (
                    <div onClick={() => handleAdminNav(path)} className="flex items-center gap-3 pb-8 px-4 text-gray-800 hover:text-primary cursor-pointer transition" key={label}>
                        {icon}
                        <span>{label}</span>
                    </div>
                ))}
            </div>
            <div className='flex flex-col'>
                <Block
                    as="button"
                    children="Logout"
                    tailwindClasses="mt-5 bg-primary text-white px-4 py-2 rounded cursor-pointer hover:bg-secondary transition"
                    onClick={handleLogout}
                />
            </div>
        </div>
    );
};

export default AdminMenu;
