import React, { useEffect } from 'react';
import Block from '../../../../components/block/Block';
import { useAppSelector } from '../../../../app/store/hooks';
import PageShell from '../../../pages/pageShell';
 
 const AdminDash: React.FC = () => {
    const admin = useAppSelector((state) => state.admin);

    useEffect(()=>{console.log(admin)}, [admin])

    return (
        <Block tailwindClasses="h-full w-full flex flex-col lg:flex-row bg-white">
            <PageShell />
        </Block>
    );
 };
 export default AdminDash;
