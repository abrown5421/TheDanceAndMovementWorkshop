import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { useNavigationHook } from '../../hooks/NavigationHook';
import { Menu as Hamburger } from 'lucide-react';
import IconButton from '../../components/iconButton/IconButton';
import { setDrawerState } from '../../components/drawer/drawerSlice';
import { getTimeOfDay } from '../../utils/getTimeOfDay';
import { CircleUser } from 'lucide-react';
import { useClickAway } from 'react-use'; 
import { deauthenticate } from '../../services/auth/authenticate';
import './navbar.css';
import Button from '../../components/button/Button';

const DesktopMenu: React.FC = () => {
  const dispatch = useAppDispatch();
  const dashboard = useAppSelector((state) => state.dashboard)
  const activePage = useAppSelector((state) => state.activePage);
  const viewport = useAppSelector((state) => state.viewport);
  const auth = useAppSelector((state) => state.auth);
  const handleNavigation = useNavigationHook();

  const links = [
    { path: dashboard.dashboardMode ? '/Dashboard' : '/', label: dashboard.dashboardMode ? 'Dashboard' : 'Home' },
    { path: dashboard.dashboardMode ? '/Dashboard/Events' : '/Events', label: dashboard.dashboardMode ? 'Edit Events' : 'Events' },
    { path: dashboard.dashboardMode ? '/Dashboard/Calendar' : '/Calendar', label: dashboard.dashboardMode ? 'Edit Calendar' : 'Calendar' },
    { path: dashboard.dashboardMode ? '/Dashboard/Gallery' : '/Gallery', label: dashboard.dashboardMode ? 'Edit Gallery' : 'Gallery' },
    { path: dashboard.dashboardMode ? '/Dashboard/Contact' : '/Contact', label: dashboard.dashboardMode ? 'Edit Contact' : 'Contact' },
  ];
  
  const containerRef = useRef(null);
  const userMenuRef = useRef(null);
  const linkRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const setRef = (label: string) => (el: HTMLButtonElement | null) => {
    linkRefs.current[label] = el;
  };
  
  useClickAway(userMenuRef, () => setUserMenuOpen(false));

  useEffect(() => {
    const activeRef = linkRefs.current[activePage.activePageName];
    if (activeRef && containerRef.current) {
      const { offsetLeft, offsetWidth } = activeRef;
      setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activePage.activePageName]);

  const handleLogout = () => {
    deauthenticate();
  }

  return (
    <nav ref={containerRef} className="relative flex items-center gap-6 font-sans text-base text-gray-800">
      {viewport.type === 'desktop' ? (
        <>
          {links.map(({ path, label }) => (
            <button
              key={label}
              ref={setRef(label)}
              onClick={handleNavigation(path, label)}
              className={`relative font-primary cursor-pointer px-2 py-1 transition-colors duration-200 hover:text-primary ${
                activePage.activePageName === label ? 'text-primary' : ''
              }`}
            >
              {label}
            </button>
          ))}

          <div className="relative" ref={userMenuRef}>
            <IconButton
              color="text-primary"
              ariaLabel="User menu"
              onClick={() => setUserMenuOpen(prev => !prev)}
            >
              <CircleUser />
            </IconButton>

            {userMenuOpen && (
              <div className="absolute right-0 mt-4 w-60 bg-white shadow-xl rounded-md border border-gray-200 z-10">
                <div className='font-primary p-3'>
                  Good {getTimeOfDay() + ', ' + auth.user?.UserFName}
                </div>
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => {
                    alert('Profile clicked');
                    setUserMenuOpen(false);
                  }}
                >
                  Profile
                </button>
                <div className='divider p-3'>
                  <Button
                    text="Logout"
                    onClick={handleLogout}
                    bgColor="bg-primary"
                    textColor="text-white"
                    className='w-full'
                  />
                </div>
              </div>
            )}
          </div>

          <div
            className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300"
            style={{
              left: underlineStyle.left,
              width: underlineStyle.width,
            }}
          />
        </>
      ) : (
        <IconButton color="text-primary" ariaLabel="Favorite" onClick={() => {
          dispatch(setDrawerState({ key: 'drawerOpen', value: true }));
          dispatch(setDrawerState({ key: 'drawerTitle', value: `Good ${getTimeOfDay()}, ${auth.user?.UserFName}!` }));
        }}>
          <Hamburger />
        </IconButton>
      )}
    </nav>
  );
}

export default DesktopMenu;