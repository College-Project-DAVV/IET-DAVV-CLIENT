import React, {useState} from 'react'
import styles from './StudentList.module.scss';
const StudentList = () => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('studInfo'); 
    const items = [
        {
            email : '20bcs026@ietdavv.edu.in',
            name : 'Harsh Farkiya',
            branch : 'Computer Engineering',
            year : '1st',
            rollno : '20C1026',
            section : 'A'
        },
        {
            email : '20bcs061@ietdavv.edu.in',
            name : 'Suhani Verma',
            branch : 'Information Technology',
            year : '4th',
            rollno : '20C7061',
            section : 'B'
        },
        {
            email : '20bcs058@ietdavv.edu.in',
            name : 'Smruti Lakhamapurkar',
            branch : 'Computer Engineering',
            year : '2nd',
            rollno : '20C7058',
            section : 'A'
        },
        {
            email : '20bcs026@ietdavv.edu.in',
            name : 'Harsh Farkiya',
            branch : 'Computer Engineering',
            year : '1st',
            rollno : '20C1026',
            section : 'A'
        },
        {
            email : '20bcs061@ietdavv.edu.in',
            name : 'Suhani Verma',
            branch : 'Information Technology',
            year : '4th',
            rollno : '20C7061',
            section : 'B'
        },
        {
            email : '20bcs058@ietdavv.edu.in',
            name : 'Smruti Lakhamapurkar',
            branch : 'Computer Engineering',
            year : '2nd',
            rollno : '20C7058',
            section : 'A'
        },
        {
            email : '20bcs026@ietdavv.edu.in',
            name : 'Harsh Farkiya',
            branch : 'Computer Engineering',
            year : '1st',
            rollno : '20C1026',
            section : 'A'
        },
        {
            email : '20bcs061@ietdavv.edu.in',
            name : 'Suhani Verma',
            branch : 'Information Technology',
            year : '4th',
            rollno : '20C7061',
            section : 'B'
        },
        {
            email : '20bcs058@ietdavv.edu.in',
            name : 'Smruti Lakhamapurkar',
            branch : 'Computer Engineering',
            year : '2nd',
            rollno : '20C7058',
            section : 'A'
        },
        {
            email : '20bcs026@ietdavv.edu.in',
            name : 'Harsh Farkiya',
            branch : 'Computer Engineering',
            year : '1st',
            rollno : '20C1026',
            section : 'A'
        },
        {
            email : '20bcs061@ietdavv.edu.in',
            name : 'Suhani Verma',
            branch : 'Information Technology',
            year : '4th',
            rollno : '20C7061',
            section : 'B'
        },
        {
            email : '20bcs058@ietdavv.edu.in',
            name : 'Smruti Lakhamapurkar',
            branch : 'Computer Engineering',
            year : '2nd',
            rollno : '20C7058',
            section : 'A'
        },
        {
            email : '20bcs026@ietdavv.edu.in',
            name : 'Harsh Farkiya',
            branch : 'Computer Engineering',
            year : '1st',
            rollno : '20C1026',
            section : 'A'
        },
        {
            email : '20bcs061@ietdavv.edu.in',
            name : 'Suhani Verma',
            branch : 'Information Technology',
            year : '4th',
            rollno : '20C7061',
            section : 'B'
        },
        {
            email : '20bcs058@ietdavv.edu.in',
            name : 'Smruti Lakhamapurkar',
            branch : 'Computer Engineering',
            year : '2nd',
            // rollno : '20C7058',
            // section : 'A',
        },
        
    ]
    const openModal = (item) => {
        setSelectedRow(item);
        setActiveTab('studInfo'); 
        setIsModalOpen(true);
      };
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };
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
            <div className={styles.row} key={index} onClick={() => openModal(item)}>
                <span className={styles.email}>{item.email || "Not Available"}</span>
                <span className={styles.name}>{item.name || "Not Available"}</span>
                <span className={styles.branch}>{item.branch || "Not Available"}</span>
                <span className={styles.year}>{item.year || "Not Available"}</span>
                <span className={styles.rollno}>{item.rollno || "Not Available"}</span>
            </div>
            ))}
        {isModalOpen && (
          <div className={styles.modal}>
            <div className={styles.data}>
              <div className={styles.heading}>
                <div className={`${styles.tab1} ${activeTab === 'studInfo' ? styles.activeTab : ''}`}
                     onClick={() => handleTabChange('studInfo')}> Student Information </div>
                <div className={`${styles.classInfo} ${activeTab === 'classInfo' ? styles.activeTab : ''}`}
                     onClick={() => handleTabChange('classInfo')}> Classroom Information 
                </div>
              </div>
              {activeTab === 'studInfo' && (
                <div className={styles.modalContent}>
                  <span>Name: {selectedRow.name || "Not Available"}</span>
                  <span>Email id: {selectedRow.email || "Not Available"}</span>
                  <span>Branch: {selectedRow.branch || "Not Available"}</span>
                  <span>Roll no: {selectedRow.rollno || "Not Available"}</span>
                  <div className={styles.row2}>
                    <span>Year: {selectedRow.year || "Not Available"}</span>
                    <span>Section: {selectedRow.section || "Not Available"}</span>
                  </div>
                </div>
              )}
              {activeTab === 'classInfo' && (
                <div className={styles.modalContent}>
                 No current info here
                </div>
              )}
              <button className={styles.closebtn} onClick={() => setIsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
          )}
      </div>
    </div>
  )
}

export default StudentList
