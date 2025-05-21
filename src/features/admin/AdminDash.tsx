import React from 'react';
import Block from '../../components/block/Block';
import Timecard from './features/timecard/Timecard';
 
 const AdminDash: React.FC = () => {
 
    return (
        <Block tailwindClasses="h-full w-full flex flex-col lg:flex-row bg-white p-5">
            <Timecard />
        </Block>
    );
 };
 export default AdminDash;
