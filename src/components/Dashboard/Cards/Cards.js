import React from "react";
import styles from "./cards.module.scss";
import { useData } from "../../../DataContext";
const Cards = () => {
  const data = useData();
  console.log(data);
  const items = [
    {
      head: "Total Students",
      num: data ? data["All Students"]["count"] : 0,
    },
    {
      head: "B.E. Students",
      num: data ? data["All Students"]["Students"]["BE"]["count"] : 0,
    },
    {
      head: "M.E. Students",
      num: 0,
    },
    {
      head: "M.Sc. Students",
      num: 0,
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
