import { CurrencyYenTwoTone } from '@mui/icons-material';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import AppActionAreaCard from 'components/AppActionAreaCard';
import ENDPOINTS from 'Endpoints';
import React, { useContext, useEffect, useState } from 'react';
import RequestContext from 'store/RequestContext';
import uniqId from '../uniq';
import styles from './styles/AppEvents.module.css';

function AppEvents(props) {
  const [inputText, setInputText] = useState('');
  const reqCtx = useContext(RequestContext);
  const [mode, setMode] = useState("cities");
  const [cities, setCities] = useState([]);
  const [cityEvents, setCityEvents] = useState([])

  useEffect(() => {
    const cities = async () => {
      const res = await reqCtx.getRequest(ENDPOINTS.getCities);
      const json = await res.json();
      setCities(json);
    };
    cities();
  }, []);

  const getEventsInCity = async (cityId) => {
    const res = await reqCtx.getRequest(ENDPOINTS.getEventsByCity(cityId));
    const json = await res.json();
    return json;
  };

  function ShowCities() {
    const c = filteredCities.map((city) => {
      return (
        <div className={styles.citywrapper} onClick={async () => {
          const res = await getEventsInCity(city.id);
          setCityEvents(res)
          setMode("events");
        }}>
          <div
            className={styles.cityimage}
            style={{
              backgroundImage:
                'url("https://upload.wikimedia.org/wikipedia/commons/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg")',
            }}
          />
          <div className={styles.citynamewrapper}>
            <p className={styles.cityname}>{city.name}</p>
          </div>
        </div>
      );
    });

    return <div className={styles.citieswrapper}>{c}</div>;
  }

  function ShowEvents() {
    const e = cityEvents.map((event) => {
      return (
        <div className={styles.citywrapper} onClick={() => {
          localStorage.setItem('selectedId', JSON.stringify(event));
          props.setModalContent('selected');
        }}>
          <div
            className={styles.cityimage}
            style={{
              backgroundImage:
                'url(' + event.image + ')',
            }}
          />
          <div className={styles.citynamewrapper}>
            <p className={styles.cityname}>{event.title}</p>
          </div>
        </div>
      );
    });

    return <div className={styles.citieswrapper}>{e}</div>;
  }
  

  const inputHandler = (event) => {
    //convert input text to lower case
    var lowerCase = event.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const getFilteredCities = () => {
    return cities.filter((city) => {
      return city?.name?.toLowerCase().includes(inputText);
    });
  };

  const filteredCities = inputText === '' ? cities : getFilteredCities();

  return (
    <div className={styles.appeventswrapper}>
      {mode === "cities" ? 
      <>
        <div className={styles.search}>
          <TextField onChange={inputHandler} color="primary" fullWidth label="Where to?" />
        </div>
        <ShowCities/>
      </> : null}

      {mode === "events" ? 
      <>
        <button onClick={() => {setMode("cities")}}>Back to cities</button>
        <ShowEvents/>
      </> : null}
    </div>
  );
}

export default AppEvents;
