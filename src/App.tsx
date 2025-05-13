import ViewportHook from "./hooks/ViewportHook";
import Modal from "./components/modal/Modal";
import Notification from "./components/notification/Notification";
import Row from "./components/row/Row";
import Column from "./components/column/Column";
import Text from "./components/text/Text";
import Image from "./components/image/Image";
function App() {
  
  return (
    <ViewportHook>
      <div className="relative inset-0 w-screen h-screen overflow-scroll bg-black">
        <div className='main-contain bg-black'>
          <Row tailwindClasses="h-full w-full bg-white justify-center">
            <Column tailwindClasses="h-full w-full bg-white justify-center p-50">
              <Text tailwindClasses="text-5xl font-secondary">The Dance & Movement Studio</Text>
              <Text tailwindClasses="">The Dance and Movement Workshop provides supplemental dance training to dancers who seek to better their technical rolodex. We help dancers focus on their skills in tandem with their current dance studio/company commitments by hosting workshops, classes, and camps.</Text>
            </Column>
            <Column tailwindClasses="h-full w-full bg-white justify-center">
              <Image 
                src="../../../public/assets/images/hero.png" 
                alt="Lead Instructor Julia Watkins" 
                tailwindClasses="h-full"
              />
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
