import Transition from '../../components/transition/Transition';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import type { StaffState } from '../staff/staffTypes';
import './page-shell.css';
import PageRenderer from './PageRenderer';
import { useEffect } from 'react';
import { setEntireLoaderLoadState } from '../../components/circularLoader/circularLoaderSlice';
import CircularLoader from '../../components/circularLoader/CircularLoader';
import Block from '../../components/block/Block';
import { useNavigationHook } from '../../hooks/NavigationHook';

function PageShell() {
  const dispatch = useAppDispatch();
  const handleNavigation = useNavigationHook();
  const activePage = useAppSelector((state) => state.activePage);
  const pages = useAppSelector((state) => state.pages);
  const loader = useAppSelector((state) => state.loader);
  const currentPage = pages.pages.find(page => page.PageName === activePage.activePageName);
  const PageNotFound = pages.pages.find(page => page.PageName === "PageNotFound");
  const staff: StaffState[] = useAppSelector((state) => state.staff.staff);
  
  const renderStaffCards = (templateNode: any) => 
    renderCollection<StaffState>(staff, templateNode);
  
  const renderCollection = <T extends Record<string, any>>(
    collection: T[],
    templateNode: any,
    placeholderResolver?: (key: string, item: T) => string
  ) => {
    return collection.map((item) => {
      const clone = JSON.parse(JSON.stringify(templateNode));

      const replacePlaceholders = (node: any): any => {
        if (typeof node === 'string') {
          return node.replace(/{{(\w+)}}/g, (_, key) => {
            if (placeholderResolver) {
              return placeholderResolver(key, item);
            }
            return item[key] ?? '';
          });
        }
        if (Array.isArray(node)) {
          return node.map(replacePlaceholders);
        }
        if (typeof node === 'object' && node !== null) {
          if (node.children) {
            node.children = replacePlaceholders(node.children);
          }
          if (node.props) {
            for (const [k, v] of Object.entries(node.props)) {
              node.props[k] = replacePlaceholders(v);
            }
          }
          return node;
        }
        return node;
      };

      return replacePlaceholders(clone);
    });
  };

  const functionMap = {
    handleNavigation,
    renderCollection,
    renderStaffCards
  };

  useEffect(()=>{
    if (PageNotFound && currentPage) {
      dispatch(setEntireLoaderLoadState({loaderLoad: false, loaderIdentify: ''}))
    }
  }, [currentPage, PageNotFound])

  return (
    <div className="page-shell">
      {loader.loaderLoad && loader.loaderIdentify === 'pageShell' ? (
        <Block tailwindClasses='flex flex-col lg:flex-row h-full w-full justify-center items-center'>
          <CircularLoader />
        </Block>
      ) : (
        <Transition tailwindClass="h-full bg-white py-2 px-4" isEntering={activePage.activePageIn}>
          {currentPage?.PageContent ? (
            <PageRenderer node={currentPage.PageContent} functionMap={functionMap} /> 
          ) : (
            <PageRenderer node={PageNotFound!.PageContent} functionMap={functionMap} /> 
          )}
        </Transition>
      )}
    </div>
  );
}

export default PageShell;
