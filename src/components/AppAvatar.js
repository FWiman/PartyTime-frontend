import FastfoodIcon from '@mui/icons-material/Fastfood';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Divider, List, SwipeableDrawer } from '@mui/material';
import ENDPOINTS from 'Endpoints';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import RequestContext from 'store/RequestContext';
import UserContext from 'store/UserContext';
import AppMenuItem from './AppMenuItem';
import styles from './styles/AppAvatar.module.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AppAvatar() {
  const reqCtx = useContext(RequestContext);
  const userCtx = useContext(UserContext);

  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigateTo = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [user, setUser] = useState({ profileImage: '' });

  const getImage = async () => {
    if (userCtx.IsLoggedIn()) {
      const res = await reqCtx.getRequestJWT(ENDPOINTS.getUser(userCtx.ReadJWT().userID));
      const json = await res.json();

      if (res.ok) {
        setUser(json);
      }
    } else {
      setUser({ profileImage: '' });
    }
  };

  useEffect(() => {
    getImage();
    handleClose();
  }, [location]);

  const logout = () => {
    userCtx.LogOutUser();
    getImage();
    navigateTo('/');
  };

  const drawer = (
    <SwipeableDrawer className={styles.right} anchor="right" open={open} onClose={handleClose} onOpen={handleOpen}>
      <div className={styles.drawer}>
        <List>
          <div className={styles.flyoutinfo}>
            <div className={styles.flyoutimage} style={{ backgroundImage: `url(${user.profileImage})` }} />
            <p className={styles.flyoutusername}>{user.username}</p>
          </div>

          {userCtx.IsLoggedIn() && (
            <div>
              <AppMenuItem icon={<PersonIcon />} name="Profile" url="/profile"></AppMenuItem>
              <AppMenuItem icon={<SettingsIcon />} name="Settings" url="/settings"></AppMenuItem>
            </div>
          )}
          {!userCtx.IsLoggedIn() && (
            <div>
              <AppMenuItem icon={<LoginIcon />} name="Log in" url="/login"></AppMenuItem>
              <AppMenuItem icon={<FastfoodIcon />} name="Sign up" url="/signup"></AppMenuItem>
            </div>
          )}
        </List>
        {userCtx.IsLoggedIn() && (
          <div>
            <List>
              <AppMenuItem icon={<LogoutIcon />} name="Logout" onClick={logout}></AppMenuItem>
            </List>
          </div>
        )}
      </div>
    </SwipeableDrawer>
  );

  return (
    <>
      <Avatar src={user.profileImage} onClick={handleOpen}></Avatar>
      {drawer}
    </>
  );
}
