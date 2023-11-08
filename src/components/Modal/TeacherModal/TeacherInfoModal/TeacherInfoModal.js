import React from 'react'
import styles from './TeacherInfoModal.module.scss'
const TeacherInfoModal = ({teacher}) => {
    const data = [
        {
          category : "Name",
          value : teacher.name || "Not Available"
        },
        {
          category : "Primary Email",
          value : teacher.email || "Not Available"
        },
        {
          category : "Secondary Email",
          value : teacher.email || "Not Available"
        },
        {
          category : "Department",
          value : teacher.department || "Not Available"
        },
        {
          category : "Mobile no",
          value : "9340517516"
        },
      ]
      return (
        <div className={styles.modalContent}>
          <table className={styles.infoTable}>
            <tbody>
              {data.map((item, id) => (
                <tr key={id}>
                  <td className={styles.category}>{item.category}</td>
                  <td className={styles.dot}>:</td>
                  <td className={styles.value}>{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.research}>
            <div className={styles.category}>Research Area</div>
            <div>Data Mining, Information Retrieval, Software Engineering</div>
          </div>
          <button className={styles.editbtn}> Edit </button>
        </div>
      );
    };

export default TeacherInfoModal