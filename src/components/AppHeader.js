import MapIcon from '@mui/icons-material/Map';
import { AppBar, Box, Toolbar } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import AppAvatar from './AppAvatar';
import AppLogo from './AppLogo';
import AppMenu from './AppMenu';
import styles from './styles/AppHeader.module.scss';


const AppHeader = (props) => {
  return (
    <AppBar sx={{ bgcolor: '#ffffff00', boxShadow: '1px 5px 20px rgba(21, 103, 185, 0.57)' }} position="sticky">
      {/* Left */}
      <Toolbar className={styles.header}>
        <a className={styles.link} href="/">
          <div className={styles.filler}>
            <div>
            <MapIcon/>
            </div>
            <p>Back to map</p>
          </div>
        </a>

        {/* Center */}
        <AppLogo className={styles.logo}/>

        {/* Right */}
        <div className={styles.right}>
          <AppAvatar/>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
