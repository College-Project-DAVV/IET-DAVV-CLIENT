import React from 'react'
import TeacherClassCard from './TeacherClassCard'
import styles from './TeacherClassModal.module.scss'
const TeacherClassModal = () => {
    const data = [
        {
          name : "Artificial Intelligence",
          Status : "Active"
        },
        {
          name : "Machine Learning",
          Status : "Active"
        },
        {
          name : "Data structure and algorithm",
          Status : "Archive"
        },
        {
          name : "Distributed Computing",
          Status : "Active"
        },
      ]
  return (
    <div className={styles.modalContent}>
      {data.map((classItem, id) => (
        <TeacherClassCard 
          key={id} 
          classItem={classItem} 
            />
      ))}
    </div>
  )
}

export default TeacherClassModal
