import React from 'react'
import styles from "./groupData.module.scss";
import email from "../../assets/groupemail.svg";
import count from "../../assets/groupcount.svg";
export default function GroupDataCard({group}) {
  return (
    <div className={styles.card}>
    <span className={styles.groupHead}> {group.groupName} </span>
    <span className={styles.groupdesc}>
      {" "}
      {group.groupDescription
        ? group.groupDescription
        : "Description Not Available"}{" "}
    </span>
    <div className={styles.email}>
      <img src={email} alt="email" />
      <span className={styles.groupEmail}> {group.groupEmail} </span>
    </div>
    <div className={styles.count}>
      <img src={count} alt="count" />
      <span className={styles.groupCount}>
        {" "}
        {group.groupMembersCount}{" Members"}
      </span>
    </div>
  </div>
  )
}
