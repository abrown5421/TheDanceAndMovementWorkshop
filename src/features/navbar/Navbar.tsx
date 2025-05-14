import Transition from '../../components/transition/Transition';
import Logo from './Logo';
import Menu from './Menu';
import './navbar.css';

const Navbar: React.FC = () => {
    return (
      <div className="bg-white flex flex-row justify-between items-center py-2 px-4 min-h-14 relative navbar z-50">
        <div className="flex flex-col max-h-full">
          <Transition entry="animate__fadeInLeft" exit="animate__fadeOutLeft" isEntering={true}>
            <Logo />
          </Transition>
        </div>
        <div className="flex flex-col">
          <Menu />
        </div>
      </div>
    )
  }
  
  export default Navbar;
  