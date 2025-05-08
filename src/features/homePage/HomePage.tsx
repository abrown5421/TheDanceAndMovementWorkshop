import { useAppDispatch } from "../../app/store/hooks";
import { setEntireModal } from "../../components/modal/modalSlice";

function HomePage() {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setEntireModal({
      modalOpen: true,
      modalTitle: 'My Modal Title',
      modalContent: 'Secondary',
    }));
  }
  return (
    <>
      <div onClick={handleClick}>click</div>
    </>
  )
}

export default HomePage;
