import React from 'react'
import styles from './TeacherModal.module.scss'
const TeacherModal = ({ teacher, activeTab, handleTabChange, closeModal }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.data}>
        <div className={styles.head}>
          <img src={teacher.img} alt ='profile'className={styles.img}/>
          <h2 className={styles.headName}> {teacher.name}</h2>
        </div>
      </div>
    </div>
  )
}

export default TeacherModal
