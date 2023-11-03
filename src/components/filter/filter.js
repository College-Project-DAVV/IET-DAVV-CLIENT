import React from "react";
import "./filter.scss";
import filter from '../../assets/filter.svg'

const Filter = () => {
  return (
    <div className="filter-container">
      <div className="filter-info">
        <button className="filter-item">
        <img src={filter} alt="filter"/>
          <div className="text-wrapper">Year</div>
        </button>
        <button className="filter-item">
        <img src={filter} alt="filter"/>
          <div className="text-wrapper">Branch</div>
        </button>
        <button className="filter-item">
        <img src={filter} alt="filter"/>
          <div className="text-wrapper">Degree</div>
        </button>
      </div>
    </div>
  );
};

export default Filter;
