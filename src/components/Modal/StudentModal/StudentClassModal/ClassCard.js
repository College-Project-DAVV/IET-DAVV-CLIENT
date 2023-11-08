import React from 'react'
import styles from './ClassCard.module.scss'

const ClassCard = ({ classItem }) => {
  return (
    <div>
      <table className={styles.card}>
        <tbody>
          <tr className={styles.head}>
            <td>Course Name</td>
            <td> : {classItem.name}</td>
          </tr>
          <tr className={styles.rows}>
            <td>Teacher Name</td>
            <td> : {classItem.teacher}</td>
          </tr>
          <tr className={styles.rows}>
            <td>Status</td>
            <td className={`${styles.status} ${classItem.Status === 'Active' ? styles.active : ''}`}>
              : {classItem.Status}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ClassCard
