import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/store/hooks";
import { setActivePage } from "../features/pages/activePageSlice";
import { setDrawerState } from "../components/drawer/drawerSlice";

export const useNavigationHook = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNavigation = (path: string, pageName: string, pageId: string) => () => {
    dispatch(setDrawerState({ key: 'drawerOpen', value: false }))
    dispatch(setActivePage({ key: "activePageIn", value: false }));

    setTimeout(() => {
      dispatch(setActivePage({ key: "activePageName", value: pageName }));
      dispatch(setActivePage({ key: "activePageIn", value: true }));
      dispatch(setActivePage({ key: "activePageId", value: pageId }));
      
      const cleanPath = path.startsWith('/') ? path : `/${path}`;
      navigate(cleanPath)
    }, 500);
  };

  return handleNavigation;
};