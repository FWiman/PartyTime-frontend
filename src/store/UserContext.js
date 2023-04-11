import ENDPOINTS from 'Endpoints';
import React, { createContext, useState } from 'react';

//Refrenace methods to be shown in intellisense
const UserContext = createContext({
  LogInUser: null,
  LogOutUser: null,
  IsLoggedIn: null,
  ReadJWT: null,
});

export function UserContextProvider(props) {
  async function LogInUser(username, password) {
    //save token along with userid in sessionStorage
    const resp = await fetch(ENDPOINTS.login, {
      method: 'post',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify({ Username: username, Password: password }),
    });

    if (resp.status !== 200) {
      return false;
    } else {
      const json = await resp.json();
      SaveJWT(json.token, json.userId);
      return true;
    }
  }

  function LogOutUser() {
    RemoveJWT();
  }

  function IsLoggedIn() {
    if (sessionStorage.getItem('JWT')) {
      return true;
    } else {
      return false;
    }
  }

  function SaveJWT(JWT, userID) {
    const key = 'JWT';
    const value = JSON.stringify({ jwt: JWT, userID: userID });
    sessionStorage.setItem(key, value);
  }

  function RemoveJWT() {
    sessionStorage.removeItem('JWT');
  }

  function ReadJWT() {
    const JwtToken = sessionStorage.getItem('JWT');
    const JWTInfo = JSON.parse(JwtToken);
    return JWTInfo;
  }

  //Reference methods in this object to be passed as value
  const context = {
    LogInUser: LogInUser,
    LogOutUser: LogOutUser,
    IsLoggedIn: IsLoggedIn,
    ReadJWT: ReadJWT,
  };

  return <UserContext.Provider value={context}>{props.children}</UserContext.Provider>;
}

export default UserContext;
