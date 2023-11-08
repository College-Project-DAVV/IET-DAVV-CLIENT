import React from 'react'
import styles from './TeacherModal.module.scss'
import TeacherInfoModal from './TeacherInfoModal/TeacherInfoModal'
import TeacherClassModal from './TeacherClassModal/TeacherClassModal'

const TeacherModal = ({ teacher, activeTab, handleTabChange, closeModal }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.data}>
        <div className={styles.head}>
          <img src={teacher.img} alt ='profile' className={styles.img}/>
          <h2 className={styles.headName}> {teacher.name}</h2>
        </div>
        <div className={styles.heading}>
          <div
            className={`${styles.tab1} ${activeTab === "teacherInfo" ? styles.activeTab : ""}`}
            onClick={() => handleTabChange("teacherInfo")}> Teacher Information </div>
          <div
            className={`${styles.classInfo} ${activeTab === "classInfo" ? styles.activeTab : ""}`}
            onClick={() => handleTabChange("classInfo")} > Classroom Information </div>
        </div>
        {activeTab === "teacherInfo" ? ( <TeacherInfoModal teacher={teacher}/>) : (<TeacherClassModal />)}
        <button className={styles.closebtn} onClick={closeModal}> Close </button>
      </div>
    </div>
  )
}

export default TeacherModal
