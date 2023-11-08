import React,{useState,useEffect} from 'react'
import styles from './TeacherModal.module.scss'
import TeacherInfoModal from './TeacherInfoModal/TeacherInfoModal'
import TeacherClassModal from './TeacherClassModal/TeacherClassModal'
import { fetchDataFromAPI } from "../StudentModal/StudentInfoModal/fetchUserPhoto";
const TeacherModal = ({ teacher, activeTab, handleTabChange, closeModal }) => {
  const [imgUrl, setUrl] = useState("");
  useEffect(()=>{
    if(teacher.email){
      fetchDataFromAPI(teacher.email).then((image)=>{
        setUrl(image.imageUrl);
      }).catch((err)=>{
        console.log(err);
      })
    }
  },[teacher.email])
  return (
    <div className={styles.modal}>
      <div className={styles.data}>
        <div className={styles.head}>
        {imgUrl?<img src={`data:image/jpeg;base64,${imgUrl}`} alt ='profile'className={styles.img}/>:<div className={styles.imgOptional}>{teacher&&teacher.name&&teacher.name[0]}</div>}
          <h2 className={styles.headName}> {teacher.name}</h2>
        </div>
        <div className={styles.heading}>
          <div
            className={`${styles.tab1} ${activeTab === "teacherInfo" ? styles.activeTab : ""}`}
            onClick={() => handleTabChange("teacherInfo")}> Teacher Information </div>
          <div
            className={`${styles.classInfo} ${activeTab === "classInfo" ? styles.activeTab : ""}`}
            onClick={() => handleTabChange("classInfo")} > Classroom Information </div>
        </div>
        {activeTab === "teacherInfo" ? ( <TeacherInfoModal teacher={teacher}/>) : (<TeacherClassModal email={teacher.email} closeModal={closeModal}/>)}
        <button className={styles.closebtn} onClick={closeModal}> Close </button>
      </div>
    </div>
  )
}

export default TeacherModal
