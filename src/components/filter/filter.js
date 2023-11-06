import React, { useState } from "react";
import styles from "./filter.module.scss";
import filter from "../../assets/filter.svg";

const Filter = () => {
  const [year,setYear] = useState(false);
  const [branch,setBranch] = useState(false);
  const [degree,setDegree] = useState(false);
  const card = (cardItems)=>{
    return(
      <div className={styles.card} >
        {
        cardItems.map((item,index)=>{
         return(
          <div>
          <input type="checkbox" id={item} name={item} value={index} />
          <label for={item}>{item}</label>
          </div>         
         );
        })
      }
      </div>
    )
  }
  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterInfo}>
        <div className={styles.filter}>
          <button className={styles.filterItem} style={{ marginLeft: "0" }} onClick={()=>{setYear(!year); setDegree(false); setBranch(false);}}>
            <img src={filter} alt="filter" />
            <p>Year</p>
          </button>
         { year && card(["1st year","2nd year","3rd year","4th year"])}
        </div>
        <div className={styles.filter}>
          <button className={styles.filterItem} onClick={()=>{setBranch(!branch); setYear(false); setDegree(false);}}>
            <img src={filter} alt="filter" />
            <p>Branch</p>
          </button>
          {branch&& card(["CS","IT","E&I","ETC","Mech","Civil"])}
        </div>
        <div className={styles.filter}>
          <button className={styles.filterItem} onClick={()=>{setDegree(!degree); setBranch(false); setYear(false);}}>
            <img src={filter} alt="filter" />
            <p>Degree</p>
          </button>
          {degree && card(["BE","ME","MSC"])}
        </div>
      </div>
    </div>
  );
};

export default Filter;
