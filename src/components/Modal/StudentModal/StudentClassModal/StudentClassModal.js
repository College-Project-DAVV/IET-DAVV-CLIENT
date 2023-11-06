import React, { useEffect, useState } from "react";
import styles from "./studentClassModal.module.scss";

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
      {data.map((item,id) =>(
        <div className={styles.card} key = {id}>
          <span className={styles.head}>
            <span>Course Name : </span>
            <span>{item.name}</span>
          </span>
          <span className={styles.teacher}>
            <span>Teacher Name : </span>
            <span>{item.teacher}</span>
          </span>
          <span className={`${styles.status} ${item.Status === 'Active' ? styles.active : ''}`}>
            <span>Status : </span>
            <span>{item.Status}</span>
          </span>
        </div>
      ))}
    </div>
  );
};

export default ClassInfoModal;
