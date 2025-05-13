import ViewportHook from "./hooks/ViewportHook";
import Modal from "./components/modal/Modal";
import Notification from "./components/notification/Notification";
import Navbar from "./features/navbar/Navbar";

function App() {

  return (
    <ViewportHook>
      <div className="relative inset-0 w-screen h-screen overflow-scroll bg-black">
        <div className='main-contain bg-black'>
          <Navbar />
          
          <Modal />
          <Notification />
        </div>
      </div>
    </ViewportHook>
  )
}

export default App;
