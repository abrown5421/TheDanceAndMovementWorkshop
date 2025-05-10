import { useRef } from 'react';
import { useAppSelector } from '../../app/store/hooks';
import { useNavigationHook } from '../../hooks/NavigationHook';
import { clsx } from "clsx";

const MobileMenu: React.FC = () => {
  const dashboard = useAppSelector((state) => state.dashboard)
  const activePage = useAppSelector((state) => state.activePage);
  const drawer = useAppSelector((state) => state.drawer);
  const handleNavigation = useNavigationHook();

  const links = [
    { path: dashboard.dashboardMode ? '/Dashboard' : '/', label: dashboard.dashboardMode ? 'Dashboard' : 'Home' },
    { path: dashboard.dashboardMode ? '/Dashboard/Events' : '/Events', label: dashboard.dashboardMode ? 'Edit Events' : 'Events' },
    { path: dashboard.dashboardMode ? '/Dashboard/Calendar' : '/Calendar', label: dashboard.dashboardMode ? 'Edit Calendar' : 'Calendar' },
    { path: dashboard.dashboardMode ? '/Dashboard/Gallery' : '/Gallery', label: dashboard.dashboardMode ? 'Edit Gallery' : 'Gallery' },
    { path: dashboard.dashboardMode ? '/Dashboard/Contact' : '/Contact', label: dashboard.dashboardMode ? 'Edit Contact' : 'Contact' },
  ];
  
  const containerRef = useRef(null);
  const linkRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const setRef = (label: string) => (el: HTMLButtonElement | null) => {
    linkRefs.current[label] = el;
  };

  return (
    <nav ref={containerRef} 
        className={clsx(
            "relative flex items-center gap-6 font-sans text-base text-gray-800",
            drawer.drawerPosition === 'right' || drawer.drawerPosition === 'left' ? "flex-col items-start" : "flex-row"
        )}
    >
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

          
        </>
    </nav>
  );
}

export default MobileMenu;