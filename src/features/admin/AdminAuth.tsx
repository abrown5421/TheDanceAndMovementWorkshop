import React from 'react';
import Block from '../../components/block/Block';
import { useDispatch } from 'react-redux';
import { setAdminPage } from './adminSlice';
 
 const AdminAuth: React.FC = () => {
    const dispatch = useDispatch()
    const handleAuth = () => {
        dispatch(setAdminPage({ key: "activePageIn", value: false }));
        
        setTimeout(() => {
            dispatch(setAdminPage({ key: "activePageName", value: 'Dash' }));
            dispatch(setAdminPage({ key: "activePageIn", value: true }));
        }, 500);
    }

     return (
        <Block tailwindClasses="h-1/2 w-1/3 rounded-xl p-5 shadow flex flex-col lg:flex-row bg-white">
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
