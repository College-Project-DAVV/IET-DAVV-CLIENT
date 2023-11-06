import React from "react";
import styles from "./groupData.module.scss";
import { useGroups } from "../../GroupDataContext";
import GroupCard from "./GroupDataCard"
import {fetchDataFromAPI} from "./fetchgroupmembers"
import { useAllUsers } from "../../DataContext";
const GroupData = () => {
  const groups = useGroups();
  const allusers = useAllUsers();
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
  const fetchMembers=(email)=>{
    fetchDataFromAPI(email).then((members)=>{
        let x = 0;
        for(const member of members)
        {if(findEmail(allusers,member.email))x++}
        console.log(x);
    }).catch((err)=>{console.log(err);})
  }
  return (
    <div className={styles.groupdata}>
      {groups && groups.map((group, index) => (
       <div onClick={()=>{fetchMembers(group.groupEmail)}} key={index}> <GroupCard group={group} /></div>
      ))}
    </div>
  );
};

export default GroupData;
