import React, { createContext } from 'react';

//Refrenace methods to be shown in intellisense
const StorageContext = createContext({
  SaveJWT: null,
  RemoveJWT: null,
  ReadJWT: null,
});

export function StorageContextProvider(props) {
  //Functions to handle JWT token
  function SaveJWT(JWT, userID) {
    const key = 'JWT';
    const value = JSON.stringify({ jwt: JWT, userID: userID });
    localStorage.setItem(key, value);
  }

  function RemoveJWT() {
    const key = 'JWT';
    localStorage.removeItem(key);
  }

  function ReadJWT() {
    const key = 'JWT';
    const JwtToken = localStorage.getItem(key);
    const JWTInfo = JSON.parse(JwtToken);
    return JWTInfo;
  }

  //Functions to handle imageupload
  //Reference methods in this object to be passed as value
  const context = {
    SaveJWT: SaveJWT,
    RemoveJWT: RemoveJWT,
    ReadJWT: ReadJWT,
  };

  return <StorageContext.Provider value={context}>{props.children}</StorageContext.Provider>;
}

export default StorageContext;
