import { MapContext } from '@react-google-maps/api';
import React, { createContext, useContext, useEffect, useState } from 'react';
import StorageContext from './StorageContext';

//Refrenace methods to be shown in intellisense
const GMapContext = createContext({
  map: null,
  setMap: null,
  set: null
});

export function GMapContextProvider(props) {
  const [map, setMap] = useState(false)

  function set(value) {
    setMap(value)
  }
  

  //Reference methods in this object to be passed as value
  const context = {
    map: map,
    setMap: setMap,
    set: set
  };

  return <GMapContext.Provider value={context}>{props.children}</GMapContext.Provider>;
}

export default GMapContext;
