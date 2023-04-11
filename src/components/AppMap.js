import AppsIcon from '@mui/icons-material/Apps';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Modal } from '@mui/material';
import ENDPOINTS from 'Endpoints';
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import GMapContext from 'store/GMapContext';
import RequestContext from 'store/RequestContext';
import UserContext from 'store/UserContext';
import gridIcon from '../icons/grid.svg';
import likeIcon from '../icons/heart.svg';
import plusIcon from '../icons/plus.svg';
import AppFavoriteEventsList from './activities/AppGetReviews';
import AppNewEvent from './activities/AppNewEvent';
import AppSelectedEventItem from './activities/AppSelectedEventItem';
import AppEvents from './AppEvents';
import AutoCompleteInput from './AutoCompleteInput';
import classes from './styles/AppMap.module.scss';

const AppMap = () => {
  const reqCtx = useContext(RequestContext);
  const gmapCtx = useContext(GMapContext);
  const userCtx = useContext(UserContext)
  
  const [mapState, setMapState] = useState({ center: { lat: 59.330936, lng: 18.071644 }, zoom: 14 });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [map, setMap] = useState({});

  const CustomButton = (props) => {
    const style = () => {
      if (userCtx.IsLoggedIn()) {
        return  { width: `${props.size}px`, height: `${props.size}px`, ...props.style }
      } else {
        return { filter: "grayscale(100%)", width: `${props.size}px`, height: `${props.size}px`, ...props.style }

      }
    }
    return (
      <div
        onClick={() => {
          if (userCtx.IsLoggedIn()) {
            setModalOpen(true);
            setModalContent(props.modal);
          }      
        }}
        className={classes.custombutton}
        style={style()}
      >
        {props.children}
        {userCtx.IsLoggedIn() === false && props.modal === "add" ? <p className={classes.loginprompt}>Log in to use these functions</p> : null}
      </div>
    );
  };

  function loadMap() {
    const newmap = new window.google.maps.Map(document.getElementById('mapDiv'), {
      zoom: mapState.zoom,
      center: mapState.center,
      disableDefaultUI: true,
      mapId: 'bd0bdf809da55ccb',
    });

    setMap(newmap);

    const showMarkers = async () => {
      const req = await reqCtx.getRequest(ENDPOINTS.getEvents);
      const res = await req.json();

      res.forEach((x) => {
        const contentString =
          `<div class="infoWindow">` +
          `<div class='infoWindow-left'><img src='${x.image}' alt='${x.title}'/></div>` +
          `<div class='infoWindow-right'>` +
          `<h2>${x.title}</h2>` +
          `<div>${x.description}</div>` +
          `</div>` +
          `</div>`;

        const pos = { lat: x.location.latitude, lng: x.location.longitude };

        const popUp = new window.google.maps.InfoWindow({
          content: contentString,
        });
        const marker = new window.google.maps.Marker({
          position: pos,
          content: contentString,
          map: newmap,
          icon: './assets/party.png',
        });

        // Add a click listener for each marker, and set up the info window.
        marker.addListener('mouseover', () => {
          popUp.setContent(contentString);
          popUp.open(marker.getMap(), marker);
        });

        marker.addListener('mouseout', () => {
          popUp.close();
        });

        // start modal
        marker.addListener('click', () => {
          localStorage.setItem('selectedId', JSON.stringify(x));
          setModalContent('selected');
          setModalOpen(true);
        });
      });
    };

    showMarkers();
  }

  useEffect(() => {
    if (gmapCtx.map === true) {
      loadMap();
    }
    
  }, [mapState, gmapCtx.map]);

  return (
    <div>
      <Modal
        sx={{
        }}
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={classes.modalcontainer}>
          <div className={classes.closebutton} onClick={() => {setModalOpen(false)}}>Close</div>
          {modalContent === 'grid' ? <AppEvents setModalContent={setModalContent} /> : null}
          {modalContent === 'add' ?  <AppNewEvent className={classes.modalClosed} setMapState={setMapState} setModalOpen={setModalOpen} gmap={map} /> : null}
          {modalContent === 'likes' ?  <div className={classes.yourfavorites}><p className={classes.yourfavoritestitle}>Your Favorites</p><AppFavoriteEventsList mode={'favorites'} variant={'all'} /></div> : null}
          {modalContent === 'selected' ? <AppSelectedEventItem /> : null}
        </div>
      </Modal>
      
      {gmapCtx.map === true ? <div className={classes.autocompletewrapper}>
        <AutoCompleteInput gmap={map} disabled={false} setMapState={setMapState} />
      </div> : null }
      
      <div className={classes['control-container']}>
        <CustomButton size={55} modal={'grid'}>
          <AppsIcon/>
        </CustomButton>
        <CustomButton size={80} modal={'add'} style={{ margin: '0 40px' }}>
          <img src={plusIcon} alt={'AddActivity'} />
        </CustomButton>
        <CustomButton size={55} modal={'likes'}>
          <FavoriteIcon/>
        </CustomButton>
      </div>
      <div id="mapDiv" className={classes.mapcontainer}></div>
    </div>
  );
};

export default AppMap;
