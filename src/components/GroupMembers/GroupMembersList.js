import React, {useState} from "react";
import styles from "./GroupMembersList.module.scss";
import StudentModal from "../Modal/StudentModal/StudentModal";

const GroupMembersList = ({ members }) => {
  const [student, setStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("studInfo");
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
    <div className={styles.groupMemberList}>
      {members && (
        <div className={styles.details}>
          <div className={styles.list}>
            <div className={styles.head}>
              <span className={styles.name}>Name</span>
              <span className={styles.email}>Email id</span>
              <span className={styles.phone}>Phone no</span>
            </div>
        <div className={styles.table}>
            {members &&
              members.map((item, index) => {
                return (
                  <div
                    className={styles.row}
                    key={index}
                    onClick={() => openModal(item)}
                  >
                    <span className={styles.name}>
                      {item.name || "Not Available"}
                    </span>
                    <span className={styles.email}>
                      {item.email || "Not Available"}
                    </span>
                    <span className={styles.phone}>
                      {item.phone || "Not Available"}
                    </span>
                  </div>
                );
            })}
            </div>
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
      )}
    </div>
  );
};

export default GroupMembersList;
