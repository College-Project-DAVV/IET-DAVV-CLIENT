import React from "react";
import styles from './AccessTable.module.scss';
import icon from '../../assets/NoticeSync.png';
import email from '../../assets/groupMemEmail.svg';
import count from '../../assets/groupMemCount.svg';
import { SiMinutemailer } from "react-icons/si";
import { FiExternalLink } from "react-icons/fi";

import { IoMdPersonAdd } from "react-icons/io";
import { Link } from "react-router-dom";

const groupInfo={
    groupName: 'NoticeSync',
    groupEmail: 'notices.ietdavv.edu.in',
    groupMembersCount: 10,
    groupDescription: 'Manage the access of members of NoticeSync.',
    icon: 'path/to/group1-icon.png'} ;

const AccessTable = ({numberOfUsers}) => {
  return <div>
   <div className={styles.groupMembers}>
      <div className={styles.head}>
        <div  className={styles.icon}>
        <div className={styles.msg}>
        <SiMinutemailer/>
        </div>
        <span>NoticeSync</span>
        </div>
        <div className={styles.details}>
            <p className={styles.heading}>{groupInfo && groupInfo.groupName} </p>
            <div className={styles.row2}>
              <div className={styles.email}>
                <div className={styles.redirect}>
                <FiExternalLink />
                </div>
                <p><a href={`https://${groupInfo.groupEmail}`} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color:"gray", fontWeight:'inherit' }}>{groupInfo.groupEmail}</a></p>

                </div>
              <div className={styles.email}>
                <img src={count} alt='email' className={styles.emailimg}/>
                <div>{numberOfUsers+1}</div>
              </div>
            </div>
            <p className={styles.desc}>{groupInfo.groupDescription || 'Description Not Available'} </p>
        </div>
      </div>
       </div>
       
  </div>;
};

export default AccessTable;
