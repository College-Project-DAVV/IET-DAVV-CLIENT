import React from 'react'
import Searchbar from '../searchbar/Searchbar'
import Sidebar from '../Sidebar/Sidebar'
import styles from './Index.module.scss'
import StudentList from '../studentList/StudentList'
export default function Index() {
  return (
    <div className={styles.indexContainer}>
      <Sidebar/>
      <div className={styles.rightContainer}>
      <div className={styles.searchbar}>
      <Searchbar/>
      </div>
      <div className={styles.target}>
      <StudentList/>
      </div>
      </div>
    </div>
  )
}