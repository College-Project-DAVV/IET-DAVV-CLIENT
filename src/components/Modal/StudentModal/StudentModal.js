import React, { useEffect, useState } from "react";
import styles from "./StudentModal.module.scss";
import StudentInfoModal from "./StudentInfoModal/StudentInfoModal"; 
import ClassInfoModal from "./StudentClassModal/StudentClassModal"; 
import { fetchDataFromAPI } from "../StudentModal/StudentInfoModal/fetchUserPhoto";
const StudentModal = ({ student, activeTab, handleTabChange, closeModal }) => {
  const [imgUrl, setUrl] = useState("");
  useEffect(()=>{
    if(student.email){
      fetchDataFromAPI(student.email).then((image)=>{
        setUrl(image.imageUrl);
      }).catch((err)=>{
        console.log(err);
      })
    }
  },[student.email])
  return (
    <div className={styles.modal}>
      <div className={styles.data}>
        <div className={styles.head}>
          {imgUrl?<img src={`data:image/jpeg;base64,${imgUrl}`} alt ='profile'className={styles.img}/>:<div className={styles.imgOptional}>{student&&student.name&&student.name[0]}</div>}
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
        {activeTab === "studInfo" ? ( <StudentInfoModal student={student}/>) : (<ClassInfoModal email={student.email} closeModal={closeModal}/>)}
        <button className={styles.closebtn} onClick={closeModal}> Close </button>
      </div>
    </div>
  );
};

export default StudentModal;
