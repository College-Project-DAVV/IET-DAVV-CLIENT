import React from 'react'
import styles from "./Profile.module.scss"
export default function Profile() {
    const profileData = JSON.parse(localStorage.getItem("profile"));
  return (
    <div className={styles.profileContainer}>
          <img src={profileData&&profileData.result.picture} alt={profileData&& profileData.result.name} title={profileData&& profileData.result.name}/>
    </div>
  )
}
