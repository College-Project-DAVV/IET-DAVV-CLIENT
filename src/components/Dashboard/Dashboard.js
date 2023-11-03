import React from "react";
import Cards from "./Cards/Cards";
import Bargraph from "./Bargraph/Bargraph";
import styles from "./Dashboard.module.scss";
import Piechart from "./Piechart/Piechart";
const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Cards />
      <Bargraph />
      <Piechart />
    </div>
  );
};

export default Dashboard;
