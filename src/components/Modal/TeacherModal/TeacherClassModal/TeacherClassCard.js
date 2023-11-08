import React from 'react'
import styles from './TeacherClassCard.module.scss'

const TeacherClassCard = ({ classItem }) => {
  return (
    <div>
      <table className={styles.card}>
        <tbody>
          <tr className={styles.head}>
            <td>Course Name</td>
            <td> : {classItem.courseName}</td>
          </tr>
          <tr className={styles.rows}>
            <td>Status</td>
            <td className={`${styles.status} ${classItem.Status === 'Active' ? styles.active : ''}`}>
              : {classItem.courseStatus}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TeacherClassCard
