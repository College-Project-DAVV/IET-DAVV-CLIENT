import React from 'react'
import Searchbar from '../searchbar/Searchbar'
import Sidebar from '../Sidebar/Sidebar'
// import Teacherinfo from '../Teacherinfo/teacherinfo'
import styles from './Index.module.scss'
import StudentList from '../studentList/StudentList'
import Dashboard from '../Dashboard/Dashboard'
import Filter from '../filter/filter'
import Courseinfo from '../Courseinfo/Courseinfo'


export default function Index() {
  return (
    <div className={styles.indexContainer}>
      <div className={styles.leftContainer}>
      <Sidebar/>
      </div>
      <div className={styles.rightContainer}>
      <div className={styles.searchbar}>
      <Searchbar/>
      {/* <div className={styles.indexContainer}>
      <Teacherinfo/>
      </div> */}
      <div className={styles.target}>
      <StudentList/>
      </div>
      {/* <div className={styles.filter}>
            <Filter />
          </div> */}
          <div className={styles.Courseinfo}>
            <Courseinfo />
          </div>
          
      </div>
    </div>
  </div>
  )
}
