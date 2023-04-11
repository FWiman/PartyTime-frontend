import AppMap from 'components/AppMap';
import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProfileActivitiesTab from 'routes/ProfileActivitiesTab';
import ProfileFavoritesTab from 'routes/ProfileFavoritesTab';
import ProfileReviewsTab from 'routes/ProfileReviewsTab';
import SettingsRoute from 'routes/SettingsRoute';
import SignupRoute from 'routes/SignupRoute';
import GMapContext from 'store/GMapContext';
import './App.scss';
import AppNewActivityForm from './components/activities/AppNewEvent';
import AppHeader from './components/AppHeader';
import ActivitiesRoute from './routes/ActivitiesRoute';
import FavoritesRoute from './routes/FavoritesRoute';
import HomeRoute from './routes/HomeRoute';
import LoginRoute from './routes/LoginRoute';
import MapRoute from './routes/MapRoute';
import ProfileRoute from './routes/ProfileRoute';
import SelectedActivityRoute from './routes/SelectedActivityRoute';

function App() {

  const key = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const gmapCtx = useContext(GMapContext)

  function initMap() {
    gmapCtx.set(true)
  }

  function loadScript() {
    var url = `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=initMap`
    var script = window.document.createElement("script")
    script.src = url
    script.defer = true
    script.async = true
    document.head.appendChild(script)
  }


  function renderMap() {
    loadScript()
    window.initMap = initMap;

  }

  useEffect(() => {
    renderMap();
  }, [])

  return (
    <div className="wrapper">
      <AppHeader></AppHeader>
      <Routes>
        <Route path="/" element={<AppMap/>} />
        <Route path="/profile" element={<ProfileRoute />}>
          <Route index element={<ProfileFavoritesTab />} />
          <Route path="/profile/reviews" element={<ProfileReviewsTab />} />
          <Route path="/profile/created" element={<ProfileActivitiesTab />} />
        </Route>
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/settings" element={<SettingsRoute />} />
        <Route path="/signup" element={<SignupRoute />} />
        <Route path="/events/location/:id" element={<ActivitiesRoute />} />
        <Route path="/new-events" element={<AppNewActivityForm />} />
        <Route path="/favorites" element={<FavoritesRoute />} />
        <Route path="/events/selected" element={<SelectedActivityRoute />} />
      </Routes>
    </div>
  );
}

export default App;
