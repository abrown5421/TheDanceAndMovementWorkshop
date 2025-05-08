import { Routes, Route } from "react-router-dom";
import ViewportHook from "./hooks/ViewportHook";
import HomePage from "./features/home/HomePage";
import Modal from "./components/modal/Modal";
import Notification from "./components/notification/Notification";
import BlogPage from "./features/blog/BlogPage";
import CalendarPage from "./features/calendar/CalendarPage";
import ContactPage from "./features/contact/ContactPage";
import EventPage from "./features/event/EventPage";
import GalleryPage from "./features/gallery/GalleryPage";

function App() {
  return (
    <ViewportHook>
      <div className="relative inset-0 w-screen h-screen">
        <Routes>
          <Route path='/Blog' element={<BlogPage />} />
        </Routes>
        <Routes>
          <Route path='/Calendar' element={<CalendarPage />} />
        </Routes>
        <Routes>
          <Route path='/Contact' element={<ContactPage />} />
        </Routes>
        <Routes>
          <Route path='/Event' element={<EventPage />} />
        </Routes>
        <Routes>
          <Route path='/Gallery' element={<GalleryPage />} />
        </Routes>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
        <Modal />
        <Notification />
      </div>
    </ViewportHook>
  )
}

export default App;
