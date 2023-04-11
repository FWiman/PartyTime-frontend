import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ENDPOINTS from 'Endpoints';
import * as React from 'react';
import { useContext, useRef, useState } from 'react';
import RequestContext from 'store/RequestContext';
import ErrorAlert from './ErrorAlert';

function AppSignup() {
  const reqCtx = useContext(RequestContext);
  const [firstCheck, setFirstCheck] = useState(false);
  const [lastCheck, setLastCheck] = useState(false);
  const [bdayCheck, setBdayCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [usnCheck, setUsnCheck] = useState(false);
  const [pwdCheck, setPwdCheck] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const usn = e.target.username.value;
    const first = e.target.first.value;
    const last = e.target.last.value;
    const birth = e.target.birthday.value;
    const email = e.target.email.value;
    const pwd = e.target.password.value;
    const verify = e.target.verify.value;
    
    // Input validation

    if (usnCheck) return;

    if (!first) setFirstCheck(true);
    else setFirstCheck(false);

    if (!last) setLastCheck(true);
    else setLastCheck(false);

    if (!birth) setBdayCheck(true);
    else setBdayCheck(false);

    if (!email) setEmailCheck(true);
    else setEmailCheck(false);

    if (!pwd || pwd !== verify) setPwdCheck(true);
    else setPwdCheck(false);

    if (firstCheck || lastCheck || bdayCheck || emailCheck || usnCheck || pwdCheck) return;

    const user = {
      firstName: first,
      lastName: last,
      profileImage: "https://mynewart.se/wp-content/uploads/2016/06/Mona-Lisa.jpg",
      email: email,
      username: usn,
      password: pwd,
      dateOfBirth: birth
    }

    const res = await reqCtx.postRequestNoJwt(ENDPOINTS.register, user)

    if (res.ok) {
      alert('Registered!');
    } else {
      alert('Could not register');
    }

  };

  const checkUsername = async (e) => {
    const username = e.target.value;

    if (!username) return;

    let resp = await (await reqCtx.getRequest(ENDPOINTS.checkUsername(username))).json();
    if (resp.taken) setUsnCheck(true);
    else setUsnCheck(false);
  };

  return (
    <>
      <form onSubmit={handleRegister}>
        <Box>
          <TextField
            error={usnCheck}
            helperText={usnCheck ? 'Username Already in Use' : ''}
            id="username"
            label="User name"
            margin="normal"
            onChange={checkUsername}
            fullWidth
          />
        </Box>
        <Box>
          <TextField id="first" error={firstCheck} label="First name" margin="normal" fullWidth />
        </Box>
        <Box>
          <TextField id="last" error={lastCheck} label="Last name" margin="normal" fullWidth />
        </Box>
        <Box>
          <TextField
            id="birthday"
            error={bdayCheck}
            margin="normal"
            label="Birthday"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Box>
        <Box>
          <TextField id="email" error={emailCheck} label="Email" margin="normal" fullWidth />
        </Box>
        <Box>
          <TextField
            id="password"
            error={pwdCheck}
            helperText={pwdCheck ? 'Passwords do not match!' : ''}
            label="Password"
            type={'password'}
            margin="normal"
            fullWidth
          />
        </Box>
        <Box>
          <TextField id="verify" error={pwdCheck} label="Verify Password" type="password" margin="normal" fullWidth />
        </Box>
        <Box>
          <Button variant="contained" type="submit" size="large" sx={{ mt: 2 }}>
            Register
          </Button>
        </Box>
      </form>
    </>
  );
}

export default AppSignup;
