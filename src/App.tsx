import ViewportHook from "./hooks/ViewportHook";
import Modal from "./components/modal/Modal";
import Notification from "./components/notification/Notification";
import Navbar from "./features/navbar/Navbar";
import Menu from "./features/navbar/Menu";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/store/hooks";
import PageShell from "./features/pages/pageShell";
import { Navigate, Route, useLocation } from "react-router-dom";
import { Routes } from "react-router-dom";
import { setActivePage } from "./features/pages/activePageSlice";
import Block from "./components/block/Block";
import CircularLoader from "./components/circularLoader/CircularLoader";
import Drawer from "./components/drawer/Drawer";
import AdminPage from "./features/admin/AdminPage";
import { setAdminMode } from "./features/admin/adminSlice";
import AdminMenu from "./features/navbar/AdminMenu";
import { useInitializeAppData } from "./hooks/InitializeAppData";

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const pages = useAppSelector((state) => state.pages);
  const admin = useAppSelector((state) => state.admin);
  const loadingPages = useInitializeAppData();

  useEffect(() => {
    if (location.pathname !== '/Admin') {
      dispatch(setAdminMode(false));
    }
  }, [dispatch]);

  useEffect(() => {
    const path = location.pathname.replace('/', '');
    if (location.pathname !== '/') {
      dispatch(setActivePage({ key: "activePageName", value: path || "Home" }));
      dispatch(setActivePage({ key: "activePageIn", value: true }));
    }
    
  }, [location.pathname, dispatch]);

  if (loadingPages) {
    return <Block tailwindClasses='flex flex-col lg:flex-row h-screen w-full justify-center items-center'><CircularLoader /></Block>;
  }

  return (
    <ViewportHook>
      <div className="relative inset-0 w-screen h-screen bg-black overflow-hidden">
        <Navbar />
        <div className='overflow-scroll main-contain bg-black'>
          <Routes>
            <Route path="/Admin" element={<AdminPage />} />
            {pages.pages.map((page) => (
              <Route key={page.PageName} path={page.PageSlug} element={<PageShell />} />
            ))}
            <Route path="/PageNotFound" element={<PageShell />} />
            <Route path="*" element={<Navigate to="/PageNotFound" />} />
          </Routes>
          
          <Drawer>
            {admin.adminMode ? (
              <AdminMenu />
            ) : (
              <Menu />
            )}
          </Drawer>
          <Notification />
        </div>
          <Modal />
      </div>
    </ViewportHook>
  )
}

export default App;
