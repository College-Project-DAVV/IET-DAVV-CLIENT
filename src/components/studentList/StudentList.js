import React, { useState } from "react";
import styles from "./StudentList.module.scss";
import { useData } from "../../DataContext";
import StudentModal from "../Modal/StudentModal/StudentModal"; 

const StudentList = () => {
  const [student, setStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("studInfo");
  const data = useData();
  const branches = ["bcs", "bit", "bmc", "bcb", "etc", "bei"];

  const openModal = (item) => {
    setStudent(item);
    setActiveTab("studInfo");
    setIsModalOpen(true);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    data && (
      <div className={styles.details}>
        <div className={styles.list}>
          <div className={styles.head}>
            <span className={styles.email}>Email id</span>
            <span className={styles.name}>Name</span>
            <span className={styles.branch}>Branch</span>
            <span className={styles.year}>Year</span>
            <span className={styles.rollno}>Roll no</span>
          </div>
          {data &&
            branches.map((branch, index) =>
              data["All Students"]["Students"]["BE"]["Branches"][branch].map(
                (item, index) => {
                  return (
                    <div
                      className={styles.row}
                      key={index}
                      onClick={() => openModal(item)}
                    >
                      <span className={styles.email}> {item.email || "Not Available"} </span>
                      <span className={styles.name}> {item.name || "Not Available"} </span>
                      <span className={styles.branch}> {item.department || "Not Available"} </span>
                      <span className={styles.year}> {item.year || "Not Available"} </span>
                      <span className={styles.rollno}> {item.rollNumber || "Not Available"} </span>
                    </div>
                  );
                }
              )
            )}
          {isModalOpen && (
          <StudentModal
            student={student}
            activeTab={activeTab}
            handleTabChange={handleTabChange}
            closeModal={closeModal}
          />
        )}
        </div>
      </div>
    )
  );
};

export default StudentList;
