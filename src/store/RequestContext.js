import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from './UserContext';

//Refrenace methods to be shown in intellisense
const RequestContext = createContext({
  postRequest: null,
  putRequest: null,
  getRequest: null,
  convertResponse: null,
  getRequestJWT: null,
  postRequestNoJwt: null,
  deleteRequest: null,
});

export function RequestContextProvider(props) {
  const userCtx = useContext(UserContext);
  const navigateTo = useNavigate();

  async function postRequestNoJwt(endpoint, body) {
    const headers = { 'content-type': 'application/json' };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: new Headers(headers),
      body: JSON.stringify(body),
    });
    return response;
  }

  async function postRequest(endpoint, body) {
    const headers = new Headers({ 'content-type': 'application/json' });

    if (userCtx.IsLoggedIn) headers.append('authorization', `Bearer ${userCtx.ReadJWT().jwt}`);

    const response = await fetch(endpoint, {
      method: 'post',
      headers: headers,
      body: JSON.stringify(body),
    });

    // Unauthorized - Redirect to login
    if (response.status === 401) {
      userCtx.LogOutUser();
      navigateTo('/login');
      return;
    }
    return response;
  }

  async function putRequest(endpoint, body, enforceLogout = true) {
    const headers = new Headers({ 'content-type': 'application/json' });

    if (userCtx.IsLoggedIn) headers.append('authorization', `Bearer ${userCtx.ReadJWT().jwt}`);

    const response = await fetch(endpoint, {
      method: 'put',
      headers: headers,
      body: JSON.stringify(body),
    });
    // Unauthorized - Redirect to login
    if (enforceLogout && response.status === 401) {
      userCtx.LogOutUser();
      navigateTo('/login');
      return;
    }
    return response;
  }

  async function getRequest(endpoint) {
    return await fetch(endpoint, { method: 'get' });
  }

  async function getRequestJWT(endpoint) {
    const headers = { 'content-type': 'application/json' };
    if (userCtx.IsLoggedIn) headers.Authorization = `Bearer ${userCtx.ReadJWT().jwt}`;

    const response = await fetch(endpoint, {
      method: 'get',
      headers: new Headers(headers),
    });

    // Unauthorized - Redirect to login
    if (response.status === 401) {
      userCtx.LogOutUser();
      navigateTo('/login');
      return;
    }

    return response;
  }

  async function deleteRequest(endpoint) {
    const headers = { Authorization: `Bearer ${userCtx.ReadJWT().jwt}` };

    const response = await fetch(endpoint, {
      method: 'delete',
      headers: new Headers(headers),
    });

    // Unauthorized - Redirect to login
    if (response.status === 401) {
      userCtx.LogOutUser();
      navigateTo('/login');
      return;
    }

    return response;
  }

  async function convertResponse(response) {
    var json = await response.json();

    const list = [];

    for (const key in json) {
      const meetup = {
        id: key,
        ...json[key],
      };
      list.push(meetup);
    }
    return list;
  }

  //Reference methods in this object to be passed as value
  const context = {
    postRequest: postRequest,
    putRequest: putRequest,
    getRequest: getRequest,
    convertResponse: convertResponse,
    getRequestJWT: getRequestJWT,
    postRequestNoJwt: postRequestNoJwt,
    deleteRequest: deleteRequest,
  };

  return <RequestContext.Provider value={context}>{props.children}</RequestContext.Provider>;
}

export default RequestContext;
