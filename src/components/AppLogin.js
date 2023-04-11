import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from 'store/UserContext';
import ErrorAlert from './ErrorAlert';
import SuccessAlert from './SuccessAlert';

export default function AppSignup() {
  // Needed to access our ErrorAlert and update state
  const errorAlertRef = useRef(null);
  const successAlertRef = useRef(null);
  const userCtx = useContext(UserContext);
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const Username = e.target.username.value;
    const Password = e.target.password.value;

    if (!(await userCtx.LogInUser(Username, Password))) {
      errorAlertRef.current.update('Wrong Username or Password!');
    } else {
      successAlertRef.current.update('Successfully Logged in!');
      navigateTo('/');
    }
  };
  return (
    <>
      <form onSubmit={handleLogin}>
        <ErrorAlert ref={errorAlertRef}></ErrorAlert>
        <SuccessAlert ref={successAlertRef}></SuccessAlert>
        <Box>
          <TextField id="username" label="Username" margin="normal" fullWidth={true} />
        </Box>
        <Box>
          <TextField type="password" id="password" label="Password" margin="normal" fullWidth={true} />
        </Box>
        <Box>
          <Button variant="contained" type="submit" size="large" sx={{ mt: 2 }}>
            Login
          </Button>
        </Box>
      </form>
    </>
  );
}
