import React, { useEffect,useState } from 'react'
import TeacherClassCard from './TeacherClassCard'
import styles from './TeacherClassModal.module.scss'
import { fetchDataFromAPI } from '../../StudentModal/StudentClassModal/fetchcourses'
import ProgressBar from '../../../progressbar/ProgressBar'
import coursesvg from "../../../../assets/course.svg";
import { useNavigate } from "react-router-dom";
const TeacherClassModal = ({email,closeModal}) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(null);
  const [state,setState] = useState(false);
      useEffect(()=>{
        const x  = "teacher";
        fetchDataFromAPI(email,x).then((coursesResponse)=>{
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
      
      {courses.map((classItem, id) => (
        <div  onClick={()=>{
          localStorage.setItem("course",JSON.stringify({"id":classItem.courseId,"name":classItem.courseName,"teacher":classItem.teacher,"description":classItem.courseDescription}));
          navigate('/dashboard/courseinfo');
          closeModal();
        }}>
        <TeacherClassCard 
          key={id} 
          classItem={classItem} 
         
            />
            </div>
      ))}
    </div>
    : <div className={styles.notAvailable}>Not Enrolled in any course</div>:<div className={styles.notAvailable}><ProgressBar url={coursesvg}/></div>
    }
    </div>
  )
}

export default TeacherClassModal
