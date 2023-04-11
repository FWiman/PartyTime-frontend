import ENDPOINTS from 'Endpoints';
import React, { useContext, useEffect, useState } from 'react';
import RequestContext from 'store/RequestContext';
import UserContext from 'store/UserContext';
import uniqId from '../../uniq';
import classes from '../styles/Headlines.module.css';
import AppEventsItem from './AppEventsItem';

function AppFavoriteEventsList({ variant, mode }) {
  const userCtx = useContext(UserContext);
  const reqCtx = useContext(RequestContext);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedFavorites, setLoadedFavorites] = useState([]);

  useEffect(() => {
    const conv = async () => {
      setIsLoading(true);
      let response;

      if (mode === 'favorites') {
        const response = await reqCtx.getRequest(ENDPOINTS.getFavoriteEvents(userCtx.ReadJWT().userID));
        const converted = await reqCtx.convertResponse(response);
        setLoadedFavorites(converted);
        setIsLoading(false);
      }

      if (mode === 'reviews') {
        const response = await reqCtx.getRequest(ENDPOINTS.getReviewedEvents(userCtx.ReadJWT().userID));
        const converted = await reqCtx.convertResponse(response);
        setLoadedFavorites(converted);
        setIsLoading(false);
      }

      if (mode == 'activities') {
        const response = await reqCtx.getRequest(ENDPOINTS.getEventsByUser(userCtx.ReadJWT().userID));
        const converted = await reqCtx.convertResponse(response);
        setLoadedFavorites(converted);
        setIsLoading(false);
      }
    };
    conv();
  }, []);

  if (isLoading) {
    return (
      <div className={classes.wrapper}>
        <p className={classes.content}>Loading...</p>
      </div>
    );
  }

  if (loadedFavorites.length === 0) {
    return (
      <div className={classes.wrapper}>
        <p className={classes.content}>You have no favorites</p>
      </div>
    );
  }

  return (
    <div className="card-wrapper">
      {loadedFavorites.map((event) => (
        <AppEventsItem mode={mode} key={uniqId()} event={event} variant={variant} />
      ))}
    </div>
  );
}

export default AppFavoriteEventsList;
