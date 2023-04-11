import { Avatar, Box, Button, TextField } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { style } from '@mui/system';
import ENDPOINTS from 'Endpoints';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import RequestContext from 'store/RequestContext';
import ProfileTabs from './ProfileTabs';
import styles from './styles/AppProfile.module.scss';

export default function AppEditPassword({ userId, displaySuccess, displayError }) {
  const reqCtx = useContext(RequestContext);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    try {
      setIsLoading(true);

      e.preventDefault();
      const currentPassword = e.target.password.value;
      const newPassword = e.target.newpassword.value;
      const body = {
        userId,
        currentPassword,
        newPassword,
      };

      const res = await reqCtx.putRequest(ENDPOINTS.changePassword, body, false);
      if (res?.ok) {
        displaySuccess.current.update((await res.json()).msg);
      } else {
        displayError.current.update((await res.json()).msg);
      }
    } finally {
      setIsLoading(false);
    }
  };

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
    <form onSubmit={onSubmit}>
        <p style={{ marginTop: '2rem', color: 'rgba(255, 255, 255, 0.8)', fontSize: '2vw' }}>Password</p>
      <Box>
        <TextField sx={buttonStyle} id="password" label="Old password" type="password" margin="normal" fullWidth />
      </Box>
      <Box>
        <TextField sx={buttonStyle} id="newpassword" label="New password" type="password" margin="normal" fullWidth />
      </Box>
      <Box>
        <Button disabled={isLoading} variant="contained" type="submit" size="large" sx={{ mt: 2 }}>
          Change password
        </Button>
      </Box>
    </form>
  );
}
