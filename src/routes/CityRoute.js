import React, { useEffect, useState } from 'react';

//https://testagain-d4b54-default-rtdb.firebaseio.com/meetups

function CityRoute() {
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState(null);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        setIsLoading(true);

        const mockCity = {
          id: 10,
          text: 'Berlin',
          image: '/assets/Images/tokyo.png',
          description: 'Cool town in Germany',
        };
        await new Promise((resolve) => setTimeout(resolve, 500));
        setCity(mockCity);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCity();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!city) {
    return <div>No City</div>;
  }

  return (
    <div className="page">
      <h1>{city.text}</h1>
      <p>City city</p>
    </div>
  );
}

export default CityRoute;
