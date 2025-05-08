import { useAppDispatch } from "../../app/store/hooks";
import Input from "../../components/input/Input";
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
      <Input
        className="mt-4"
        type="password"
        label="Password"
        placeholder="••••••••"
        error={false}
        color="purple"
        helperText="Password is required"
      />
    </>
  )
}

export default HomePage;
