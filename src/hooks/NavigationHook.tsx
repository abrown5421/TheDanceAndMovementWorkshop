import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/store/hooks";
import { setActivePage } from "../features/pages/activePageSlice";

export const useNavigationHook = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleNavigation = (path: string, pageName: string) => () => {
    dispatch(setActivePage({ key: "activePageIn", value: false }));

    setTimeout(() => {
      dispatch(setActivePage({ key: "activePageName", value: pageName }));
      dispatch(setActivePage({ key: "activePageIn", value: true }));
      navigate(path);
    }, 500);
  };

  return handleNavigation;
};