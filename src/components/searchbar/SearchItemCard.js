import React from 'react'
import styles from './SearchItemCard.module.scss'
export default function SearchItemCard(props) {
    const item = props.item;
  return (
    <div className={styles.cardContainer}>
      <div className={styles.name}>{item.name}</div>
      <div className={styles.email}>{item.email}</div>
      <div className={styles.roll}>{item.phone?item.phone:"Not Available"}</div>
      <div className={styles.department}>{item.designation?item.designation:"Staff"}</div>
      {/* <div className={styles.department}>{item.year}</div> */}
    </div>
  )
}
