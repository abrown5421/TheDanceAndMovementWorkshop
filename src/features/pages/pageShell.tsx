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
import { useDynamicFormState } from '../../hooks/DynamicFormHook';
import Footer from '../footer/Footer';
import { setModalContent, setModalTitle, setModalImageUrl, setModalOpen } from '../../components/modal/modalSlice';
import type { GalleryState } from '../gallery/galleryTypes';

function PageShell() {
  const dispatch = useAppDispatch();
  const handleNavigation = useNavigationHook();
  const activePage = useAppSelector((state) => state.activePage);
  const pages = useAppSelector((state) => state.pages);
  const loader = useAppSelector((state) => state.loader);
  const currentPage = pages.pages.find(page => page.PageName === activePage.activePageName);
  const PageNotFound = pages.pages.find(page => page.PageName === "PageNotFound");
  const staff: StaffState[] = useAppSelector((state) => state.staff.staff);
  const gallery: GalleryState[] = useAppSelector((state) => state.gallery.gallery);

  const renderStaffCards = (templateNode: any) => 
    renderCollection<StaffState>(staff, templateNode);
  
  const renderGalleryImages = (templateNode: any) =>
    renderCollection<GalleryState>(gallery, templateNode);

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
          const isImageBlock = node.type === 'Block' && node.props?.as === 'img';

          if (node.children) {
            node.children = replacePlaceholders(node.children);
          }

          if (node.props) {
            for (const [k, v] of Object.entries(node.props)) {
              node.props[k] = replacePlaceholders(v);
            }

            if (isImageBlock) {
              node.props.onClick = () => {
                dispatch(setModalTitle(item.ImageDescription || ''));
                dispatch(setModalContent('Gallery'));
                dispatch(setModalImageUrl(item.ImageLink || ''));
                dispatch(setModalOpen(true));
              };
              
            }
          }

          return node;
        }
        return node;
      };

      return replacePlaceholders(clone);
    });
  };

  const contactFormHandler = () => {
    return useDynamicFormState(['name', 'email', 'message']);
  };

  const contactForm = contactFormHandler();

  const functionMap = {
    handleNavigation,
    renderCollection,
    renderStaffCards,
    renderGalleryImages,
    contactFormHandler,
    getFormValue: (key: string) => contactForm.formValues[key],
    handleFormChange: (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => contactForm.handleChange(key, e.target.value),
    getFormError: (key: string) => contactForm.formErrors[key],
    getFormHelperText: (key: string) => contactForm.formHelperText[key]
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
          <CircularLoader className="text-gray-500" />
        </Block>
      ) : (
        <Transition tailwindClass="h-full bg-white overflow-scroll" isEntering={activePage.activePageIn}>
          {currentPage?.PageContent ? (
            <PageRenderer node={currentPage.PageContent} functionMap={functionMap} /> 
          ) : (
            <PageRenderer node={PageNotFound!.PageContent} functionMap={functionMap} /> 
          )}
          <Footer />
        </Transition>
      )}
    </div>
  );
}

export default PageShell;
