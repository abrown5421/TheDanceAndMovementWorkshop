import { useAppDispatch } from "../app/store/hooks";
import { setAdminPage } from "../features/admin/adminSlice";

export const useAdminNavigationHook = () => {
  const dispatch = useAppDispatch();

  const handleAdminNavigation = (pageName: string) => {
    dispatch(setAdminPage({ key: "activePageIn", value: false }));

    setTimeout(() => {
      dispatch(setAdminPage({ key: "activePageName", value: pageName }));
      dispatch(setAdminPage({ key: "activePageIn", value: true }));
    }, 500);
  };

  return handleAdminNavigation;
};
