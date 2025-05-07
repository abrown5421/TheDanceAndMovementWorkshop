import { Routes, Route } from "react-router-dom";
import ViewportHook from "./hooks/ViewportHook";
import HomePage from "./features/homePage/HomePage";

function App() {
  return (
    <ViewportHook>
      <div style={{width: '100vw', height: '100vh', backgroundColor: 'gray'}}>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </div>
    </ViewportHook>
  )
}

export default App;
