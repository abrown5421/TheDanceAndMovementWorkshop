import Transition from '../../components/transition/Transition';
import { useAppSelector } from '../../app/store/hooks';
import './page-shell.css';
import PageRenderer from './PageRenderer';

function PageShell() {
  const activePage = useAppSelector((state) => state.activePage);
  const pages = useAppSelector((state) => state.pages);
  const currentPage = pages.pages.find(page => page.PageName === activePage.activePageName);
  const PageNotFound = pages.pages.find(page => page.PageName === 'PageNotFound');
  const fallbackContent = PageNotFound?.PageContent || { type: 'div', props: { children: 'Page not found' } };

  return (
    <div className="page-shell">
      <Transition tailwindClass="h-full bg-white py-2 px-4" isEntering={activePage.activePageIn}>
        {currentPage?.PageContent ? (
          <PageRenderer node={currentPage.PageContent} /> 
        ) : (
          <PageRenderer node={fallbackContent} /> 
        )}
      </Transition>
    </div>
  );
}

export default PageShell;
