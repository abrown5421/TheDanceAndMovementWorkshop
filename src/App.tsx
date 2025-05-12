import { Routes, Route } from "react-router-dom";
import ViewportHook from "./hooks/ViewportHook";
import Modal from "./components/modal/Modal";
import Notification from "./components/notification/Notification";
import PageShell from "./features/pageShell/PageShell";
import Navbar from "./features/navbar/Navbar";
import Drawer from "./components/drawer/Drawer";
import MobileMenu from "./features/navbar/MobileMenu";

function App() {

  return (
    <ViewportHook>
      <div className="relative inset-0 w-screen h-screen overflow-scroll bg-black">
        <Navbar />
        <div className='main-contain bg-black'>
          <Routes>
            <Route path="*" element={<PageShell />} /> 
          </Routes>
          <Modal />
          <Notification />
          <Drawer>
            <MobileMenu />
          </Drawer>
          
        </div>
      </div>
    </ViewportHook>
  )
}

export default App;
