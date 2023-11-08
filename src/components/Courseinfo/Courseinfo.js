import React, { useEffect, useState } from "react";
import styles from "./Courseinfo.module.scss";
import pencil from '../../assets/pencil.svg';
import member from '../../assets/members.svg';
// import StudentList from '../studentList/StudentList'
import { fetchDataFromAPI } from "./fetchCourseDetails";
import ProgressBar from "../progressbar/ProgressBar";
import coursesvg from "../../assets/course.svg"
const Courseinfo = () => {
  const [course, setCourse] = useState(null);
  const[status,setStatus] = useState(true);
  const courseD = JSON.parse(localStorage.getItem("course"));
  useEffect(()=>{
    if(courseD.id){
      setStatus(true);
      fetchDataFromAPI(courseD.id).then((courseDetails)=>{
        setCourse(courseDetails);
        setStatus(false);
      }).catch((err)=>{
        console.log(err);
      })
    }
  },[courseD.id]);
  return (
    <div>
   {
    status ? <div className={styles.progressBar}><ProgressBar  url={coursesvg}/></div> : ( <div className={styles.courseInfo}>
      <div className={styles.group}>
        <div className={styles.circle}>
          <img className={styles.circleInner} src={course?(course.faculty?`https://${course.faculty[0].facultyPhoto}`:null):null}/>
        </div>
        <div className={styles.textWrapper}>
          <h2>{courseD.name}</h2>
          <div className={styles.element}>
            <div className={styles.element1}>
              <div className={styles.circle1}>
                <img src={pencil} alt="icon" />
              </div>
              <p>{course && course.faculty && course.faculty[0].facultyName}</p>
            </div>
            <div className={styles.element1}>
              <div className={styles.circle1}>
                <img src={member} alt="icon" />
              </div>
              <p>{course.members.length}</p>
            </div>
          </div>
          <p className={styles.text}>
           {courseD.description}
          </p>
        </div>
      </div>
      <div className={styles.group2}>
        <a className={styles.button} href={course && course.attendance.length>0 && course.attendance[0].url} target="_blank">ATTENDANCE</a>
        <a className={styles.button} href={course && course.marks.length>0 && course.marks[0].url} target="_blank">MARKS</a>
      </div>
      <div className={styles.StudentList}>
    {/* <StudentList/> */}
    </div>
    </div>)
   }
     </div>
  );
};

export default Courseinfo;
