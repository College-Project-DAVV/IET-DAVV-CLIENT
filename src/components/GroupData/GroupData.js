import React, { useState } from "react";
import { Link } from 'react-router-dom';
import styles from "./groupData.module.scss";
import { useGroups } from "../../GroupDataContext";
import GroupCard from "./GroupDataCard"
import { MdCloudSync } from "react-icons/md";
import ProgressBar from "../progressbar/ProgressBar";
import studentsvg from "../../assets/student.svg"

const GroupData = () => {
  const groups = useGroups();
  const [loading, setLoading]= useState(false) ;
  
  const handleUpdateData= async()=>{
  
  const res= window.confirm("Update Groups From NoticeSync")

  
  }
  return (!loading?(<>
  <div className={styles.grpNoticeSync} onClick={handleUpdateData }>
    <span>Update the Groups on NoticeSync</span>
    <MdCloudSync className={styles.Cloudicon} />
  </div>
    <div className={styles.groupdata}>  
    {groups && groups.map((group, index) => (
      <div key={index} onClick = {()=> {localStorage.setItem('groupInfo', JSON.stringify(group));}} >
        <Link to="/dashboard/groupmembers" className={styles.link}> 
          <GroupCard group={group} />
        </Link>
      </div>
    ))}
  </div>
  </>):<ProgressBar url={studentsvg}/>);
};

export default GroupData;
