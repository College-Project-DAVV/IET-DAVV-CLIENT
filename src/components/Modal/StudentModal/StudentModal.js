import React from "react";
import styles from "./studentModal.module.scss";
import StudentInfoModal from "./StudentInfoModal/StudentInfoModal"; 
import ClassInfoModal from "./StudentClassModal/StudentClassModal"; 

const StudentModal = ({ selectedRow, activeTab, handleTabChange, closeModal }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.data}>
        <div className={styles.heading}>
          <div
            className={`${styles.tab1} ${
              activeTab === "studInfo" ? styles.activeTab : ""
            }`}
            onClick={() => handleTabChange("studInfo")}
          >
            Student Information
          </div>
          <div
            className={`${styles.classInfo} ${ activeTab === "classInfo" ? styles.activeTab : ""}`}
            onClick={() => handleTabChange("classInfo")}
          >
            Classroom Information
          </div>
        </div>
        {activeTab === "studInfo" ? ( <StudentInfoModal selectedRow={selectedRow}/>) : (<ClassInfoModal email={selectedRow.email}/>)}
        <button className={styles.closebtn} onClick={closeModal}> Close </button>
      </div>
    </div>
  );
};

export default StudentModal;
