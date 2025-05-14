import Transition from '../../components/transition/Transition';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import './page-shell.css';
import PageRenderer from './PageRenderer';
import { useEffect } from 'react';
import { setEntireLoaderLoadState } from '../../components/circularLoader/circularLoaderSlice';
import CircularLoader from '../../components/circularLoader/CircularLoader';
import Row from '../../components/row/Row';

function PageShell() {
  const dispatch = useAppDispatch();
  const activePage = useAppSelector((state) => state.activePage);
  const pages = useAppSelector((state) => state.pages);
  const loader = useAppSelector((state) => state.loader);
  const currentPage = pages.pages.find(page => page.PageName === activePage.activePageName);
  const PageNotFound = pages.pages.find(page => page.PageName === "PageNotFound");

  useEffect(()=>{
    if (PageNotFound && currentPage) {
      dispatch(setEntireLoaderLoadState({loaderLoad: false, loaderIdentify: ''}))
    }
  }, [, PageNotFound])

  return (
    <div className="page-shell">
      {loader.loaderLoad && loader.loaderIdentify === 'pageShell' ? (
        <Row tailwindClasses='h-full w-full justify-center items-center'>
          <CircularLoader />
        </Row>
      ) : (
        <Transition tailwindClass="h-full bg-white py-2 px-4" isEntering={activePage.activePageIn}>
          {currentPage?.PageContent ? (
            <PageRenderer node={currentPage.PageContent} /> 
          ) : (
            <PageRenderer node={PageNotFound!.PageContent} /> 
          )}
        </Transition>
      )}
    </div>
  );
}

export default PageShell;
