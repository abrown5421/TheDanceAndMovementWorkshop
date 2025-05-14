import ViewportHook from "./hooks/ViewportHook";
import Modal from "./components/modal/Modal";
import Notification from "./components/notification/Notification";
import Navbar from "./features/navbar/Navbar";
import { useEffect } from "react";
import { getEntireCollection } from "./services/db/getData";
import { setPages } from "./features/pages/pagesSlice";
import { useAppDispatch, useAppSelector } from "./app/store/hooks";

function App() {
  const dispatch = useAppDispatch();
  const activePage = useAppSelector((state) => state.activePage); 

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

  useEffect(()=>{console.log(activePage)}, [activePage])

  return (
    <ViewportHook>
      <div className="relative inset-0 w-screen h-screen overflow-scroll bg-black">
        <div className='main-contain bg-black'>
          <Navbar />

          <Modal />
          <Notification />
        </div>
      </div>
    </ViewportHook>
  )
}

export default App;
