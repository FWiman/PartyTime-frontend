import { ExpandMore, Favorite as FavoriteIcon } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography
} from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import RequestContext from 'store/RequestContext';
import ENDPOINTS from '../../Endpoints';
import FavoritesContext from '../../store/FavoritesContext';
import requestContext from '../../store/RequestContext';
import userContext from '../../store/UserContext';
import classes from '../styles/AppEvents.module.css';
import AppGetComments from './AppGetComments';

function AppEventsItem({ event, variant, mode}) {
  const favoritesCtx = useContext(FavoritesContext);
  const itemIsFavorite = favoritesCtx.itemIsFavorite(event.id);
  const navigateTo = useNavigate();
  const [favorite, setFavorite] = useState(false);

  const selectedId = JSON.parse(localStorage.getItem('selectedId')) || [];

  const userCtx = useContext(userContext);
  const reqCtx = useContext(requestContext);

  const date = new Date(event.planned).toLocaleDateString();

  useEffect(() => {
    const conv = async () => {
      const response = await reqCtx.getRequest(ENDPOINTS.getUserReviews(userCtx.ReadJWT().userID));
      const converted = await reqCtx.convertResponse(response);

      for (let i = 0; i < converted.length; i++) {
        if (converted[i].id === selectedId.id) {
          if (converted[i].likes === 1) {
            setFavorite(true);
          } else {
            setFavorite(false);
          }
        }
      }
    };
    conv();
  }, []);

  const goToEvent = () => {
    localStorage.setItem('selectedId', JSON.stringify(event));
    navigateTo(`/events/selected`);
  };

  const capText = (input, maxLength) => {
    return input.length > maxLength ? `${input.substring(0, maxLength - 3)}...` : input;
  };

  const toggleFavoriteStatusHandler = async () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    if (favorite) {
    }

    const data = {
      like: favorite ? false : true,
      comment: '',
      created: today.toISOString(),
    };
    const res = await reqCtx.postRequest(ENDPOINTS.postReview(selectedId.id), data);

    setFavorite(favorite ? false : true);
  };

  return (
    <Card onClick={goToEvent} sx={{backgroundColor: 'rgba(255, 255, 255, 0.15)', borderRadius: '10px', color: 'white', boxShadow: 'none', fontFamily: 'SeoulHangang'}} className="card-event">
      <CardActionArea>
        <CardMedia className="card-media" component="img" height="160" image={event.image} />
     
      <CardContent>
        <Typography sx={{fontFamily: 'SeoulHangang'}} gutterBottom variant="h5" component="div">
          {event.title}
        </Typography>
        <Typography sx={{fontFamily: 'SeoulHangang', color: 'white'}} variant="body1" color="text.secondary">
          {capText(event.description, 40)}
        </Typography>
        <p>{event.city}</p>
        <p>{event.address}</p>
        <p>{date}</p>
      </CardContent>
      {variant === 'favorite' ? (
        <div></div>
      ) : (
        <div>
          {event.comments.map((event) => {
            return (
              <div className="card-review-comment">
                <p className="card-review-comment-title">{event.username}</p>
                <p className="card-review-comment">{event.comment}</p>
              </div>
            );
          })}
        </div>
      )}
       </CardActionArea>
    </Card>
  );
}

export default AppEventsItem;