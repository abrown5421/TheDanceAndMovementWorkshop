import ViewportHook from "./hooks/ViewportHook";
import Modal from "./components/modal/Modal";
import Notification from "./components/notification/Notification";
import Navbar from "./features/navbar/Navbar";
import { useEffect } from "react";
import { getEntireCollection } from "./services/db/getData";
import { setPages } from "./features/pages/pagesSlice";
import { useAppDispatch } from "./app/store/hooks";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import PageShell from "./features/pages/pageShell";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      const data = await getEntireCollection("Pages");
      if (data) {
        dispatch(setPages(data));
      } else {
        dispatch(setPages([]));
      }
    }

    fetchData();
  }, [dispatch]);

  return (
    <ViewportHook>
      <div className="relative inset-0 w-screen h-screen bg-black">
        <Navbar />
        <div className='overflow-scroll main-contain bg-black'>
          <Routes>
            <Route path="*" element={<PageShell />} /> 
          </Routes>
          <Modal />
          <Notification />
        </div>
      </div>
    </ViewportHook>
  )
}

export default App;
