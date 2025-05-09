import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../app/store/hooks';
import { useNavigationHook } from '../../hooks/NavigationHook';
import { clsx } from "clsx";

function MobileMenu() {
  const activePage = useAppSelector((state) => state.activePage);
  const drawer = useAppSelector((state) => state.drawer);
  const handleNavigation = useNavigationHook();

  const links = [
    { path: '/', label: 'Home' },
    { path: '/Events', label: 'Events' },
    { path: '/Calendar', label: 'Calendar' },
    { path: '/Gallery', label: 'Gallery' },
    { path: '/Contact', label: 'Contact' },
  ];
  
  const containerRef = useRef(null);
  const linkRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  const setRef = (label: string) => (el: HTMLButtonElement | null) => {
    linkRefs.current[label] = el;
  };

  useEffect(() => {
    const activeRef = linkRefs.current[activePage.activePageName];
    if (activeRef && containerRef.current) {
      const { offsetLeft, offsetWidth } = activeRef;
      setUnderlineStyle({ left: offsetLeft, width: offsetWidth });
    }
  }, [activePage.activePageName]);

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