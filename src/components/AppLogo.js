import React from 'react';
import styles from './styles/AppLogo.module.scss';

const AppLogo = (props) => {
  return (
    <a className={styles.logoWrapperLink} href="/">
      <img className={styles.logo} src={'assets/Images/logo.png'} alt={'Logo'} />
    </a>
  );
};

export default AppLogo;
