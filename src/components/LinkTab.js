import { Tab } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

export default function LinkTab(props) {
  return (
    <Tab
      component={Link}
      onClick={(event) => {
        // event.preventDefault();
      }}
      {...props}
    />
  );
}
