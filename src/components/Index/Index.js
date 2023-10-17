import React from 'react'
import Searchbar from '../searchbar/Searchbar'
import Sidebar from '../Sidebar/Sidebar'
import styles from './Index.module.scss'
import StudentList from '../studentList/StudentList'

export default function Index() {
  return (
    <div className={styles.indexContainer}>
      <div className={styles.leftContainer}>
        <Sidebar/>  
      </div>
      <div className={styles.rightContainer}>
      <Searchbar/>
      <div className={styles.target}>
        <StudentList/>
      </div>
      </div>
    </div>
  )
}
