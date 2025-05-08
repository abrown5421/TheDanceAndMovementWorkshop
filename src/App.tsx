import { Routes, Route } from "react-router-dom";
import ViewportHook from "./hooks/ViewportHook";
import HomePage from "./features/homePage/HomePage";
import Modal from "./components/modal/Modal";
import Notification from "./components/notification/Notification";

function App() {
  return (
    <ViewportHook>
      <div className="relative inset-0 w-screen h-screen">
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
