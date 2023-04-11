import ENDPOINTS from 'Endpoints';
import React, { useContext, useEffect, useState } from 'react';
import RequestContext from 'store/RequestContext';
import UserContext from 'store/UserContext';
import uniqId from '../../uniq';
import classes from '../styles/Headlines.module.css';
import AppCommentItem from './AppCommentItem';
import AppEventsItem from './AppEventsItem';

function AppFavoriteEventsList({ variant }) {
  const userCtx = useContext(UserContext);
  const reqCtx = useContext(RequestContext);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedFavorites, setLoadedFavorites] = useState([]);

  useEffect(() => {
    const conv = async () => {
      setIsLoading(true);
      const response = await reqCtx.getRequest(ENDPOINTS.getUserReviews(userCtx.ReadJWT().userID));
      const converted = await reqCtx.convertResponse(response);
      setLoadedFavorites(converted);
      setIsLoading(false);
    };
    conv();
  }, []);

  if (isLoading) {
    return (
      <div className={classes.wrapper}>
        <h2 className={classes.content}>Loading...</h2>
      </div>
    );
  }

  return (
    <div className="card-wrapper">
      {loadedFavorites.map((event) => (
        <AppCommentItem key={uniqId()} event={event} variant={variant} />
      ))}
    </div>
  );
}

export default AppFavoriteEventsList;
