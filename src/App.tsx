import { Routes, Route } from "react-router-dom";
import ViewportHook from "./hooks/ViewportHook";
import Modal from "./components/modal/Modal";
import Notification from "./components/notification/Notification";
import PageShell from "./features/pageShell/PageShell";

function App() {
  return (
    <ViewportHook>
      <div className="relative inset-0 w-screen h-screen">
        <Routes>
          <Route path="*" element={<PageShell />} /> 
        </Routes>
        <Modal />
        <Notification />
      </div>
    </ViewportHook>
  )
}

export default App;
