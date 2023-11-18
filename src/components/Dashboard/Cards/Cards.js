import React from "react";
import styles from "./cards.module.scss";
const Cards = ({DegreeWiseData}) => {
  const items = [
    {
      head: "Total Students",
      num: DegreeWiseData[0] + DegreeWiseData[1] + DegreeWiseData[2] + DegreeWiseData[3],
    },
    {
      head: "B.E. Students",
      num: DegreeWiseData[1],
    },
    {
      head: "M.E. Students",
      num: DegreeWiseData[2],
    },
    {
      head: "M.Sc. Students",
      num: DegreeWiseData[3],
    },
  ];
  return (
    <div className={styles.cards}>
      {items.map((item, index) => (
        <div className={styles.card} key={index}>
          <div className={styles.num}>{item.num}</div>
          <div className={styles.heading}>{item.head}</div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
