import React, { createContext, useState } from 'react';

//Refrenace methods to be shown in intellisense
const LocationContext = createContext({
  location: null,
  setLocation: null,
});

export function LocationContextProvider(props) {
  const [location, setLocation] = useState();

  //Reference methods in this object to be passed as value
  const context = {
    location: location,
    setLocation: setLocation,
  };

  return <LocationContext.Provider value={context}>{props.children}</LocationContext.Provider>;
}

export default LocationContext;
