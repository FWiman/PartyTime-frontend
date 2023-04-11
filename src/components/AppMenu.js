import { AccountBox, AddLocationAlt } from '@mui/icons-material';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, List, SwipeableDrawer } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AppMenuItem from './AppMenuItem';
import styles from './styles/AppMenu.module.scss';
import AppFavorites from './activities/AppGetReviews';
import ActivitiesRoute from '../routes/ActivitiesRoute';

const AppMenu = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const location = useLocation();

  useEffect(() => {
    handleClose();
  }, [location]);

  const drawer = (
    <SwipeableDrawer anchor="left" open={open} onClose={handleClose} onOpen={handleOpen}>
      <div className={styles.drawer}>
        <List>
          <AppMenuItem icon={<HomeIcon />} name="Home" url="/"></AppMenuItem>
          <AppMenuItem icon={<AddLocationAlt />} name="Map" url="/map"></AppMenuItem>
          <AppMenuItem icon={<AddLocationAlt />} name="All Events" url="/events/location/:id"></AppMenuItem>
          <AppMenuItem icon={<AddLocationAlt />} name="New Event" url="/new-events"></AppMenuItem>
          <AppMenuItem icon={<AddLocationAlt />} name="Favorites" url="/favorites"></AppMenuItem>
          <AppMenuItem icon={<AddLocationAlt />} name="Event" url="/event"></AppMenuItem>
        </List>
      </div>
    </SwipeableDrawer>
  );

  return (
    <>
      <IconButton size="large" onClick={handleOpen} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      {drawer}
    </>
  );
};

export default AppMenu;
