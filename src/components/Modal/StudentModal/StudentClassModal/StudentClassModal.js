import React, { useEffect, useState } from "react";
import styles from "./studentClassModal.module.scss";
import {fetchDataFromAPI} from "./fetchcourses";
import ProgressBar from "../../../progressbar/ProgressBar";
import coursesvg from "../../../../assets/course.svg"
import { useNavigate } from "react-router-dom";
const ClassInfoModal = ({email,closeModal}) => {
  const [courses, setCourses] = useState(null);
  const [state,setState] = useState(false);
  const navigate = useNavigate();
  useEffect(()=>{
    fetchDataFromAPI(email,"student").then((coursesResponse)=>{
      setCourses(coursesResponse);
      setState(true);
    }).catch((err)=>{
      console.log(err);
    })
  },[email])
  return (
    <div>
      
        {state?
          courses.length>0 ? 
          <div className={styles.modalContent}> 
          {courses.map((item,id) =>(
          <div className={styles.card} key = {id} onClick={()=>{
            localStorage.removeItem("course");
            localStorage.setItem("course",JSON.stringify({"id":item.courseId,"name":item.courseName,"teacher":item.teacher,"description":item.courseDescription}));
            navigate('/dashboard/courseinfo');
            console.log(item.courseId);
            closeModal();
          }}>
            <span className={styles.head}>
              <span>Course Name : </span>
              <span>{item.courseName}</span>
            </span>
            {/* <span className={styles.teacher}>
              <span>Teacher Name : </span>
              <span>{item.teacher}</span>
            </span> */}
            <span className={`${styles.status} ${item.courseStatus === 'ACTIVE' ? styles.active : ''}`}>
              <span>Status : </span>
              <span>{item.courseStatus}</span>
            </span>
          </div>
        ))
        }
        </div>
        : <div className={styles.notAvailable}>Not Enrolled in any course</div>:<div className={styles.notAvailable}><ProgressBar url={coursesvg}/></div>
      }
      </div>
  );
};

export default ClassInfoModal;
