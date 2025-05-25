import React from 'react';
import Block from '../../components/block/Block';
import BlockEditor from './features/blockEditor/BlockEditor';
 
 const AdminDash: React.FC = () => {
 
    return (
        <Block tailwindClasses="h-full w-full flex flex-col lg:flex-row bg-white p-5">
            <BlockEditor />
        </Block>
    );
 };
 export default AdminDash;
