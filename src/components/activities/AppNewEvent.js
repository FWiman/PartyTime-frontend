import { Alert } from '@mui/material';
import AppLogo from 'components/AppLogo';
import AutoCompleteInput from 'components/AutoCompleteInput';
import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationContext from 'store/LocationContext';
import RequestContext from 'store/RequestContext';
import ENDPOINTS from '../../Endpoints';
import ErrorAlert from '../ErrorAlert';
import classes from '../styles/AppNewEvent.module.css';
import SuccessAlert from '../SuccessAlert';

function AppNewEvent(props) {
  const locCtx = useContext(LocationContext);
  const titleInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const dateInputRef = useRef(null);
  const errorAlertRef = useRef(null);
  const successAlertRef = useRef(null);
  const navigateTo = useNavigate();

  const reqCtx = useContext(RequestContext);
  
  async function submitHandler(e) {
    e.preventDefault();

    if(titleInputRef ||
      imageInputRef ||
      descriptionInputRef ||
      dateInputRef ||
      errorAlertRef ||
      successAlertRef === null){
      errorAlertRef.current.update('You need to fill in the required fields');
    }
    
    const date = dateInputRef.current.value;
    const d = new Date(date).toISOString();

    //Event to be posted
    const event = {
      title: titleInputRef.current.value,
      description: descriptionInputRef.current.value,
      image: imageInputRef.current.value,
      planned: d,
      likes: 0,
      comments: [{}],
      location: locCtx.location,
    }; // End of event to be posted

    const res = await reqCtx.postRequest(ENDPOINTS.postEvent, event);

    if (res.ok) {
      successAlertRef.current.update('Congratulations Your New Event Has Been Created!');
      // alert("Added new event");
      props.setModalOpen(false)
    } else {
      errorAlertRef.current.update('Something Went Wrong!');
      // alert("Error adding event")
    }
  }

  return (
    <div className={classes.addactivityouterwrapper}>
      <ErrorAlert ref={errorAlertRef}></ErrorAlert>
      <SuccessAlert ref={successAlertRef}></SuccessAlert>
      <div className={classes.topbar}>
        <AppLogo />
      </div>
      <div className={classes.addactivityinnerwrapper}>
        {/* <div className={classes.addactivityleft}>
          <div className={classes.addactivityleftinner}>
            <div className={classes.chosenimage}></div>
            <input type="file" />
          </div>
        </div> */}
        <div className={classes.addactivityright}>
          <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
            <p className={classes.label}>Title</p>
              <input type="text" required id="title" ref={titleInputRef} />
            </div>
            <div className={classes.control}>
            <p className={classes.label}>Planned Date</p>
              <input type="date" required id="date" ref={dateInputRef} />
            </div>

            <div className={classes.control}>
              <p className={classes.label}>Address</p>
              <div className={classes.autoinput}>
                <AutoCompleteInput gmap={props.gmap} setMapState={props.setMapState} size="small" />
              </div>
            </div>

            <div className={classes.control}>
            <p className={classes.label}>Image (Url)</p>
              <input type="text" required id="image" ref={imageInputRef} />
            </div>

            <div className={classes.control}>
            <p className={classes.label}>Description</p>
              <textarea className={classes.description} id="description" required rows="5" ref={descriptionInputRef} />
            </div>
            <div className={classes.actions}></div>
          </form>
        </div>
      </div>
      <div>
        <div className={classes.lower}>
          <button
            className={classes.addbutton}
            onClick={(e) => {
              submitHandler(e);
            }}
            type="submit"
          >
            Create event
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppNewEvent;
