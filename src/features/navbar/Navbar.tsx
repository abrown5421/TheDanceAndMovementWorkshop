import Transition from '../../components/transition/Transition';
import Logo from './Logo';
import './navbar.css';

function Navbar() {
  
    return (
      <div className="bg-white flex flex-row justify-between items-center py-2 px-4 min-h-14 relative navbar">
        <div className="flex flex-col max-h-full">
            <Transition entry="animate__fadeInLeft" exit="animate__fadeOutLeft" isEntering={true}>
                <Logo />
            </Transition>
        </div>
        <div className="flex flex-col">
            <Transition entry="animate__fadeInRight" exit="animate__fadeOutRight" isEntering={true}>
                Menu here
            </Transition>
        </div>
      </div>
    )
  }
  
  export default Navbar;
  