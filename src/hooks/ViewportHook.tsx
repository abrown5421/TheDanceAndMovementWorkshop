import { useEffect } from "react";
import { useAppDispatch } from "../app/store/hooks";
import { setViewport } from "../app/store/globalSlices/viewportSlice";

const ViewportHook = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
  
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (typeof window !== "undefined") {
          dispatch(setViewport({ width: window.innerWidth, height: window.innerHeight }));
        }
      }, 100); 
    };
  
    window.addEventListener("resize", handleResize);
    handleResize();
  
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);
  

  return <>{children}</>;
};

export default ViewportHook;
