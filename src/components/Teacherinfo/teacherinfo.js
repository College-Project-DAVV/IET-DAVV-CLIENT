import React from "react";
import Card from "./card";
import styles from "./teacherinfo.module.scss";


const teacherData = [
    {
      name: "Dr. Vaibhav Jain",
      email: "vjain@ietdavv.edu.in",
      phone: "91 94250 71648",
      researchArea: "Data Mining, Information Retrieval, Software Engineering",
    },
    {
      name: "Mr. Arpit Agrawal",
      email: "aagrawal@ietdavv.edu.in",
      phone: "91 94240 90249",
      researchArea: "Data Mining and Algorithms",
    },
    {
        name: "Mr. Arpit Agrawal",
        email: "aagrawal@ietdavv.edu.in",
        phone: "91 94240 90249",
        researchArea: "Data Mining and Algorithms",
      },
      {
        name: "Dr. Vaibhav Jain",
        email: "vjain@ietdavv.edu.in",
        phone: "91 94250 71648",
        researchArea: "Data Mining, Information Retrieval, Software Engineering",
      },
      
  
  ];

const Teacher = () => {
  return (
    <div className={styles.teacherGrid}>
      {teacherData.map((teacher, index) => (
        <Card key={index} teacher={teacher} />
      ))}
    </div>
  );
};

export default Teacher;



