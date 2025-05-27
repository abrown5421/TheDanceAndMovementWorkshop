import React, { useState, useRef, useEffect } from 'react';
import Transition from '../../components/transition/Transition';
import { Menu as Hamburger } from 'lucide-react';
import Logo from './Logo';
import Menu from './Menu';
import './navbar.css';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import IconButton from '../../components/iconButton/IconButton';
import Cookies from 'js-cookie';
import { initializeAdmin } from '../admin/adminSlice';
import { useNavigationHook } from '../../hooks/NavigationHook';
import { useAdminNavigationHook } from '../../hooks/AdminNavigationHook';
import { deauthenticate, sendPasswordReset } from '../../services/auth/authenticate';
import Block from '../../components/block/Block';
import { setEntireNotification } from '../../components/notification/notificationSlice';
import clsx from 'clsx';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleNavigation = useNavigationHook();
  const handleAdminNavigation = useAdminNavigationHook();
  const viewport = useAppSelector((state) => state.viewport);
  const admin = useAppSelector((state) => state.admin);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleAvatarClick = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    handleNavigation('/', 'Home', 'KFPPkE3kWYrsWUSpHqF6')();
    deauthenticate();
    dispatch(initializeAdmin());
    Cookies.remove('authentication');
    handleAdminNavigation('Dash');
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handlePasswordReset = async () => {
    try {
      await sendPasswordReset(admin.adminUser.UserEmail);
      dispatch(setEntireNotification({
          notificationOpen: true,
          notificationSeverity: 'success',
          notificationMessage: 'Password reset email sent.'
      }));
    } catch (error) {
      console.error('Error sending reset email:', error);
      dispatch(setEntireNotification({
          notificationOpen: true,
          notificationSeverity: 'success',
          notificationMessage: 'Failed to send password reset email.'
      }));
    }
  };

  return (
    <div className="bg-white flex flex-row justify-between items-center py-2 px-4 min-h-14 relative navbar z-30">
      <div className="flex flex-col max-h-full">
        <Transition entry="animate__fadeInLeft" exit="animate__fadeOutLeft" isEntering={true}>
          <Logo />
        </Transition>
      </div>

      {!admin.adminMode ? (
        <div className="flex flex-col">
          {viewport.type !== 'mobile' ? (
            <Menu />
          ) : (
            <IconButton color="text-primary" ariaLabel="navigation-menu" onClick={handleAvatarClick}>
              <Hamburger />
            </IconButton>
          )}
        </div>
      ) : admin.adminUser.UserEmail !== '' ? (
        <div className='flex flex-row items-center'>
          {['Dashboard','Page Editor','Site Settings','Employee Management'].map((page) => (
            <div onClick={() => handleAdminNavigation(page.replace(" ", ""))} className={clsx(
              admin.AdminPageState.activePageName === page.replace(" ", "") ? 'text-primary' : 'text-black',
              'h-full px-5 cursor-pointer')}>{page}</div>
          ))}
          <div className="relative flex flex-col items-end" ref={dropdownRef}>
            <button
              onClick={handleAvatarClick}
              className="rounded-full overflow-hidden w-10 h-10 border border-gray-300 hover:ring-2 ring-primary focus:outline-none cursor-pointer"
            >
              <img
                src={admin.adminUserStaffDoc?.StaffImage || "../../../public/assets/images/placeholder-headshot.jpg"}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </button>

            {dropdownOpen && (
              <div className="absolute mt-13 bg-white border border-gray-200 rounded-lg shadow-xl z-50 w-65 p-4">
                <Block
                  as="button"
                  children="Reset Password"
                  tailwindClasses="w-full px-4 rounded cursor-pointer transition flex justify-end"
                  onClick={handlePasswordReset}
                />
                <hr className="my-4 border-t border-gray-300" />
                <Block
                    as="button"
                    children="Logout"
                    tailwindClasses="w-full bg-primary text-white px-4 py-2 rounded cursor-pointer hover:bg-secondary transition"
                    onClick={handleLogout}
                />
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
