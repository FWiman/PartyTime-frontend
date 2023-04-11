import { Card } from '@mui/material';
import AppFavoriteEventsList from 'components/activities/AppGetReviews';
import ENDPOINTS from 'Endpoints';
import React, { useContext, useEffect, useState } from 'react';
import RequestContext from 'store/RequestContext';
import UserContext from 'store/UserContext';

function ProfileReviewsTab() {
  return (
    <div className="tab">
      <AppFavoriteEventsList mode={'reviews'} variant={'event'} />
    </div>
  );
}

export default ProfileReviewsTab;
