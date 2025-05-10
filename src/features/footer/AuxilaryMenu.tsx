import React from 'react';
import { getCurrentYear } from '../../utils/getCurrentYear';
import {useNavigationHook} from '../../hooks/NavigationHook';

const AuxilaryMenu: React.FC = () => {
    const handleNavigation = useNavigationHook();

    return (
        <div className='flex flex-row'>
            © {getCurrentYear()} The Dance & Movement Workshop. All rights reserved. |{' '}
            <span onClick={handleNavigation('Privacy-Policy', 'Privacy Policy')} className='ml-2 hover:underline hover:text-primary cursor-pointer'>Privacy Policy</span>
        </div>
    );
};

export default AuxilaryMenu;
