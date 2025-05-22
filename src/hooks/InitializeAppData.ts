import { useEffect, useState } from "react";
import { useAppDispatch } from "../app/store/hooks";
import { setPages } from "../features/pages/pagesSlice";
import { setNavbar } from "../features/navbar/navbarSlice";
import { setStaff } from "../features/staff/staffSlice";
import { setBlog } from "../features/blog/blogSlice";
import { listenToCollection } from "../services/db/listenToCollection";

export const useInitializeAppData = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const unsubscribers: (() => void)[] = [];

    unsubscribers.push(
      listenToCollection("Pages", (data) => {
        const pagesWithDocId = data.map(({ id, ...rest }) => ({
          PageID: id,
          ...rest,
        }));
        dispatch(setPages(pagesWithDocId));
        setLoading(false); 
      })
    );

    unsubscribers.push(
      listenToCollection("Links", (data) => {
        dispatch(setNavbar(data));
        setLoading(false);
      })
    );

    unsubscribers.push(
      listenToCollection("Staff", (data) => {
        const sortedStaff = data.sort((a, b) => a.StaffCardOrder - b.StaffCardOrder);
        dispatch(setStaff(sortedStaff));
        setLoading(false);
      })
    );

    unsubscribers.push(
      listenToCollection("BlogPosts", (data) => {
        dispatch(setBlog(data));
        setLoading(false);
      })
    );

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, [dispatch]);

  return loading;
};
