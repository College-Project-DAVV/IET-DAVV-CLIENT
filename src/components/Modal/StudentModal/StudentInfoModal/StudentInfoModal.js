import React from "react";
import styles from "./studentInfoModal.module.scss";

const StudentInfoModal = ({ selectedRow }) => {
  return (
    <div className={styles.modalContent}>
      <span>Name: {selectedRow.name || "Not Available"}</span>
      <span>Email id: {selectedRow.email || "Not Available"}</span>
      <span>Branch: {selectedRow.department || "Not Available"}</span>
      <span>Roll no: {selectedRow.rollNumber || "Not Available"}</span>
      <div className={styles.row2}>
        <span>Year: {selectedRow.year || "Not Available"}</span>
        <span>Section: {selectedRow.section || "Not Available"}</span>
      </div>
    </div>
  );
};

export default StudentInfoModal;
