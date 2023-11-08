import React, { useEffect, useState } from 'react';
import styles from './GroupMembers.module.scss';
import icon from '../../assets/grouplogo.svg';
import email from '../../assets/groupMemEmail.svg';
import count from '../../assets/groupMemCount.svg';
import GroupMembersList from './GroupMembersList';
import {fetchDataFromAPI} from "../GroupData/fetchgroupmembers"
import { useAllUsers } from "../../DataContext";
import ProgressBar from '../progressbar/ProgressBar';
import studentsvg from "../../assets/student.svg"
const GroupMembers = () => {
  const allusers = useAllUsers();
  const storedGroupInfo = localStorage.getItem('groupInfo');
  const parsedGroupInfo = JSON.parse(storedGroupInfo);
  const [groupInfo, setGroupInfo] = useState(parsedGroupInfo);
  const [members, setMembers] = useState(null);

  function findEmail(data, emailToFind) {
    const emailLookup = {};
    for (const item of data) {
      emailLookup[item.email] = item;
    }
    // Check if the email exists in the lookup
    if (emailLookup.hasOwnProperty(emailToFind)) {
      return emailLookup[emailToFind];
    }
    return null; // Email not found
  }
  useEffect(() => {
    fetchDataFromAPI(groupInfo.groupEmail)
      .then((members) => {
        const data = [];
        if(members.length>0){
        for(const member of members){
          const temp = findEmail(allusers, member.email);
          if(temp!==null)data.push(temp);
          else data.push(member);
        }
      }
        if(members.length > 0 && data.length === 0){
          setMembers(members);
        }
        else
        setMembers(data);
      console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[groupInfo.groupEmail,allusers]);
  return (
    <div className={styles.groupMembers}>
      <div className={styles.head}>
        <img src={icon} alt = '1cs' className={styles.icon}/>
        <div className={styles.details}>
            <p className={styles.heading}>{groupInfo && groupInfo.groupName} </p>
            <div className={styles.row2}>
              <div className={styles.email}>
                <img src={email} alt='email' className={styles.emailimg}/>
                <p>{groupInfo.groupEmail}</p>
              </div>
              <div className={styles.email}>
                <img src={count} alt='email' className={styles.emailimg}/>
                <div>{groupInfo.groupMembersCount}</div>
              </div>
            </div>
            <p className={styles.desc}>{groupInfo.groupDescription || 'Description Not Available'} </p>
        </div>
      </div>
      {members? <GroupMembersList members = {members}/> : <div className={styles.progressBar}> <ProgressBar url={studentsvg}/></div>}
    </div>
  )
}

export default GroupMembers
