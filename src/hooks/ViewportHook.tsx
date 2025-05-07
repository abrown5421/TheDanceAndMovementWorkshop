import { useEffect } from "react";
import { useAppDispatch } from "../app/store/hooks";
import { setViewport } from "../app/store/globalSlices/viewportSlice";

const ViewportHook = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleResize = () => {
      dispatch(setViewport({ width: window.innerWidth, height: window.innerHeight }));
    };

    window.addEventListener("resize", handleResize);
    handleResize(); 

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return <>{children}</>;
};

export default ViewportHook;
