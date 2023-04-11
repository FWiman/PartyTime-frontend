import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';


const buttonStyle = {
    color: 'white',
    display: 'flex',
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.114)',
    marginBottom: '1vh',
    borderRadius: '5px',

    "&:hover": {
      backgroundColor: '#ffffff70;'
    },
  };

  const textStyle = {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '40px',

    "&:hover": {
      backgroundColor: '#fffff000;'
    },
  };

const AppMenuItem = ({ name, url = null, icon = null, onClick = null }) => {
  if (!onClick) {
    return (
      <ListItem key={name} disablePadding component={Link} to={url}>
        <ListItemButton sx={buttonStyle}>
          {icon && <ListItemIcon>{icon}</ListItemIcon>}
          <ListItemText sx={textStyle} primary={name} />
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <ListItem onClick={onClick} key={name} disablePadding>
      <ListItemButton sx={buttonStyle}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  );
};

export default AppMenuItem;
