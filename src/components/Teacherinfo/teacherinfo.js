import React from "react";
import Card from "./card";
import styles from "./teacherinfo.module.scss";
import { useAllUsers } from "../../DataContext";
const Teacher = () => {
  const data = useAllUsers();
  return (
    <div className={styles.teacherGrid}>
      {data && data.map((teacher, index) => {
        if(isNaN(teacher.email.charAt(0)) && teacher.designation==="Faculty"){
          return(
        <Card key={index} teacher={teacher} />);
        }
        else return(<div key={index} style={{display:"none"}}></div>);
})}
    </div>
  );
};

export default Teacher;



