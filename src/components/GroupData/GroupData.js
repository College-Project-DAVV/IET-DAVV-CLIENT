import React from 'react'
import styles from './groupData.module.scss';
import email from '../../assets/groupemail.svg';
import count from '../../assets/groupcount.svg';
const GroupData = () => {
    const groupDetails = [
        {
            groupName : "Faculty Group Elec & Telecom",
            desc : "Electronics and Telecommunication Faculty Group @ IET DAVV",
            email : "tcfaculty@ietdavv.edu.in",
            count : 15,
        },
        {
            groupName : "Faculty Group Computer",
            desc : "Computer Faculty Group @ IET DAVV",
            email : "csfaculty@ietdavv.edu.in",
            count : 18,
        },
        {
            groupName : "1st year Computer",
            desc : "Computer Student Group @ IET DAVV 1st year",
            email : "1cs@ietdavv.edu.in",
            count : 180,
        },
        {
            groupName : "Faculty Group Elec & Telecom",
            desc : "Electronics and Telecommunication Faculty Group @ IET DAVV",
            email : "tcfaculty@ietdavv.edu.in",
            count : 15,
        },
        {
            groupName : "Faculty Group Computer",
            desc : "Computer Faculty Group @ IET DAVV",
            email : "csfaculty@ietdavv.edu.in",
            count : 18,
        },
        {
            groupName : "1st year Computer",
            desc : "Computer Student Group @ IET DAVV 1st year",
            email : "1cs@ietdavv.edu.in",
            count : 180,
        },
    ]
  return (
    <div className = {styles.groupdata}>
            {groupDetails.map((item, index) => (
                <div className={styles.card} key = {index}>
                    <span className={styles.groupHead}> {item.groupName} </span>
                    <span className={styles.groupdesc}> {item.desc} </span>
                    <div className={styles.email}>
                        <img src={email} alt ='email'/>
                        <span className={styles.groupEmail}> {item.email} </span>
                    </div>
                    <div className={styles.count}>
                        <img src={count} alt ='count'/>
                        <span className={styles.groupCount}> {item.count} </span>
                    </div>
                    
                </div>
            ))}
      
    </div>
  )
}

export default GroupData