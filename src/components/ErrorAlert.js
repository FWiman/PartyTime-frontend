import { Message } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, AlertTitle, Button, IconButton, Snackbar } from '@mui/material';
import React, { forwardRef, Fragment, useImperativeHandle, useState } from 'react';

const ErrorAlert = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  useImperativeHandle(ref, () => ({
    async update(message) {
      setMessage(message);
      setOpen(true);
    },
  }));

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <Alert variant="filled" onClose={handleClose} severity="error" sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
});

export default ErrorAlert;
