import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import Button from "../../components/button/Button";
import { setEntireButtonLoadState, unsetButtonLoadState } from "../../components/button/buttonLoadSlice";
import { setEntireNotification } from "../../components/notification/notificationSlice";

function HomePage() {
  const dispatch = useAppDispatch();
  const buttonLoad = useAppSelector((state) => state.buttonLoad);
  const areWeLoading = buttonLoad.buttonLoad && buttonLoad.buttonIdentify === 'click-button';

  const handleClick = () => {
    dispatch(setEntireButtonLoadState({
      buttonLoad: true,
      buttonIdentify: 'click-button'
    }))
    setTimeout(() => {
      dispatch(setEntireNotification({
        notificationOpen: true,
        notificationSeverity: 'success',
        notificationMessage: 'This is an Error Note',
      }));
      dispatch(unsetButtonLoadState())
    }, 1000)
  }
  return (
    <>
      <Button
        text="Click"
        onClick={handleClick}
        bgColor="bg-primary"
        textColor="text-white"
        loading={areWeLoading}
        className=""
        type="button"
      />
    </>
  )
}

export default HomePage;
