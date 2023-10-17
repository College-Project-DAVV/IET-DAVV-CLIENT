import React from 'react'
import styles from './StudentList.module.scss';
const StudentList = () => {
    const items = [
        {
            email : '20bcs026@ietdavv.edu.in',
            name : 'Harsh Farkiya',
            branch : 'Computer Engineering',
            year : '1st',
            rollno : '20C1026'
        },
        {
            email : '20bcs061@ietdavv.edu.in',
            name : 'Suhani Verma',
            branch : 'Information Technology',
            year : '4th',
            rollno : '20C7061'
        },
        {
            email : '20bcs058@ietdavv.edu.in',
            name : 'Smruti Lakhamapurkar',
            branch : 'Computer Engineering',
            year : '2nd',
            rollno : '20C7058'
        },
        {
            email : '20bcs026@ietdavv.edu.in',
            name : 'Harsh Farkiya',
            branch : 'Computer Engineering',
            year : '1st',
            rollno : '20C1026'
        },
        {
            email : '20bcs061@ietdavv.edu.in',
            name : 'Suhani Verma',
            branch : 'Information Technology',
            year : '4th',
            rollno : '20C7061'
        },
        {
            email : '20bcs058@ietdavv.edu.in',
            name : 'Smruti Lakhamapurkar',
            branch : 'Computer Engineering',
            year : '2nd',
            rollno : '20C7058'
        },
        {
            email : '20bcs026@ietdavv.edu.in',
            name : 'Harsh Farkiya',
            branch : 'Computer Engineering',
            year : '1st',
            rollno : '20C1026'
        },
        {
            email : '20bcs061@ietdavv.edu.in',
            name : 'Suhani Verma',
            branch : 'Information Technology',
            year : '4th',
            rollno : '20C7061'
        },
        {
            email : '20bcs058@ietdavv.edu.in',
            name : 'Smruti Lakhamapurkar',
            branch : 'Computer Engineering',
            year : '2nd',
            rollno : '20C7058'
        },
        {
            email : '20bcs026@ietdavv.edu.in',
            name : 'Harsh Farkiya',
            branch : 'Computer Engineering',
            year : '1st',
            rollno : '20C1026'
        },
        {
            email : '20bcs061@ietdavv.edu.in',
            name : 'Suhani Verma',
            branch : 'Information Technology',
            year : '4th',
            rollno : '20C7061'
        },
        {
            email : '20bcs058@ietdavv.edu.in',
            name : 'Smruti Lakhamapurkar',
            branch : 'Computer Engineering',
            year : '2nd',
            rollno : '20C7058'
        },
        {
            email : '20bcs026@ietdavv.edu.in',
            name : 'Harsh Farkiya',
            branch : 'Computer Engineering',
            year : '1st',
            rollno : '20C1026'
        },
        {
            email : '20bcs061@ietdavv.edu.in',
            name : 'Suhani Verma',
            branch : 'Information Technology',
            year : '4th',
            rollno : '20C7061'
        },
        {
            email : '20bcs058@ietdavv.edu.in',
            name : 'Smruti Lakhamapurkar',
            branch : 'Computer Engineering',
            year : '2nd',
            rollno : '20C7058'
        },
    ]
  return (
    <div className={styles.details}>
        <div className={styles.list}>
            <div className={styles.head}>
                <span className={styles.email}>Email id</span>
                <span className={styles.name}>Name</span>
                <span className={styles.branch}>Branch</span>
                <span className={styles.year}>Year</span>
                <span className={styles.rollno}>Roll no</span>
            </div>
            {items.map((item,index) =>(
            <div className={styles.row} key={index}>
                <span className={styles.email}>{item.email}</span>
                <span className={styles.name}>{item.name}</span>
                <span className={styles.branch}>{item.branch}</span>
                <span className={styles.year}>{item.year}</span>
                <span className={styles.rollno}>{item.rollno}</span>
            </div>
        ))}
        </div>
    </div>
  )
}

export default StudentList
