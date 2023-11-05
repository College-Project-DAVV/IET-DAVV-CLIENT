import React, { useState } from "react";
import styles from "./StudentList.module.scss";
import { useAllUsers } from "../../DataContext";
import Filter from "../filter/filter";
import StudentModal from "../Modal/StudentModal/StudentModal"; 
const StudentList = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("studInfo");
  const data = useAllUsers();
  const openModal = (item) => {
    setSelectedRow(item);
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
    <>
      <Filter />
      {data && (
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
              data.map((item, index) => {
                if(!isNaN(item.email.charAt(0))){
                return (
                  <div
                    className={styles.row}
                    key={index}
                    onClick={() => openModal(item)}
                  >
                    <span className={styles.email}>
                      {item.email || "Not Available"}
                    </span>
                    <span className={styles.name}>
                      {item.name || "Not Available"}
                    </span>
                    <span className={styles.branch}>
                      {item.department || "Not Available"}
                    </span>
                    <span className={styles.year}>
                      {item.year || "Not Available"}
                    </span>
                    <span className={styles.rollno}>
                      {item.rollNumber || "Not Available"}
                    </span>
                  </div>
                );
              }
              else return null;
            })}
            {isModalOpen && (
          <StudentModal
            selectedRow={selectedRow}
            activeTab={activeTab}
            handleTabChange={handleTabChange}
            closeModal={closeModal}
          />
        )}  
          </div>
        </div>
      )}
    </>
  );
};

export default StudentList;
