import React from 'react'
import styles from './cards.module.scss'
const Cards = () => {
    const items = [
        {
            head : 'Total Students',
            num : 1000
        },
        {
            head : 'B.E. Students',
            num : 600
        },
        {
            head : 'M.E. Students',
            num : 300
        },
        {
            head : 'M.Sc. Students',
            num : 100
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
