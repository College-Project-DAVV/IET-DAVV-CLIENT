import React, {useState} from "react";
import Card from "./card";
import styles from "./teacherinfo.module.scss";
import TeacherModal from "../Modal/TeacherModal/TeacherModal";
import { useAllUsers } from "../../DataContext";
const Teacher = () => {
  const data = useAllUsers();
  const [teacher, setTeacher] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("teacherInfo");
  const openModal = (item) => {
    setTeacher(item);
    setActiveTab("teacherInfo");
    setIsModalOpen(true);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={styles.teacherGrid}>
      {data && data.map((teacher, index) => {
        if(isNaN(teacher.email.charAt(0)) && teacher.designation==="Faculty"){
          return(
        <div onClick={() => {openModal(teacher)}}  key={index} ><Card key={index} teacher={teacher} /></div>);
        }
        else return(<div key={index} style={{display:"none"}}></div>);
})}
      {isModalOpen && (
          <TeacherModal
            teacher={teacher}
            activeTab={activeTab}
            handleTabChange={handleTabChange}
            closeModal={closeModal}
          />
        )}  
    </div>
  );
};

export default Teacher;



