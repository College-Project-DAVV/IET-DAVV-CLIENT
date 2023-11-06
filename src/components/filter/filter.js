import React from "react";
import styles from "./filter.module.scss";
import filter from "../../assets/filter.svg";

const Filter = () => {
  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterInfo}>
        <button className={styles.filterItem} style={{marginLeft:"0"}}>
          <img src={filter} alt="filter" />
          <p>Year</p>
        </button>
        <button className={styles.filterItem}>
          <img src={filter} alt="filter" />
          <p>Branch</p>
        </button>
        <button className={styles.filterItem}>
          <img src={filter} alt="filter" />
          <p>Degree</p>
        </button>
      </div>
    </div>
  );
};

export default Filter;
