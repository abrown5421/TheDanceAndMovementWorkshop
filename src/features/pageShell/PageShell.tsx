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
import { setActivePage, setEntireActivePageState } from "./pageShellSlice";
import { useDispatch } from "react-redux";

function PageShell() {
  const dispatch = useDispatch();
  const location = useLocation();
  const activePage = useAppSelector((state) => state.activePage)
  const slug = location.pathname.slice(1) as ValidSlugs | '';

  useEffect(()=>{
    dispatch(setEntireActivePageState({activePageIn: true, activePageName: slug}))
  }, [])

  const getPage = () => {
    switch (activePage.activePageName) {
        case 'Blog':
        case 'blog':
            return <BlogPage />;
        case 'Calendar':
        case 'calendar':
            return <CalendarPage />;
        case 'Contact':
        case 'contact':
            return <ContactPage />;
        case 'Events':
        case 'events':
            return <EventPage />;
        case 'Gallery':
        case 'gallery':
            return <GalleryPage />;
        case '':
        case 'Home':
        case 'home':
            return <HomePage />;
    default:
      return <NotFoundPage />;
    }
  }

  return (
    <div className="page-shell bg-white">
      <Transition isEntering={activePage.activePageIn}>
        {getPage()}
      </Transition>
        
    </div>
  )
}

export default PageShell;
