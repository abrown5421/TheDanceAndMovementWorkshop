import { Routes, Route } from "react-router-dom";
import ViewportHook from "./hooks/ViewportHook";
import Modal from "./components/modal/Modal";
import Notification from "./components/notification/Notification";
import PageShell from "./features/pageShell/PageShell";
import Navbar from "./features/navbar/Navbar";
import Footer from "./features/footer/Footer";
import Drawer from "./components/drawer/Drawer";

function App() {
  return (
    <ViewportHook>
      <div className="relative inset-0 w-screen h-screen">
        <Navbar />
        <div className='overflow-scroll main-contain'>
          <Routes>
            <Route path="*" element={<PageShell />} /> 
          </Routes>
          <Modal />
          <Notification />
          <Drawer>mobile nav here</Drawer>
          <Footer />
        </div>
      </div>
    </ViewportHook>
  )
}

export default App;
