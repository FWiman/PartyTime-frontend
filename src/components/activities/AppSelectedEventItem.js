import {
  Comment,
  CommentsDisabled,
  DataUsageSharp,
  DateRange,
  Description,
  EighteenUpRatingRounded,
  Favorite,
  HeartBroken,
  LocationCity,
  Pin,
  PinRounded,
  Place,
  Send
} from '@mui/icons-material';

import { Button, TextField } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RequestContext from 'store/RequestContext';
import ENDPOINTS from '../../Endpoints';
import userContext from '../../store/UserContext';
import SuccessAlert from '../ErrorAlert';
import classes from '../styles/AppSelectedEvent.module.css';
import ErrorAlert from '../SuccessAlert';
import AppGetComments from './AppGetComments';

function AppSelectedEventItem(props) {
  const [show, setShow] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const successAlertRef = useRef(null);
  const errorAlertRef = useRef(null);
  const userCtx = useContext(userContext);
  const reqCtx = useContext(RequestContext);
  const navigateTo = useNavigate();

  const selectedId = JSON.parse(localStorage.getItem('selectedId'));

  useEffect(() => {
    const conv = async () => {
      const response = await reqCtx.getRequest(ENDPOINTS.getUserReviews(userCtx.ReadJWT().userID));
      const converted = await response.json();

      for (let i = 0; i < converted.length; i++) {
        if (converted[i].id === selectedId.id) {
          if (converted[i].comments[0].liked === true) {
            setFavorite(true);
          } else {
            setFavorite(false);
          }
        }
      }
    };
    conv();
  }, []);

  const toggleFavoriteStatusHandler = async () => {
    if (!userCtx.IsLoggedIn()) {
      successAlertRef.current.update('You are not logged in and will be redirected to login page');
      setTimeout(() => {
        navigateTo('/login');
      }, 2500);
    }
    
    var like = null

    if (favorite) {
      setFavorite(false);
      like = false
    } else {
      like = true
      setFavorite(true);
    }
    
    const today = new Date(Date.now());

    const data = {
      like: like,
      comment: '',
      created: today.toISOString(),
    };
    const res = await reqCtx.postRequest(ENDPOINTS.postReview(selectedId.id), data);
  };

  async function onCommentSubmit(e) {
    if (!userCtx.IsLoggedIn()) {
      successAlertRef.current.update('You are not logged in and will be transferred to login page');
      setTimeout(() => {
        navigateTo('/login');
      }, 2500);
    }

    e.preventDefault();
    setComments((comments) => [...comments, comment]);

    const data = {
      Like: favorite,
      Comment: comment,
      Created: new Date(Date.now()).toISOString(),
    };
    
    const res = await reqCtx.postRequest(ENDPOINTS.postReview(selectedId.id), data);

    if (res.status !== 200) {
      successAlertRef.current.update('Something Went Wrong! Hehe');
    } else {
      errorAlertRef.current.update('You Posted a Comment, What A Lad :O');
    }
  }

  const getComments = () => {
    if (!userCtx.IsLoggedIn()) {
      successAlertRef.current.update('You must login to see comments');
      setTimeout(() => {
        navigateTo('/login');
      }, 3000);
    } else setShow(!show);
  };

  const onCommentChange = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  const date = selectedId.planned.split('T');
  const newdate = date[0];

  const image = selectedId.image === '' ? 'icons/logo.svg' : selectedId.image;

  let content = <AppGetComments />;

  return (
    <div className={classes.infocontainer}>
      <div className={classes.imageContainer} style={{ backgroundImage: `url(${image})` }} />
      <SuccessAlert ref={successAlertRef}></SuccessAlert>
      <ErrorAlert ref={errorAlertRef}></ErrorAlert>
      <div className={classes.innerItem}>
        <p className={classes.title}>{selectedId.title}</p>
        <div className={classes.upperInfo}>
          <div className={classes.placeInfo}>
            <div className={classes.infosec}>
              <DateRange />
              <p>{newdate}</p>
            </div>
            <div className={classes.infosec}>
              <Place />
              <p>{selectedId.location.address}</p>
            </div>
            <Button
              onClick={toggleFavoriteStatusHandler}
              variant="contained"
              style={{ marginRight: '1rem' }}
              color="error"
            >
              {favorite ? <Favorite></Favorite> : <HeartBroken></HeartBroken>}
            </Button>
          </div>
        </div>

        <div className={classes.desc}>
          <p>{selectedId.description}</p>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <Button onClick={getComments} variant="contained">
            {show ? <a>Show comments</a> : <a>Dont show comments</a>}
          </Button>
        </div>
      </div>

      {!show && (
        <div className={classes.commentsContainer}>
          {content}
          <TextField onChange={onCommentChange} variant="filled" sx={{ width: '85%', marginTop: '2rem' }}></TextField>
          <Button onClick={onCommentSubmit} variant="contained">
            <Send />
          </Button>
        </div>
      )}
    </div>
  );
}

// setShow(!show)

export default AppSelectedEventItem;
