import React from "react";
import { Link } from 'react-router-dom';
import styles from "./groupData.module.scss";
import { useGroups } from "../../GroupDataContext";
import GroupCard from "./GroupDataCard"

const GroupData = () => {
  const groups = useGroups();
  return (
    <div className={styles.groupdata}>
    {groups && groups.map((group, index) => (
      <div key={index} onClick = {()=> {localStorage.setItem('groupInfo', JSON.stringify(group));}} >
        <Link to="/dashboard/groupmembers" className={styles.link}> 
          <GroupCard group={group} />
        </Link>
      </div>
    ))}
  </div>
  );
};

export default GroupData;
