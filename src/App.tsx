import ViewportHook from "./hooks/ViewportHook";
import Modal from "./components/modal/Modal";
import Notification from "./components/notification/Notification";
import Navbar from "./features/navbar/Navbar";
import Menu from "./features/navbar/Menu";
import { useEffect, useState } from "react";
import { getEntireCollection } from "./services/db/getData";
import { setPages } from "./features/pages/pagesSlice";
import { useAppDispatch, useAppSelector } from "./app/store/hooks";
import PageShell from "./features/pages/pageShell";
import { Navigate, Route, useLocation } from "react-router-dom";
import { Routes } from "react-router-dom";
import { setActivePage } from "./features/pages/activePageSlice";
import Block from "./components/block/Block";
import CircularLoader from "./components/circularLoader/CircularLoader";
import { setNavbar } from "./features/navbar/navbarSlice";
import Drawer from "./components/drawer/Drawer";
import { setStaff } from "./features/staff/staffSlice";
import { setBlog } from "./features/blog/blogSlice";
import AdminPage from "./features/admin/AdminPage";
import { setAdminMode } from "./features/admin/adminSlice";
import AdminMenu from "./features/navbar/AdminMenu";

function App() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const pages = useAppSelector((state) => state.pages);
  const admin = useAppSelector((state) => state.admin);
  const [loadingPages, setLoadingPages] = useState(true);

  useEffect(() => {
    if (location.pathname !== '/Admin') {
      dispatch(setAdminMode(false));
    }

    async function fetchData() {
      const pageData = await getEntireCollection("Pages");
      if (pageData) {
        dispatch(setPages(pageData));
      } else {
        dispatch(setPages([]));
      }
      const linkData = await getEntireCollection("Links");
      if (linkData) {
        dispatch(setNavbar(linkData));
      } else {
        dispatch(setNavbar([]));
      }
      const staffData = await getEntireCollection("Staff");
      if (staffData) {
        dispatch(setStaff(staffData));
      } else {
        dispatch(setStaff([]));
      }
      const blogData = await getEntireCollection("BlogPosts");
      if (blogData) {
        dispatch(setBlog(blogData));
      } else {
        dispatch(setBlog([]));
      }
      setLoadingPages(false);
    }

    fetchData();
    
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
          <Modal />
          <Notification />
        </div>
      </div>
    </ViewportHook>
  )
}

export default App;
