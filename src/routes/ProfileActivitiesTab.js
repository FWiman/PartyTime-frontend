import AppFavoriteEventsList from 'components/activities/AppGetReviews';
import React from 'react';

function ProfileActivitiesTab() {
  return (
    <div className="tab">
      <AppFavoriteEventsList mode={'activities'} variant={'activities'} />
    </div>
  );
}

export default ProfileActivitiesTab;
