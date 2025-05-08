import { useEffect } from "react";
import { useAppSelector } from "../../app/store/hooks";
import Button from "../../components/button/Button";
import { useHandleNavigation } from "../../hooks/handleNavigation";

function HomePage() {
  const handleNavigation = useHandleNavigation();
  const activePage = useAppSelector((state) => state.activePage);

  useEffect(()=>{console.log(activePage)}, [activePage])
  
  return (
    <>
      <Button
          text="Back to the Dance!"
          onClick={handleNavigation("/Blog", "Blog")}
          loading={false}
          className=""
          type="button"
      />
    </>
  )
}

export default HomePage;
