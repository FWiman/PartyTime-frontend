import React from 'react';
import AppEventsList from '../components/activities/AppEventsList';
import classes from '../components/styles/Headlines.module.css';

function AllMeetups() {
  return (
    <div className={classes.wrapper}>
      <AppEventsList />
    </div>
  );
}

export default AllMeetups;
