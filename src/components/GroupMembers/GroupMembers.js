import React, { useEffect, useState } from 'react';
import styles from './GroupMembers.module.scss';
import icon from '../../assets/grouplogo.svg';
import email from '../../assets/groupMemEmail.svg';
import count from '../../assets/groupMemCount.svg';
import GroupMembersList from './GroupMembersList';
import {fetchDataFromAPI} from "../GroupData/fetchgroupmembers"
import { useAllUsers } from "../../DataContext";
import Filter from '../filter/filter';

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
  const fetchMembers = (group) => {
    return fetchDataFromAPI(group)
      .then((members) => {
        const data = [];
        for(const member of members){
          data.push(findEmail(allusers, member.email));
        }
        setMembers(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const member = fetchMembers(groupInfo.groupEmail);
  },[groupInfo.groupEmail]);
  return (
    <div className={styles.groupMembers}>
      <div className={styles.head}>
        <img src={icon} alt = '1cs' className={styles.icon}/>
        <div className={styles.details}>
            <p className={styles.heading}>{groupInfo.groupName} </p>
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
      <Filter className={styles.filter}/>
      <GroupMembersList members = {members}/>
    </div>
  )
}

export default GroupMembers
