import ViewportHook from "./hooks/ViewportHook";
import Modal from "./components/modal/Modal";
import Notification from "./components/notification/Notification";
import Row from "./components/row/Row";
import Column from "./components/column/Column";
function App() {
  
  return (
    <ViewportHook>
      <div className="relative inset-0 w-screen h-screen overflow-scroll bg-black">
        <div className='main-contain bg-black'>
          <Row tailwindClasses="h-full w-full bg-white justify-center">
            <Column tailwindClasses="h-full w-full bg-white justify-center">
              test
            </Column>
            <Column tailwindClasses="h-full w-full bg-white justify-center">
              test2
            </Column>
          </Row>
          <Modal />
          <Notification />
        </div>
      </div>
    </ViewportHook>
  )
}

export default App;
