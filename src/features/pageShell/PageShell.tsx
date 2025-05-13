import './page-shell.css';
import Transition from "../../components/transition/Transition";
import { useAppSelector } from "../../app/store/hooks";
import Footer from "../footer/Footer";
import { clsx } from "clsx";

const PageShell: React.FC = () => {
  const activePage = useAppSelector((state) => state.activePage)

  return (
    <div className="page-shell overflow-scroll">
      <Transition tailwindClass={clsx(
          "h-full overflow-scroll",
        )} entry={activePage.pageEntryAnimation} exit={activePage.pageExitAnimation} isEntering={activePage.activePageIn}>
        <div className={clsx(
          "h-full flex justify-around items-center bg-white py-2 px-4",
        )}>
          page will go here
        </div>
        <Footer />
      </Transition>
      
    </div>
  )
}

export default PageShell;
