import React, { useEffect } from 'react';
import { useAppDispatch } from '../../app/store/hooks';
import { setAdmin } from './adminSlice';
import Block from '../../components/block/Block';
 
 const AdminPage: React.FC = () => {
    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(setAdmin({adminMode: true}));
    }, [])
    
    return (
        <Block tailwindClasses="h-full flex flex-col lg:flex-row bg-white">
           This is the admin page
        </Block>
    );
 };
 export default AdminPage;
