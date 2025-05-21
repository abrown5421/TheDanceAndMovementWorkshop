import React, { useState } from 'react';
import Block from '../../components/block/Block';
import Input from '../../components/input/Input';
import { useAdminNavigationHook } from '../../hooks/AdminNavigationHook';
import { authenticate, getAuthUID } from '../../services/auth/authenticate';
import { Eye, EyeClosed } from 'lucide-react';
import { setEntireNotification } from '../../components/notification/notificationSlice';
import { useAppDispatch } from '../../app/store/hooks';
import { setAdminAuth, setAdminUser, setAdminUserStaffDoc } from './adminSlice';
import { getDocumentById } from '../../services/db/getData';
import type { AdminUser, AdminUserStaffDoc } from './adminTypes';
import Cookies from 'js-cookie';

const AdminAuth: React.FC = () => {
  const dispatch = useAppDispatch();
  const handleAdminNavigation = useAdminNavigationHook();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  const validateFields = () => {
    const newErrors = { email: '', password: '' };
    let hasError = false;

    if (!email.trim()) {
        newErrors.email = 'This field is required';
        hasError = true;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = 'Please format as an email';
        hasError = true;
    }

    if (!password.trim()) {
        newErrors.password = 'This field is required';
        hasError = true;
    }

    return { hasError, newErrors };
    };

    const handleAuth = async () => {
    const { hasError, newErrors } = validateFields();
    setErrors(newErrors);

    if (hasError) {
        const hasFormatError = newErrors.email === 'Please format as an email';
        dispatch(setEntireNotification({
            notificationOpen: true,
            notificationSeverity: 'error',
            notificationMessage: hasFormatError
                ? 'There are errors in your form'
                : 'Please fill out all fields'
        }));
        return;
    }

    try {
        await authenticate(email, password);
        const uid = await getAuthUID();
        const userDoc = await getDocumentById("Users", uid);
        const staffDoc = await getDocumentById("Staff", uid);
        Cookies.set('authentication', uid, { expires: 1 })
        
        if (userDoc) {
            dispatch(setAdminUser(userDoc as AdminUser));
        } else {
            console.warn(`No user document found for UID: ${uid}`);
        }

        if (staffDoc) {
            dispatch(setAdminUserStaffDoc(staffDoc as AdminUserStaffDoc));
        } else {
            console.warn(`No staff document found for UID: ${uid}`);
        }

        dispatch(setAdminAuth(true));
        handleAdminNavigation('Dash');
    } catch (err: any) {
        console.log(err)
        dispatch(setEntireNotification({
            notificationOpen: true,
            notificationSeverity: 'error',
            notificationMessage: 'We were unable to authenticate your account.'
        }));
    }
    };

  return (
    <Block tailwindClasses="w-11/12 md:w-2/3 lg:w-1/3 rounded-xl p-5 shadow flex flex-col justify-between bg-white">
      <Block tailwindClasses='flex flex-row flex-1 w-full justify-center items-center'>
        <Block tailwindClasses='font-primary text-4xl text-black'>TDAMW Login</Block>
      </Block>
      <Block tailwindClasses='flex flex-col flex-1 w-full justify-center items-center p-5'>
        <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
        />
        <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={showPassword ? <EyeClosed /> : <Eye />}
            onEndAdornmentClick={() => setShowPassword(!showPassword)}
            error={!!errors.password}
            helperText={errors.password}
        />
      </Block>
      <Block
          as="button"
          children="Login"
          tailwindClasses="mt-5 bg-primary text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-secondary transition"
          onClick={handleAuth}
      />
    </Block>
  );
};

export default AdminAuth;
