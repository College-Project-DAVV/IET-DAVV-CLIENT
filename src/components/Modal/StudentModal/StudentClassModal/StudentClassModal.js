import React, { useEffect, useState } from "react";
import styles from "./StudentClassModal.module.scss";
import {fetchDataFromAPI} from "./fetchcourses";
const ClassInfoModal = ({email}) => {
  const [courses, setCourses] = useState(null);
  const [state,setState] = useState(false);
  useEffect(()=>{
    fetchDataFromAPI(email).then((coursesResponse)=>{
      setCourses(coursesResponse);
      console.log(coursesResponse);
      setState(true);
    }).catch((err)=>{
      console.log(err);
    })
  },[])
  return (
    <div>
        {state?
          courses.length>0 ? 
          <div className={styles.modalContent}> 
          {courses.map((item,id) =>(
          <div className={styles.card} key = {id}>
            <span className={styles.head}>
              <span>Course Name : </span>
              <span>{item.courseName}</span>
            </span>
            <span className={styles.teacher}>
              <span>Teacher Name : </span>
              <span>{item.teacher}</span>
            </span>
            <span className={`${styles.status} ${item.courseStatus === 'ACTIVE' ? styles.active : ''}`}>
              <span>Status : </span>
              <span>{item.courseStatus}</span>
            </span>
          </div>
        ))
        }
        </div>
        : <div className={styles.notAvailable}>Not Enrolled in any course</div>:<div className={styles.notAvailable}>Fetching Courses.....</div>
        }
      <div/>
      </div>
  );
};

export default ClassInfoModal;
