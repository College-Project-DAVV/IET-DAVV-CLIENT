import React from "react";
import styles from "./StudentInfoModal.module.scss";
const StudentInfoModal = ({ student }) => {
  const currentYear = new Date().getFullYear();
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
      value : student.secondaryEmail || "Not Available"
    },
    {
      category : "Roll no",
      value : student.rollNumber || "Not Available"
    },
    {
      category : "Mobile no",
      value : student.phone  || "Not Available"
    },
    {
      category : "Class",
      value : (student.year && student.department && student.section) ? currentYear-(+student.year+2000) + " Year " +  student.department  + "("+ student.section+")" : "Not Available"
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
    </div>
  );
};

export default StudentInfoModal;
