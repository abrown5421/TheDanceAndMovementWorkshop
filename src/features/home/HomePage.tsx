import headingImage from "../../../public/assets/images/hero.png";
import Button from "../../components/button/Button";
import { useNavigationHook } from "../../hooks/NavigationHook";
import Transition from "../../components/transition/Transition";
import { clsx } from "clsx";
import { useAppSelector } from "../../app/store/hooks";

function HomePage() {
  const handleNavigation = useNavigationHook();
  const viewport = useAppSelector((state) => state.viewport);

  return (
    <div className={clsx(
        "h-full flex justify-around items-center",
        viewport.type !== 'desktop' ? "flex-col" : "flex-row"
      )}>
      <div className={clsx(
        "flex items-center",
        viewport.type !== 'desktop' ? "flex-row h-1/2" : "flex-col flex-1/2 h-full"
      )}>
        <Transition isEntering={true}>
          <div className={clsx(
            "flex font-secondary ",
            viewport.type !== 'desktop' ? "text-4xl flex-nowrap justify-center" : "text-5xl flex-row"
          )}>
            The Dance <span className="px-2 text-primary">&</span> Movement
            Workshop
          </div>
          <div className={clsx(viewport.type !== 'desktop' && "text-center")}>
            The Dance and Movement Workshop provides supplemental dance training
            to dancers who seek to better their technical rolodex. We help dancers
            focus on their skills in tandem with their current dance
            studio/company commitments by hosting workshops, classes, and camps.
          </div>
          <div className={clsx("flex mt-3 gap-5", 
            viewport.type !== 'desktop' ? "flex-col" : "flex-row"
          )}>
            <div className="flex flex-col flex-1/4 justify-center">
              <Button
                text="Contact"
                onClick={handleNavigation("/Contact", "Contact")}
                loading={false}
                pill={true}
                type="button"
              />
            </div>
            <div className="flex flex-col flex-3/4 justify-center">
              Socials here
            </div>
          </div>
        </Transition>
      </div>
      <div className={clsx(
        "flex items-center ",
        viewport.type !== 'desktop' ? "flex-row h-1/2" : "flex-col flex-1/2 h-full"
      )}>
        <Transition heightClass="h-full" isEntering={true} speed="fast" entry="animate__fadeInRight" exit="animate__fadeOutRight">
          <img src={headingImage} className="w-auto h-full object-contain" />
        </Transition>
      </div>
    </div>
  );
}

export default HomePage;
