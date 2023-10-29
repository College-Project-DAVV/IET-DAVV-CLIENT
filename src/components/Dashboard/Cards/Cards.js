import React from 'react'
import styles from './cards.module.scss'
import { useData } from "../../../DataContext";
const Cards = () => {
    const data = useData();
    const items = [
        {
            head : 'Total Students',
            num : data? data["All Students"]["count"] : 0
        },
        {
            head : 'B.E. Students',
            num : data? data["All Students"]["Students"]["BE"]["count"] : 0
        },
        {
            head : 'M.E. Students',
            num : "NAN"
        },
        {
            head : 'M.Sc. Students',
            num : "NAN"
        },
    ]
  return (
    <div className={styles.cards}>
        {items.map((item, index) => (
                <div className={styles.card} key={index}>
                    <div className={styles.num}>{item.num}</div>
                    <div className={styles.heading}>{item.head}</div>
                </div>
        ))}
    </div>
  )
}

export default Cards
