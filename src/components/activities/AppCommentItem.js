import { Avatar } from '@mui/material';
import Card from '@mui/material/Card';
import React from 'react';
import classes from '../styles/AppEvents.module.css';
import AppCard from '../ui/AppCard';
import { Remove } from '@mui/icons-material';

function AppCommentItem(props) {
  return (
    <AppCard>
      <Card sx={{ marginBottom: '1rem', padding: '0.5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Avatar sx={{ marginRight: '5px' }}></Avatar>
          <span style={{ marginRight: '1rem', color: 'gray', fontSize: '16px' }}>{props.comment.username}</span>
          <span style={{ fontSize: '16px' }}>{props.comment.comment}</span>
          <span><Remove/></span>
        </div>
      </Card>
    </AppCard>
  );
}

export default AppCommentItem;
