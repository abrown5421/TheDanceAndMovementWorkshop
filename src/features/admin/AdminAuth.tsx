import React, { useEffect } from 'react';
import Block from '../../components/block/Block';
import { useAdminNavigationHook } from '../../hooks/AdminNavigationHook';
import { useAppSelector } from '../../app/store/hooks';
 
 const AdminAuth: React.FC = () => {
    const handleAdminNavigation = useAdminNavigationHook();
    const admin = useAppSelector((state) => state.admin)

    const handleAuth = () => {
        handleAdminNavigation('Dash');
    }

    useEffect(()=>{console.log(admin)}, [admin])

    return (
        <Block tailwindClasses="h-1/2 w-1/3 rounded-xl p-5 shadow flex flex-col lg:flex-row bg-white">
            login form
            <Block
                as="button"
                children="Login"
                tailwindClasses="mt-5 bg-primary text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-secondary transition"
                onClick={handleAuth}
            />
        </Block>
    );
 };
 export default AdminAuth;
