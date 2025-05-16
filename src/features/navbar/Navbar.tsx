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
  const viewport = useAppSelector((state) => state.viewport)
    return (
      <div className="bg-white flex flex-row justify-between items-center py-2 px-4 min-h-14 relative navbar z-40">
        <div className="flex flex-col max-h-full">
          <Transition entry="animate__fadeInLeft" exit="animate__fadeOutLeft" isEntering={true}>
            <Logo />
          </Transition>
        </div>
        <div className="flex flex-col">
          {viewport.type === 'desktop' ? (
            <Menu />
          ) : (
            <IconButton color="text-primary" ariaLabel="navigation-menu" onClick={() => {
              dispatch(setDrawerState({ key: 'drawerOpen', value: true }))
              dispatch(setDrawerState({ key: 'drawerTitle', value: `Good ${getTimeOfDay()}!` }))
            }}>
                <Hamburger />
            </IconButton>
          )}
        </div>
      </div>
    )
  }
  
  export default Navbar;
  