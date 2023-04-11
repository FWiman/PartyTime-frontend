import React from 'react';
import classes from '../styles/AppCard.module.css';

function Card(props) {
  return (
    // <Layout>
    <div className={classes.card}>{props.children}</div>
    // </Layout>
  );
}
export default Card;
