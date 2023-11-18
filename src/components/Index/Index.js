import React from 'react'
import Searchbar from '../searchbar/Searchbar'
import Sidebar from '../Sidebar/Sidebar'
// import Teacherinfo from '../Teacherinfo/teacherinfo'
import styles from './Index.module.scss'
import StudentList from '../studentList/StudentList'
import Dashboard from '../Dashboard/Dashboard'
import Filter from '../filter/filter'
import Courseinfo from '../Courseinfo/Courseinfo'
import Landing from '../Landing/Landing'

export default function Index() {
  return (
    <div className={styles.Landing}>
            <Landing />
          </div>
  )
}
