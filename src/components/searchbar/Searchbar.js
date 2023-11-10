import React from "react";
import styles from "./Searchbar.module.scss";
import { useState } from "react";
import { useAllUsers } from "../../DataContext";
import SearchItemCard from "./SearchItemCard";
import StudentModal from "../Modal/StudentModal/StudentModal";
import TeacherModal from "../Modal/TeacherModal/TeacherModal";
export default function Searchbar() {
  const data = useAllUsers();
  const profileData = JSON.parse(localStorage.getItem("profile"));
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [student, setStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("studInfo");
  const [activeTab2, setActiveTab2] = useState("teacherInfo");
  const openModal = (item) => {
    setStudent(item);
    setActiveTab("studInfo");
    setIsModalOpen(true);
    setSearchQuery("");
  };
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const handleTabChange2 = (tab) => {
    setActiveTab2(tab);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleSearch = (query) => {
    const results = [];
    if (data) {
      for (const item of data) {
        if (
          item.name.toLowerCase().includes(query) ||
          item.email.toLowerCase().includes(query) ||
          (item.rollNumber && item.rollNumber.toLowerCase().includes(query)) ||
          (item.department && item.department.toLowerCase().includes(query))
        ) {
          results.push(item);
        }
      }
    }
    setSearchResults(results);
  };
  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    handleSearch(query);
  };
  return (
    <div>
      <div className={styles.searchbarContainer}>
        <form className={styles.searchForm}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search here"
            value={searchQuery}
            onChange={handleInputChange}
          />
        </form>
        <div className={styles.profileContainer}>
          <img
            src={profileData && profileData.result.picture}
            alt={profileData && profileData.result.name}
            title={profileData && profileData.result.name}
          />
        </div>
      </div>
      {searchQuery && (
        <div className={styles.searchresult}>
          {searchResults.map((element, index) => {
            return (
              <div onClick={() => openModal(element)} key={index}>
                <SearchItemCard item={element} key={index} />
              </div>
            );
          })}
        </div>
      )}
      {isModalOpen && (
          student.designation==="Student"?<StudentModal
            student={student}
            activeTab={activeTab}
            handleTabChange={handleTabChange}
            closeModal={closeModal}
          /> : <TeacherModal
          teacher={student}
            activeTab={activeTab2}
            handleTabChange={handleTabChange2}
            closeModal={closeModal}
           />
        )}  
    </div>
  );
}
