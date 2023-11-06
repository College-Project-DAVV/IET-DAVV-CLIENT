import React, { useEffect, useState } from "react";
import styles from "./studentClassModal.module.scss";
import {fetchDataFromAPI} from "./fetchcourses"
const ClassInfoModal = ({email}) => {
  // const courses = 
  const [courses,setCourses] = useState(null);
  const [signal,setSignal]=useState(false);
  useEffect(()=>{
    if(email){
    fetchDataFromAPI(email).then((courses)=>{
      setCourses(courses);
      setSignal(true);
      console.log(courses);
    });
  }
  },[email])
  return (
    <div className={styles.modalContent}>
      {
        signal ? 
          courses.length>0 ? courses.map((course)=>{
           return( <div className={styles.allCourses}>
            <p>
            Course : {course.courseName}
              </p>
            <p>
            Course Description : {course.courseDescription}
              </p>
            <p>
            Status : {course.courseStatus}
              </p>
           </div>);
          })
          : <div>Not Enrolled in any course</div>
         : <div>Fetching courses..........</div>
      }
    </div>
  );
};

export default ClassInfoModal;
