import { useAppSelector } from "./app/store/hooks";
import ViewportHook from "./hooks/ViewportHook";
import Transition from './components/transition/Transition';
import { useState } from "react";

function App() {
  const [inOut, setInOut] = useState<boolean>(false);
  const viewport = useAppSelector((state) => state.viewport);

  const handleTransition = () => {
    setInOut(!inOut);
  }

  return (
    <ViewportHook>
      <div onClick={handleTransition}>click</div>
      <Transition 
        entry="animate__fadeIn" 
        exit="animate__fadeOut" 
        isEntering={inOut} 
        speed="normal"
      >
        AHHHHHHHHHH
      </Transition>
    </ViewportHook>
  )
}

export default App;
