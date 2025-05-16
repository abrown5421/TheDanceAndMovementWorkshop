import clsx from 'clsx';
import { useAppSelector } from '../../app/store/hooks';
import Transition from '../../components/transition/Transition';
import { useNavigationHook } from '../../hooks/NavigationHook';
import './navbar.css';

const Menu: React.FC = () => {
    const handleNavigation = useNavigationHook();
    const viewport = useAppSelector((state) => state.viewport);
    const pages = useAppSelector((state) => state.pages.pages);
    const activePage = useAppSelector((state) => state.activePage);
    const navbar = useAppSelector((state) => state.navbar);

    const visiblePages = pages
        .filter((page) => page.PageNavConfig?.Show)
        .map((page) => ({
            key: `page-${page.PageName}`,
            label: page.PageName,
            order: page.PageNavConfig.Order,
            isActive: activePage.activePageName === page.PageName,
            onClick: handleNavigation(page.PageSlug, page.PageName),
        }));


    const visibleLinks = navbar.links
        .filter((link) => link.LinkNavConfig?.Show)
        .map((link) => ({
            key: `link-${link.id}`,
            label: link.LinkName,
            order: link.LinkNavConfig.Order,
            isActive: false, 
            onClick: () => window.open(link.LinkURL, '_blank'),
        }));

    const menuItems = [...visiblePages, ...visibleLinks].sort((a, b) => a.order - b.order);

    return (
        <div className='flex flex-col lg:flex-row'>
            {menuItems.map((item) => (
                <Transition key={item.key} delay={100 * item.order} isEntering={true} tailwindClass='cursor-pointer'>
                    <div
                        className={clsx(item.isActive ? "text-primary" : "text-black", viewport.type !== 'desktop' ? "m-5" : "mx-5")}
                        onClick={item.onClick}
                    >
                        {item.label}
                    </div>
                </Transition>
            ))}
        </div>
    );
};

export default Menu;
