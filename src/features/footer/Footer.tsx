import Transition from '../../components/transition/Transition';
import './footer.css';
import Menu from './Menu';

function Footer() {
  
    return (
      <div className="bg-white flex flex-row justify-between items-center py-2 px-4 min-h-14 relative footer">
        <div className="flex flex-col">
            <Transition entry="animate__fadeInRight" exit="animate__fadeOutRight" isEntering={true}>
                <Menu />
            </Transition>
        </div>
        <div className="flex flex-col max-h-full">
            <Transition entry="animate__fadeInLeft" exit="animate__fadeOutLeft" isEntering={true}>
                socials here
            </Transition>
        </div>
      </div>
    )
  }
  
  export default Footer;
  