import React, { useEffect, useState } from "react";
import styles from "./studentClassModal.module.scss";
import ClassCard from "./ClassCard";

const ClassInfoModal = () => {
  const data = [
    {
      name : "Artificial Intelligence",
      teacher : "Dr. Pragya Shukla",
      Status : "Active"
    },
    {
      name : "Machine Learning",
      teacher : "Amit Mittal",
      Status : "Active"
    },
    {
      name : "Data structure and algorithm",
      teacher : "Dr. Vaibhav Jain",
      Status : "Archive"
    },
    {
      name : "Distributed Computing",
      teacher : "Ravindra Verma",
      Status : "Active"
    },
  ]
  
  return (
    <div className={styles.modalContent}>
      {data.map((classItem, id) => (
        <ClassCard 
          key={id} 
          classItem={classItem} 
            />
      ))}
    </div>
  );
};

export default ClassInfoModal;
