import { Routes, Route } from "react-router-dom";
import ViewportHook from "./hooks/ViewportHook";
import Modal from "./components/modal/Modal";
import Notification from "./components/notification/Notification";
import PageShell from "./features/pageShell/PageShell";
import Navbar from "./features/navbar/Navbar";
import Drawer from "./components/drawer/Drawer";
import MobileMenu from "./features/navbar/MobileMenu";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { getDocumentById } from "./services/db/getData";
import { useAppDispatch } from "./app/store/hooks";
import { setAuthMode, setUser } from "./features/auth/authSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      const uid = Cookies.get('authentication');
      if (uid) {
        const userData = await getDocumentById("Users", uid);
        if (userData) {
          console.log(userData);
          dispatch(
            setUser({
              UserFName: userData.UserFName,
              UserLName: userData.UserLName,
              UserEmail: userData.UserEmail,
            })
          );
          dispatch(setAuthMode(false));
        }
      }
    };

    fetchUserData();
  }, []);
  
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
