import React from 'react';
import Block from '../../components/block/Block';
import PageManager from './features/pageManager/PageManager';
 
 const AdminDash: React.FC = () => {
 
    return (
        <Block tailwindClasses="h-full w-full flex flex-col lg:flex-row bg-white p-5">
            Admin page
        </Block>
    );
 };
 export default AdminDash;
