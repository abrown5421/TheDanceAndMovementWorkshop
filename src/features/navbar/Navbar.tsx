import Transition from '../../components/transition/Transition';
import { Menu as Hamburger } from 'lucide-react';
import Logo from './Logo';
import Menu from './Menu';
import './navbar.css';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import IconButton from '../../components/iconButton/IconButton';
import { setDrawerState } from '../../components/drawer/drawerSlice';
import { getTimeOfDay } from '../../utils/getTimeOfDay';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const viewport = useAppSelector((state) => state.viewport);
  const admin = useAppSelector((state) => state.admin);

  const handleAvatarClick = () => {
    dispatch(setDrawerState({ key: 'drawerOpen', value: true }));
    dispatch(setDrawerState({ key: 'drawerTitle', value: `Good ${getTimeOfDay()}!` }));
  };

  return (
    <div className="bg-white flex flex-row justify-between items-center py-2 px-4 min-h-14 relative navbar z-40">
      <div className="flex flex-col max-h-full">
        <Transition entry="animate__fadeInLeft" exit="animate__fadeOutLeft" isEntering={true}>
          <Logo />
        </Transition>
      </div>

      {!admin.adminMode ? (
        <div className="flex flex-col">
          {viewport.type === 'desktop' ? (
            <Menu />
          ) : (
            <IconButton color="text-primary" ariaLabel="navigation-menu" onClick={handleAvatarClick}>
              <Hamburger />
            </IconButton>
          )}
        </div>
      ) : admin.adminUser.UserEmail !== '' ? ( 
        <div className="flex flex-col items-end">
          <button
            onClick={handleAvatarClick}
            className="rounded-full overflow-hidden w-10 h-10 border border-gray-300 hover:ring-2 ring-primary focus:outline-none"
          >
            <img
              src={admin.adminUserStaffDoc?.StaffImage || "../../../public/assets/images/placeholder-headshot.jpg"}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
