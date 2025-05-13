import Transition from '../../components/transition/Transition';
import SocialBar from '../socialBar/SocialBar';
import './footer.css';

const Footer: React.FC = () => {
  
    return (
      <div className="bg-white flex flex-row justify-between items-center py-2 px-4 min-h-14 relative footer">
        <div className="flex flex-col h-full">
            <Transition entry="animate__fadeInRight" exit="animate__fadeOutRight" isEntering={true} tailwindClass='flex flex-col h-full justify-around'>
                <div>links here</div>
                <div>aux menu here</div>
            </Transition>
        </div>
        <div className="flex flex-col max-h-full">
            <Transition entry="animate__fadeInLeft" exit="animate__fadeOutLeft" isEntering={true}>
                <SocialBar />
            </Transition>
        </div>
      </div>
    )
  }
  
  export default Footer;
  