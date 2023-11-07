import React from "react";
import styles from "./Courseinfo.module.scss";
import pencil from '../../assets/pencil.svg';
import member from '../../assets/members.svg';
import StudentList from '../studentList/StudentList'
const Courseinfo = () => {
  return (
    <div className={styles.courseInfo}>
      <div className={styles.group}>
        <div className={styles.circle}>
          <div className={styles.circleInner}></div>
        </div>
        <div className={styles.textWrapper}>
          <h2>Artificial Intelligence</h2>
          <div className={styles.element}>
            <div className={styles.element1}>
              <div className={styles.circle1}>
                <img src={pencil} alt="icon" />
              </div>
              <p>Dr. Pragya Shukla</p>
            </div>
            <div className={styles.element1}>
              <div className={styles.circle1}>
                <img src={member} alt="icon" />
              </div>
              <p>200</p>
            </div>
          </div>
          <div className={styles.text}>
            Lorem ipsum dolor sit amet. Est sint illo quo dolor consectetur qui sequi aspernatur ab doloremque nihil est aperiam eius! Et officiis maxime nam iure saepe sit rerum odit aut dolore rerum ab voluptatem fugit et corrupti
          </div>
        </div>
      </div>
      <div className={styles.group2}>
        <button className={styles.button}>ATTENDANCE</button>
        <button className={styles.button}>MARKS</button>
      </div>
      <div className={styles.StudentList}>
    <StudentList/>
    </div>
    </div>
    
  );
};

export default Courseinfo;
