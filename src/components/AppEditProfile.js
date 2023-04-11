import { Avatar, Box, Button, Stack, TextField } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { style } from '@mui/system';
import ENDPOINTS from 'Endpoints';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import RequestContext from 'store/RequestContext';
import ProfileTabs from './ProfileTabs';
import styles from './styles/AppProfile.module.scss';

export default function AppEditProfile({ userId, displaySuccess, displayError }) {
  const reqCtx = useContext(RequestContext);
  const [user, setUser] = useState(null);
  const [tempUser, setTempUser] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await reqCtx.getRequestJWT(ENDPOINTS.getUser(userId));
        const data = await res.json();

        setUser(data);
        setTempUser(data);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  const onCancel = async (e) => {
    e.preventDefault();
    setTempUser(user);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let resp = await reqCtx.putRequest(ENDPOINTS.editUser(tempUser.id), tempUser);
    if (resp.status === 200) {
      displaySuccess.current.update((await resp.json()).msg);
    } else {
      displayError.current.update((await resp.json()).msg);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user</div>;
  }


  const buttonStyle = {
    color: 'white',
    display: 'flex',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: '1vh',
    borderRadius: '5px',
    border: '0px',

    "&:hover": {
      backgroundColor: '#ffffff70',
    },
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <p style={{ marginTop: '2rem', color: 'rgba(255, 255, 255, 0.8)', fontSize: '2vw' }}>Profile</p>
        <Box>
          <TextField
            sx={buttonStyle}
            id="username"
            value={tempUser.username}
            label="Username"
            margin="normal"
            fullWidth
            required
            onChange={(e) => {
              setTempUser({ ...tempUser, username: e.target.value });
            }}
          />
        </Box>
        <Box>
          <TextField
            sx={buttonStyle}
            id="firstname"
            value={tempUser.firstName}
            label="Firstname"
            margin="normal"
            fullWidth
            onChange={(e) => {
              setTempUser({ ...tempUser, firstName: e.target.value });
            }}
          />
        </Box>
        <Box>
          <TextField
            sx={buttonStyle}         
            id="lastname"
            value={tempUser.lastName}
            label="Last name"
            margin="normal"
            fullWidth
            onChange={(e) => {
              setTempUser({ ...tempUser, lastName: e.target.value });
            }}
          />
        </Box>
        <Box>
          <TextField
            sx={buttonStyle}
            id="email"
            value={tempUser.email}
            label="Email"
            margin="normal"
            fullWidth
            required
            onChange={(e) => {
              setTempUser({ ...tempUser, email: e.target.value });
            }}
          />
        </Box>

        <Stack direction="row" spacing={2}>
          <Button onClick={onSubmit} variant="contained" type="submit">
            Save changes
          </Button>

          <Button onClick={onCancel} variant="outlined" type="button">
            Cancel
          </Button>
        </Stack>
      </form>
    </>
  );
}
