import React, { useContext, useEffect, useRef, useState } from 'react';
import LocationContext from 'store/LocationContext';
import classes from './styles/AutoCompleteInput.module.scss';

function AutoCompleteInput(props) {
  //Contexts
  const locCtx = useContext(LocationContext);

  //States
  const [predictionsResult, setPredictionsResult] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputText, setInputText] = useState('');
  const [service, setService] = useState({});

  //Refs
  const inputRef = useRef();

  useEffect(() => {
    setService(new window.google.maps.places.AutocompleteService());
  }, []);

  //Get place result from specific place id
  //that is provided when clicked on a prediction in the autocomplete list
  async function getPlaceResult(place_id) {
    const servicex = new window.google.maps.places.PlacesService(props.gmap);

    const request = {
      placeId: place_id,
      fields: ['address_component', 'formatted_address', 'geometry'],
    };

    servicex.getDetails(request, (place, status) => {
      if (
        status === window.google.maps.places.PlacesServiceStatus.OK &&
        place &&
        place.geometry &&
        place.geometry.location
      ) {
          
          const lat = place.geometry.location.lat();
          const lng = place.geometry.location.lng();

        //Create location object

        console.log(place);
        let location = {
          id: 0,
          name: 'temporary_name',
          address: null,
          latitude: lat,
          longitude: lng,
          city: {
            id: 0,
            name: null,
            country: {
              id: 0,
              name: null,
              countryCode: null,
            },
          },
        };

        //DATA FILTERING - CODE FROM GOOGLE
        for (const component of place.address_components) {
          const componentType = component.types[0];

          //Fill location object based on getPlace() result.
          switch (componentType) {
            case 'natural_feature': {
              location.address = component.long_name;
              break;
            }

            case 'premise': {
              location.address = component.long_name;
              break;
            }
            case 'neighborhood': {
              location.address = component.long_name;
              break;
            }

            case 'street_number': {
              location.address = component.long_name;
              break;
            }

            case 'route': {
              const sn = location.address;
              location.address = null;
              if (sn === null) {
                location.address = `${component.short_name}`;
              } else {
                location.address = `${component.short_name} ${sn}`;
              }
              break;
            }

            case 'locality': {
              location.city.name = component.long_name;
              break;
            }

            case 'postal_town': {
              if (location.city.name === null ) {
                location.city.name = component.long_name;
              }
              break;
            }

            case 'country':
              location.city.country.name = component.long_name;
              location.city.country.countryCode = component.short_name;
              break;
          }
        }

        console.log(location);
        locCtx.setLocation(location);
        //props.setMapState({ center: { lat: lat, lng: lng }, zoom: 14 });
        var latLng = new window.google.maps.LatLng(lat, lng); //Makes a latlng
        props.gmap.panTo(latLng); //Make map global
        setShowSuggestions(false);
      }
    });
  }

  const displaySuggestions = function (predictions, status) {
    if (status !== window.google.maps.places.PlacesServiceStatus.OK || !predictions) {
      alert(status);
      return;
    }
    setPredictionsResult(predictions);
  };

  async function handleChange(value) {
    if (value.length > 2) {
      setInputText(value);
      setShowSuggestions(true);
      service.getQueryPredictions({ input: value }, displaySuggestions);
    } else {
      setShowSuggestions(false);
    }
  }

  function fillSearchBox(prediction) {
    inputRef.current.value = prediction.description;
    //document.getElementById("autoinput").value = prediction.description;
    getPlaceResult(prediction.place_id);
  }

  function Predictionsarea(props) {
    if (showSuggestions) {
      return (
        <div
          className={props.size === 'small' ? classes.autocompletepredictionssmall : classes.autocompletepredictions}
        >
          {predictionsResult.map((x) => {
            return (
              <div
                onClick={() => {
                  fillSearchBox(x);
                }}
                className={classes.autocompletesingle}
              >
                {x.description}
              </div>
            );
          })}
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  return (
    <div className={classes.autocompletewrapper}>
      <div className={classes.autocompleteinnerwrapper}>
        <input
          id="autoinput"
          onChange={(e) => handleChange(e.target.value)}
          ref={inputRef}
          placeholder="Search address"
          className={props.size === 'small' ? classes.autocompleteinputsmall : classes.autocompleteinput}
          disabled={props.disabled}
          autoComplete="off"
        />
        <Predictionsarea size={props.size} />
      </div>
    </div>
  );
}

export default AutoCompleteInput;
