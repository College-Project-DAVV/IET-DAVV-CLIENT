

import React from 'react';
import styles from './card.module.scss';

const Card = ({ teacher }) => {
  return (
    <div className={styles.card}>
      <h2>{teacher.name}</h2>
      <p className={styles.boldHeading}><b>Email:</b> {teacher.email}</p>
      <p className={styles.boldHeading}><b>Phone:</b> {teacher.phone}</p>
      <p className={styles.boldHeading}><b>Research Area:</b> {teacher.researchArea}</p>
    </div>
  );
};

export default Card;
