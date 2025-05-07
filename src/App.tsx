import { Routes, Route } from "react-router-dom";
import ViewportHook from "./hooks/ViewportHook";
import HomePage from "./features/homePage/HomePage";
import Modal from "./components/modal/Modal";

function App() {
  return (
    <ViewportHook>
      <>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </>
      <Modal />
    </ViewportHook>
  )
}

export default App;
