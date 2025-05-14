import clsx from 'clsx';
import { useAppSelector } from '../../app/store/hooks';
import Transition from '../../components/transition/Transition';
import { useNavigationHook } from '../../hooks/NavigationHook';
import './navbar.css';

const Menu: React.FC = () => {
    const handleNavigation = useNavigationHook();
    const pages = useAppSelector((state) => state.pages.pages);
    const activePage = useAppSelector((state) => state.activePage)
    
    const visiblePages = pages
        .filter((page) => page.PageNavConfig?.Show)
        .sort((a, b) => a.PageNavConfig.Order - b.PageNavConfig.Order);

    return (
        <div className='flex flex-row'>
            {visiblePages.map((page) => (
                <Transition delay={100 * page.PageNavConfig.Order} isEntering={true} tailwindClass='cursor-pointer'>
                    <div className={clsx("mx-5", activePage.activePageName === page.PageName ? "text-primary" : "text-black")} onClick={handleNavigation(page.PageSlug, page.PageName)}>
                        {page.PageName}
                    </div>
                </Transition>
            ))}
        </div>
    );
};

export default Menu;
