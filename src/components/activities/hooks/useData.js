import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';

function useData(endpoint, para1) {

  const [query, setQuery] = useState(`react hooks`);
  const [data, setData] = useState([]);

  // loading
  const[loading, setLoading] = useState(false);

  // error state
  const [error, setError] = useState("");

  // cancel token
  const [token, setToken] = useState(undefined);

  // query changed, make API call
  useEffect(() => {
    async function fetchData() {
      setError("");
      setLoading(true);
      // const token = axios.CancelToken.source();
      const response = await axios.get(`https://testagain-d4b54-default-rtdb.firebaseio.com/meetups.json`
      );
      setData(response.data);
      setLoading(false);
    }
    fetchData()
      .catch((error) => {
        const msg = error.message
        setError(msg)
      });
  }, [query]);

  return [data, query, setQuery, error, loading]
}

export default useData;
