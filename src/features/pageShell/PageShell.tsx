import { useLocation } from "react-router-dom";
import HomePage from "../home/HomePage";
import BlogPage from "../blog/BlogPage";
import CalendarPage from "../calendar/CalendarPage";
import EventPage from "../event/EventPage";
import GalleryPage from "../gallery/GalleryPage";
import type { ValidSlugs } from "./pageShellTypes";
import ContactPage from "../contact/ContactPage";
import NotFoundPage from "../notFoundPage/NotFoundPage";
import './page-shell.css';
import Transition from "../../components/transition/Transition";
import { useAppSelector } from "../../app/store/hooks";
import { useEffect } from "react";
import { setEntireActivePageState } from "./pageShellSlice";
import { useDispatch } from "react-redux";
import Dashboard from "../dashboard/Dashboard";
import { setDashboardMode } from "../dashboard/dashboardSlice";
import EditBlogPage from "../blog/EditBlogPage";
import EditCalendarPage from "../calendar/EditCalendarPage";
import EditContactPage from "../contact/EditContactPage";
import EditEventPage from "../event/EditEventPage";
import EditGalleryPage from "../gallery/EditGalleryPage";
import PrivacyPolicyPage from "../privacyPolicy/PrivacyPolicyPage";
import Footer from "../footer/Footer";

const PageShell: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const activePage = useAppSelector((state) => state.activePage)
  const slug = location.pathname.slice(1) as ValidSlugs | '';
  const dashboard = useAppSelector((state)=> state.dashboard)

  useEffect(()=>{
    dispatch(setEntireActivePageState({activePageIn: true, activePageName: slug === '' ? 'Home': slug, pageEntryAnimation: activePage.pageEntryAnimation, pageExitAnimation: activePage.pageExitAnimation}))
  }, [])

  const getPage = () => {
    switch (activePage.activePageName) {
        case 'Blog':
          dispatch(setDashboardMode(false));   
          return <BlogPage />;
        case 'Calendar':
          dispatch(setDashboardMode(false));   
          return <CalendarPage />;
        case 'Contact':
          dispatch(setDashboardMode(false));   
          return <ContactPage />;
        case 'Events':
          dispatch(setDashboardMode(false));   
          return <EventPage />;
        case 'Gallery':
          dispatch(setDashboardMode(false));   
          return <GalleryPage />;
        case 'Privacy Policy':
          dispatch(setDashboardMode(false));   
          return <PrivacyPolicyPage />;
        case '':
        case 'Home':
          dispatch(setDashboardMode(false));   
          return <HomePage />;
        case 'Dashboard':
          dispatch(setDashboardMode(true));  
          return <Dashboard />
        case 'Edit Blog': 
          return <EditBlogPage />;
        case 'Edit Calendar':  
          return <EditCalendarPage />;
        case 'Edit Contact':
          return <EditContactPage />;
        case 'Edit Events': 
          return <EditEventPage />;
        case 'Edit Gallery': 
          return <EditGalleryPage />;
    default:
      return <NotFoundPage />;
    }
  }

  return (
    <div className="page-shell overflow-scroll">
      <Transition tailwindClass="h-full" entry={activePage.pageEntryAnimation} exit={activePage.pageExitAnimation} isEntering={activePage.activePageIn}>
        {getPage()}
      </Transition>
      {!dashboard.dashboardMode && <Footer />}
    </div>
  )
}

export default PageShell;
