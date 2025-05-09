import Card from "../../components/cards/Card";
import CardMedia from "../../components/cards/CardMedia";
import CardBody from "../../components/cards/CardBody";
import CardFooter from "../../components/cards/CardFooter";
import Deck from "../../components/cards/Deck";
import './events.css'
function EventPage() {
  
  return (
    <>
    <Deck cardsPerRow={3} rowHeight="h-1/2" wrap={true}>
      {[1, 2, 3, 4, 5].map((item) => (
        <Card key={item} onClick={() => console.log(item)}>
          <CardMedia image="https://images.unsplash.com/photo-1662207188435-1f39465f141a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
            <div className="absolute top-2 right-2 flex items-start justify-end px-3 py-1 rounded-4xl text-black overlay">
              Overlay
            </div>
          </CardMedia>
          <CardBody>
            <h3 className="text-lg font-semibold">Card Title</h3>
            <p className="text-sm text-gray-600">Card description...</p>
          </CardBody>
          <CardFooter>
            <button className="text-blue-500 hover:underline">Action</button>
          </CardFooter>
        </Card>
      ))}
    </Deck>
    </>
  )
}

export default EventPage;
