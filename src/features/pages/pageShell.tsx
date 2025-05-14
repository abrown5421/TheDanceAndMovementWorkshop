import Transition from '../../components/transition/Transition';
import { useAppSelector } from '../../app/store/hooks';
import './page-shell.css';

function PageShell() {
  const activePage = useAppSelector((state) => state.activePage)

  return (
    <div className="page-shell">
      <Transition tailwindClass="h-full bg-white py-2 px-4" isEntering={activePage.activePageIn}>
        {activePage.activePageName}
      </Transition>
    </div>
  )
}

export default PageShell;