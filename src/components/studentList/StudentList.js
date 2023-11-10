import React, { useEffect, useState } from "react";
import styles from "./StudentList.module.scss";
import { useAllUsers } from "../../DataContext";
import Filter from "../filter/filter";
import StudentModal from "../Modal/StudentModal/StudentModal"; 
import ProgressBar from "../progressbar/ProgressBar";
import studentsvg from "../../assets/student.svg"
const StudentList = ({type,members}) => {
  const [student, setStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("studInfo");
  const [years,setYears]=useState([]);
  const [branches,setBranches]=useState([]);
  const [degree,setDegree]=useState([]);
  const data2 = useAllUsers();
  const [data,setData] = useState(null);
  function findEmail(data, emailToFind) {
    const emailLookup = {};
    for (const item of data) {
      emailLookup[item.email] = item;
    }
    if (emailLookup.hasOwnProperty(emailToFind)) {
      return emailLookup[emailToFind];
    }
    return null; // Email not found
  }
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
useEffect(()=>{
  if(type!=="courseMembers"){
    setData(data2);
  }
  else{
    const dataS=[];
    if(members && members.length>0 && data2){
      for(const member of members){
        const temp = findEmail(data2, member.email);
        if(temp!==null)dataS.push(temp);
        else dataS.push(member);
      }
    }
    setData(dataS);
  }
},[type,members,data2])
  return (
    <>
      <Filter setYears={setYears} setBranches={setBranches} setDegrees={setDegree} years={years} branches={branches} degrees={degree}/>
      {data ? (
        <div className={styles.details}>
          <div className={styles.list}>
            <div className={styles.head}>
              <span className={styles.email}>Email id</span>
              <span className={styles.name}>Name</span>
              <span className={styles.branch}>Branch</span>
              <span className={styles.year}>Year</span>
              <span className={styles.rollno}>Roll no</span>
            </div>
        <div className={styles.table}>
            {data &&
              data.map((item, index) => {
                if(!isNaN(item.email.charAt(0))){
                if(years.length!==0 && years.indexOf(24-+item.year)===-1)return null;
                if(branches.length!==0 && branches.indexOf(item.branch)===-1)return null;
                if(degree.length!==0 && degree.indexOf(item.degree) === -1)return null;
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
      ) :<div className={styles.progressBar}> <ProgressBar url={studentsvg}/></div>}
    </>
  );
};

export default StudentList;
