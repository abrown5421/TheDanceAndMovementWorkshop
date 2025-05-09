import { useNavigationHook } from '../../hooks/NavigationHook';

function Menu() {
    const handleNavigation = useNavigationHook();
    return (
      <div className="flex flex-row items-center menu gap-3 font-primary">
        <div onClick={handleNavigation('/', '')} className='flex flex-col'>Home</div>
        <div onClick={handleNavigation('/Events', 'Events')} className='flex flex-col'>Events</div>
        <div onClick={handleNavigation('/Calendar', 'Calendar')} className='flex flex-col'>Calendar</div>
        <div onClick={handleNavigation('/Gallery', 'Gallery')} className='flex flex-col'>Gallery</div>
        <div onClick={handleNavigation('/Contact', 'Contact')} className='flex flex-col'>Contact</div>
      </div>
    )
  }
  
  export default Menu;
  