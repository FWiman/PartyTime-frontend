import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const data = [
  {
    id: 1,
    text: 'Stockholm',
  },
  {
    id: 2,
    text: 'Paris',
  },
  {
    id: 3,
    text: 'New York',
  },
  {
    id: 4,
    text: 'Los Angeles ',
  },
  {
    id: 5,
    text: 'Tokyo',
  },
  {
    id: 6,
    text: 'Bangkok',
  },
  {
    id: 7,
    text: 'Jakarta',
  },
  {
    id: 8,
    text: 'Göteborg',
  },
  {
    id: 9,
    text: 'Köpenhamn',
  },
  {
    id: 10,
    text: 'Berlin',
  },
];

function CityList(props) {
  //create a new array by filtering the original array
  const filteredData = data.filter((el) => {
    //if no input the return the original
    if (props.input === '') {
      return el;
    }
    //return the item which contains the user input
    else {
      return el.text.toLowerCase().includes(props.input);
    }
  });
  return (
    <ul>
      {filteredData.map((item) => (
        <li key={item.id}>{item.text}</li>
      ))}
    </ul>
  );
}

export default CityList;
