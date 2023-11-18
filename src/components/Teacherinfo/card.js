import React from 'react';
import styles from './card.module.scss';

const Card = ({ teacher }) => {
  return (
    <div className={styles.card}>
      <h2>{teacher.name}</h2>
      <p className={styles.boldHeading}><b>Email:</b> {teacher.email?teacher.email:"Not Yet Added"}</p>
      <p className={styles.boldHeading}><b>Phone:</b> {teacher.phone?teacher.phone:"Not Yet Added"}</p>
      <p className={styles.boldHeading}><b>Research Area:</b> {teacher.researchArea?teacher.researchArea:"Not Yet Added"}</p>
    </div>
  );
};

export default Card;
