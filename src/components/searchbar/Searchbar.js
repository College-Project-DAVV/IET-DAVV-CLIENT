import React from "react";
import styles from "./Searchbar.module.scss";
import { useState } from "react";
import { useData } from "../../DataContext";
import SearchItemCard from "./SearchItemCard";
export default function Searchbar() {
  const data = useData();
  const profileData = JSON.parse(localStorage.getItem("profile"));
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleSearch = (query) => {
    const results = [];
    for (const category in data["All Students"]["Students"]["BE"]["Branches"]) {
      for (const item of data["All Students"]["Students"]["BE"]["Branches"][
        category
      ]) {
        if (item.name.toLowerCase().includes(query) ||item.email.toLowerCase().includes(query)||item.rollNumber.toLowerCase().includes(query) || item.department.toLowerCase().includes(query)) {
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
          <img src={profileData&&profileData.result.picture} alt={profileData&& profileData.result.name} title={profileData&& profileData.result.name}/>
        </div>
      </div>
      {searchQuery &&<div className={styles.searchresult}>
        {searchResults.map((element,index)=>{
         return(
          <SearchItemCard item={element} key={index}/>
         );
        })}
      </div>}
    </div>
  );
}
