import React, { useEffect, useState } from "react";
import styles from "./studentModal.module.scss";
import StudentInfoModal from "./StudentInfoModal/StudentInfoModal"; 
import ClassInfoModal from "./StudentClassModal/StudentClassModal"; 
import img1 from "../../../assets/harshimg.jpg"
import { fetchDataFromAPI } from "../StudentModal/StudentInfoModal/fetchUserPhoto";
const StudentModal = ({ student, activeTab, handleTabChange, closeModal }) => {
  const [imgUrl, setUrl] = useState("");
  useEffect(()=>{
    fetchDataFromAPI(student.email).then((image)=>{
      setUrl(image.imageUrl);
    }).catch((err)=>{
      console.log(err);
    })
  },[])
  return (
    <div className={styles.modal}>
      <div className={styles.data}>
        <div className={styles.head}>
          {imgUrl?<img src={`data:image/jpeg;base64,${imgUrl}`} alt ='profile'className={styles.img}/>:<div className={styles.imgOptional}>{student.name[0]}</div>}
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
        {activeTab === "studInfo" ? ( <StudentInfoModal student={student}/>) : (<ClassInfoModal email={student.email}/>)}
        <button className={styles.closebtn} onClick={closeModal}> Close </button>
      </div>
    </div>
  );
};

export default StudentModal;
