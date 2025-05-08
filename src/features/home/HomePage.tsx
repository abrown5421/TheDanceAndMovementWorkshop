import { useEffect } from "react";
import { useAppSelector } from "../../app/store/hooks";

function HomePage() {
  const activePage = useAppSelector((state) => state.activePage);

  useEffect(()=>{console.log(activePage)}, [activePage])
  
  return (
    <>
      This is the home page.
    </>
  )
}

export default HomePage;
