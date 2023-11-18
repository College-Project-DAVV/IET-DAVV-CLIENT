import React, { useState } from "react";
import styles from "./filter.module.scss";
import filter from "../../assets/filter.svg";

const Filter = ({
  setBranches,
  setDegrees,
  setYears,
  years,
  branches,
  degrees,
}) => {
  const [year, setYear] = useState(false);
  const [branch, setBranch] = useState(false);
  const [degree, setDegree] = useState(false);

  const card = (cardItems, title) => {
    const degreeMap = { 1: "BE", 2: "ME", 3: "MSC" };
    const branchMap = {
      1: "bcs",
      2: "bit",
      3: "bei",
      4: "btc",
      5: "bmc",
      6: "bcv",
    };
    return (
      <div className={styles.card}>
        {cardItems.map((item, index) => {
          return (
            <div key={item}>
              <input
                type="checkbox"
                id={item}
                name={item}
                value={index + 1}
                title={title}
                onClick={(e) => {
                  const name = e.target.title;
                  if (name === "year") {
                    if (e.target.checked) {
                      setYears([...years, +e.target.value]);
                    } else {
                      const yearsNew = years.filter(
                        (item) => item !== +e.target.value
                      );
                      setYears(yearsNew);
                    }
                  } else if (name === "degree") {
                    const val = +e.target.value;
                    if (e.target.checked) {
                      setDegrees([...degrees, degreeMap[val]]);
                    } else {
                      const degreeNew = degrees.filter(
                        (item) => item !== degreeMap[val]
                      );
                      setDegrees(degreeNew);
                    }
                  } else if (name === "branch") {
                    const val = +e.target.value;
                    if (e.target.checked) {
                      setBranches([...branches, branchMap[val]]);
                    } else {
                      const branchNew = degrees.filter(
                        (item) => item !== branchMap[val]
                      );
                      setBranches(branchNew);
                    }
                  }
                }}
              />
              <label htmlFor={item}>{item}</label>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterInfo}>
        <div className={styles.filter}>
          <button
            className={styles.filterItem}
            style={{ marginLeft: "0" }}
            onClick={() => {
              setYear(!year);
              setDegree(false);
              setBranch(false);
            }}
          >
            <img src={filter} alt="filter" />
            <p>Year</p>
          </button>
          
            <div style={{display:year?"block":"none"}}>{card(["1st year", "2nd year", "3rd year", "4th year"], "year")}</div>
        </div>
        <div className={styles.filter}>
          <button
            className={styles.filterItem}
            onClick={() => {
              setBranch(!branch);
              setYear(false);
              setDegree(false);
            }}
          >
            <img src={filter} alt="filter" />
            <p>Branch</p>
          </button>
          
            <div style={{display:branch?"block":"none"}}>{card(["CS", "IT", "E&I", "ETC", "Mech", "Civil"], "branch")}</div>
        </div>
        <div className={styles.filter}>
          <button
            className={styles.filterItem}
            onClick={() => {
              setDegree(!degree);
              setBranch(false);
              setYear(false);
            }}
          >
            <img src={filter} alt="filter" />
            <p>Degree</p>
          </button>
          <div style={{display:degree?"block":"none"}}>{card(["BE", "ME", "MSC"], "degree")}</div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
