import React from 'react'
import styles from './Searchbar.module.scss'
import profile from '../../assets/logo.png'
export default function Searchbar() {
  return (
    <div>
      <div className={styles.searchbarContainer}>
      <form className={styles.searchForm}>    
      <input type="text" className={styles.searchInput} placeholder="Search here"/>    
      </form>
      <div className={styles.profileContainer}>
        <img src={profile} alt="ProfileImage"/>
      </div>
      </div>
    </div>
  )
}
