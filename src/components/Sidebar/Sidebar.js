import React from 'react'
import styles from './Sidebar.module.scss'
import logo from '../../assets/logo2.svg'
import home from '../../assets/home.svg'
import logout from '../../assets/logout.svg'
export default function Sidebar() {
  return (
    <div className={styles.head}>
      <div className={styles.institute}>
        <img src={logo} alt="icon"/>
        <h1>IET-DAVV</h1>
      </div>
      <div className={styles.navigationContainer}>
        <p>Main Navigation</p>
        <div className={styles.elements}>
        <div className={styles.element}>
            <img src={home} alt="icon"/>
            <p>Dashboard</p>
        </div>
        <div className={styles.element}>
            <img src={home} alt="icon"/>
            <p>Dashboard</p>
        </div>
        <div className={styles.element}>
            <img src={home} alt="icon"/>
            <p>Dashboard</p>
        </div>
        <div className={styles.element}>
            <img src={home} alt="icon"/>
            <p>Dashboard</p>
        </div>
        <div className={styles.element}>
            <img src={home} alt="icon"/>
            <p>Dashboard</p>
        </div>
        <div className={styles.element}>
            <img src={home} alt="icon"/>
            <p>All Students</p>
        </div>
        
        
       
        </div>
        
      </div>
      <div className={styles.logout}>
          <img src={logout} alt="logout"/>
            <p>Logout</p>
        </div>
    </div>
  )
}
