import React, {useState} from "react";
// import Card from "./card";
import styles from "./teacherinfo.module.scss";
import img1 from "../../assets/vaibhavSir.jpg"
import img2 from "../../assets/praveenSir.jpeg"
import img3 from "../../assets/arpitSir.jpg"
import TeacherModal from "../Modal/TeacherModal/TeacherModal";
// import { useAllUsers } from "../../DataContext";
const Teacher = () => {
  // const data = useAllUsers();
  const data = [
    {
      name : "Dr. Vaibhav Jain",
      email : "vjain@ietdavv.edu.in",
      secemail : "vjain@ietdavv.edu.in",
      phone : "91 94250 71648",
      research : "Data Mining, Information Retrieval, Software Engineering",
      department : "Computer Engineering",
      img : img1,
    },
    {
      name : "Mr. Arpit Agrawal",
      email : "aagrawal@ietdavv.edu.in",
      secemail : "aagrawal@ietdavv.edu.in",
      phone : "91 94240 90249",
      research : "Data Mining and Algorithms",
      department : "Computer Engineering",
      img : img3
    },
    {
      name : " Mr. Pravin Karma",
      email : "pkarma@ietdavv.edu.in",
      secemail : "pkarma@ietdavv.edu.in",
      phone : "91 98263 13816",
      research : "Computer Networks and its related areas.",
      department : "Information Technology",
      img : img2,
    },
    {
      name : "Dr. Vaibhav Jain",
      email : "vjain@ietdavv.edu.in",
      secemail : "vjain@ietdavv.edu.in",
      phone : "91 94250 71648",
      research : "Data Mining, Information Retrieval, Software Engineering",
      department : "Computer Engineering",
      img : img1,
    },
    {
      name : "Mr. Arpit Agrawal",
      email : "aagrawal@ietdavv.edu.in",
      secemail : "aagrawal@ietdavv.edu.in",
      phone : "91 94240 90249",
      research : "Data Mining and Algorithms",
      department : "Computer Engineering",
      img : img3
    },
    {
      name : " Mr. Pravin Karma",
      email : "pkarma@ietdavv.edu.in",
      secemail : "pkarma@ietdavv.edu.in",
      phone : "91 98263 13816",
      research : "Computer Networks and its related areas.",
      department : "Information Technology",
      img : img2,
    },
  ]
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
    <div className={styles.teacherGrid} >
      {/* {data && data.map((teacher, index) => {
        if(isNaN(teacher.email.charAt(0)) && teacher.designation==="Faculty"){
          return(
        <Card key={index} teacher={teacher} onClick={() => openModal(teacher)}/>);
        }
        else return(<div key={index} style={{display:"none"}}></div>);
})} */}
      {data.map((item, id) =>(
        <div className={styles.card} key = {id} onClick={() => openModal(item)}>
            <span>{item.name}</span>
            <span>{item.email}</span>
            <span>{item.secemail}</span>
            <span>{item.phone}</span>
            <span>{item.research}</span>
            <span>{item.department}</span>
        </div>
      ))}
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



