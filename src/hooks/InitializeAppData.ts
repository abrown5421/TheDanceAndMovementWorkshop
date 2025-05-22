import { useEffect, useState } from "react";
import { getEntireCollection } from "../services/db/getData";
import { useAppDispatch } from "../app/store/hooks";
import { setPages } from "../features/pages/pagesSlice";
import { setNavbar } from "../features/navbar/navbarSlice";
import { setStaff } from "../features/staff/staffSlice";
import { setBlog } from "../features/blog/blogSlice";

export const useInitializeAppData = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      const pageData = await getEntireCollection("Pages");
      if (pageData) {
        const pagesWithDocId = pageData.map(({ id, ...rest }) => ({
          PageID: id,
          ...rest,
        }));
        dispatch(setPages(pagesWithDocId));
      } else {
        dispatch(setPages([]));
      }

      const linkData = await getEntireCollection("Links");
      dispatch(setNavbar(linkData || []));

      const staffData = await getEntireCollection("Staff");
      const sortedStaff = staffData?.sort((a, b) => a.StaffCardOrder - b.StaffCardOrder);
      dispatch(setStaff(sortedStaff || []));

      const blogData = await getEntireCollection("BlogPosts");
      dispatch(setBlog(blogData || []));

      setLoading(false);
    }

    fetchData();
  }, [dispatch]);

  return loading;
};
