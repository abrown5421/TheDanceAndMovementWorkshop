import Transition from '../../components/transition/Transition';
import { useAppSelector } from '../../app/store/hooks';
import './page-shell.css';
import PageRenderer from './PageRenderer';

function PageShell() {
  const activePage = useAppSelector((state) => state.activePage)

  return (
    <div className="page-shell">
      <Transition tailwindClass="h-full bg-white py-2 px-4" isEntering={activePage.activePageIn}>
        {/* <PageRenderer node={pageJson} /> */}
        {activePage.activePageName}
      </Transition>
    </div>
  )
}

export default PageShell;