import { useEffect, useState } from "react";
import Input from "../../components/input/Input";
import { Eye, EyeOff } from "lucide-react";
import Button from "../../components/button/Button";
import { authenticate } from "../../services/auth/authenticate";
import {
  setNotificationMessage,
  setNotificationOpen,
  setNotificationSeverity,
} from "../../components/notification/notificationSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { setAuthMode, setUser } from "./authSlice";
import { clsx } from "clsx";
import { getDocumentById } from "../../services/db/getData";
import { setEntireButtonLoadState } from "../../components/button/buttonLoadSlice";
import Cookies from "js-cookie";

const AuthPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const viewport = useAppSelector((state) => state.viewport);
  const auth = useAppSelector((state) => state.auth.authMode);
  const buttonLoad = useAppSelector((state) => state.buttonLoad.buttonIdentify === 'login-button')

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState({
    email: false,
    password: false,
  });
  const handleToggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  
  useEffect(() => {
    console.log(auth);
  }, [auth]);

  const handleLogin = async () => {
    setEntireButtonLoadState({buttonLoad: true, buttonIdentify: 'login-button'})
    const emailError = email.trim() === "";
    const passwordError = password.trim() === "";

    if (emailError || passwordError) {
      setFieldErrors({ email: emailError, password: passwordError });
      dispatch(setNotificationOpen(true));
      dispatch(setNotificationSeverity("error"));
      dispatch(setNotificationMessage("Please fill out all of the fields"));
      return;
    }

    setFieldErrors({ email: false, password: false });

    try {
      setError(null);
      const userCredential = await authenticate(email, password);
      if (userCredential.user) {
        const uid = userCredential.user.uid;
        const userData = await getDocumentById("Users", uid);
        if (userData) {
          console.log(userData)
          dispatch(
            setUser({
              UserFName: userData.UserFName,
              UserLName: userData.UserLName,
              UserEmail: userData.UserEmail,
            })
          );
          dispatch(setAuthMode(false));
          Cookies.set('authentication', userCredential.user.uid)
        }
      }
    } catch (err: any) {
      dispatch(setNotificationOpen(true));
      dispatch(setNotificationSeverity("error"));
      dispatch(
        setNotificationMessage("Invalid credentials, please try again.")
      );
    }
  };

  return (
    <div
      className={clsx(
        "bg-white py-2 px-4 rounded-2xl",
        viewport.type !== "desktop"
          ? viewport.type === "mobile"
            ? "w-11/12"
            : "w-8/12"
          : "w-1/3"
      )}
    >
      <div className="flex flex-row justify-center w-full">
        <div className="font-primary text-black mb-5 text-3xl">Login</div>
      </div>
      <Input
        label="Email"
        type="text"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (fieldErrors.email) {
            setFieldErrors((prev) => ({ ...prev, email: false }));
          }
        }}
        helperText="Eamil is a required field"
        error={fieldErrors.email}
      />
      <Input
        label="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (fieldErrors.password) {
            setFieldErrors((prev) => ({ ...prev, password: false }));
          }
        }}
        endAdornment={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        onEndAdornmentClick={handleToggleVisibility}
        helperText="Eamil is a required field"
        error={fieldErrors.password}
      />
      {error && (
        <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
      )}
      <div className="flex flex-row justify-center w-full">
        <Button
          text="Login"
          loading={buttonLoad}
          onClick={handleLogin}
          bgColor="bg-primary"
          textColor="text-white"
        />
      </div>
    </div>
  );
};

export default AuthPage;
