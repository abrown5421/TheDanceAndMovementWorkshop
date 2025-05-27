import React, { useEffect } from 'react';
import Block from '../../../../components/block/Block';
import { useAppSelector } from '../../../../app/store/hooks';
 
 const AdminDash: React.FC = () => {
    const admin = useAppSelector((state) => state.admin);

    useEffect(()=>{console.log(admin)}, [admin])

    return (
        <div className='h-full w-full bg-white p-4'>
            dashboard
        </div>
    );
 };
 export default AdminDash;
