import { Delete } from '@mui/icons-material';
import { Avatar, Box, Button, TextField } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { style } from '@mui/system';
import ENDPOINTS from 'Endpoints';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import RequestContext from 'store/RequestContext';
import ProfileTabs from './ProfileTabs';
import styles from './styles/AppProfile.module.scss';

export default function AppDeleteAccount({ user, displaySuccess, displayError }) {
  const reqCtx = useContext(RequestContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigateTo = useNavigate();

  const onSubmit = async (e) => {
    try {
      setIsLoading(true);
      e.preventDefault();

      const res = await reqCtx.deleteRequest(ENDPOINTS.deleteUser);
      if (res?.ok) {
        user.LogOutUser();
        navigateTo('/login');
      } else {
        displayError.current.update('Error deleting account');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Box sx={{ mt: '1rem' }}>
        <Button disabled={isLoading} variant="contained" type="submit" size="large" color="error" sx={{ mt: 2 }}>
          <Delete></Delete> DELETE ACCOUNT
        </Button>
      </Box>
    </form>
  );
}
