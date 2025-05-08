import { useAppDispatch } from "../../app/store/hooks";
import { setEntireNotification } from "../../components/notification/notificationSlice";

function HomePage() {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(setEntireNotification({
      notificationOpen: true,
      notificationSeverity: 'success',
      notificationMessage: 'This is an Error Note',
    }));
  }
  return (
    <>
      <div onClick={handleClick}>click</div>
    </>
  )
}

export default HomePage;
