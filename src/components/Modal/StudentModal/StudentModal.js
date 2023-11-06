import React from "react";
import styles from "./studentModal.module.scss";
import StudentInfoModal from "./StudentInfoModal/StudentInfoModal"; 
import ClassInfoModal from "./StudentClassModal/StudentClassModal"; 
import img1 from "../../../assets/harshimg.jpg"

const StudentModal = ({ student, activeTab, handleTabChange, closeModal }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.data}>
        <div className={styles.head}>
          <img src={img1} alt ='profile'className={styles.img}/>
          <h2 className={styles.headName}> {student.name}</h2>
        </div>
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
        {activeTab === "studInfo" ? ( <StudentInfoModal student={student}/>) : (<ClassInfoModal/>)}
        <button className={styles.closebtn} onClick={closeModal}> Close </button>
      </div>
    </div>
  );
};

export default StudentModal;
