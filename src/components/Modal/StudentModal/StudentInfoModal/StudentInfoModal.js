import React from "react";
import styles from "./studentInfoModal.module.scss";

const StudentInfoModal = ({ student }) => {
  const data = [
    {
      category : "Name",
      value : student.name || "Not Available"
    },
    {
      category : "Primary Email",
      value : student.email || "Not Available"
    },
    {
      category : "Secondary Email",
      value : student.email || "Not Available"
    },
    {
      category : "Branch",
      value : student.department || "Not Available"
    },
    {
      category : "Roll no",
      value : student.rollNumber || "Not Available"
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
      <div className={styles.row2}>
        <div className={styles.col}>
          <span className={styles.value2}> {student.year || "Not Available"}</span>
          <span>Year</span>
        </div>
        <div className={styles.col}>
          <span className={styles.value2}>{student.section || "Not Available"}</span>
          <span>Section</span>
        </div>
      </div>
    </div>
  );
};

export default StudentInfoModal;
