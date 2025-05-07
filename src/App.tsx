import { useAppSelector } from "./app/store/hooks";
import ViewportHook from "./hooks/ViewportHook";

function App() {

  const viewport = useAppSelector((state) => state.viewport);

  return (
    <ViewportHook>
      {viewport.type}
    </ViewportHook>
  )
}

export default App
