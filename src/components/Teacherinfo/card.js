

import React from 'react';
import styles from './card.module.scss';

const Card = ({ teacher }) => {
  return (
    <div className={styles.card}>
      <h2>{teacher.name}</h2>
      <p className={styles.boldHeading}>Email: {teacher.email}</p>
      <p className={styles.boldHeading}>Phone: {teacher.phone}</p>
      <p className={styles.boldHeading}>Research Area: {teacher.researchArea}</p>
    </div>
  );
};

export default Card;
