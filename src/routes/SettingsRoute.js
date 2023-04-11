import { Divider } from '@mui/material';
import AppDeleteAccount from 'components/AppDeleteAccount';
import AppEditPassword from 'components/AppEditPassword';
import AppEditProfile from 'components/AppEditProfile';
import ErrorAlert from 'components/ErrorAlert';
import SuccessAlert from 'components/SuccessAlert';
import React, { useContext, useEffect, useRef } from 'react';
import UserContext from 'store/UserContext';

function SettingsRoute() {
  const successAlertRef = useRef(null);
  const errorAlertRef = useRef(null);
  const userCtx = useContext(UserContext);

  return (
    <div className="page">
      <SuccessAlert ref={successAlertRef} />
      <ErrorAlert ref={errorAlertRef} />
      <AppEditProfile
        userId={userCtx.ReadJWT().userID}
        displaySuccess={successAlertRef}
        displayError={errorAlertRef}
      ></AppEditProfile>
      <Divider sx={{ mt: '2rem' }}></Divider>
      <AppEditPassword
        userId={userCtx.ReadJWT().userID}
        displaySuccess={successAlertRef}
        displayError={errorAlertRef}
      ></AppEditPassword>
      <Divider sx={{ mt: '2rem' }}></Divider>
      <AppDeleteAccount user={userCtx} displaySuccess={successAlertRef} displayError={errorAlertRef}></AppDeleteAccount>
    </div>
  );
}

export default SettingsRoute;
