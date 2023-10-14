import React from 'react'
import Searchbar from '../searchbar/Searchbar'
import Sidebar from '../Sidebar/Sidebar'
import styles from './Index.module.scss'
export default function Index() {
  return (
    <div className={styles.indexContainer}>
      <Sidebar/>
      <div className={styles.rightContainer}>
      <Searchbar/>
      </div>
    </div>
  )
}
