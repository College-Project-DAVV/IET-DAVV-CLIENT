import React from "react";
import styles from "./Sidebar.module.scss";
import logo from "../../assets/logo2.svg";
import home from "../../assets/home.svg";
import student from '../../assets/student.svg'
import teacher from '../../assets/teacher.svg'
import logoutimg from "../../assets/logout.svg";
import groupimg from "../../assets/groupicon.svg"
import { Link, useNavigate } from "react-router-dom";
import { MdMarkEmailRead } from "react-icons/md";
import { MdFeed } from "react-icons/md";
export default function Sidebar() {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className={styles.head}>
      <div className={styles.institute}>
        <Link to="/dashboard">
          {" "}
          <img src={logo} alt="icon" />
        </Link>
        <h1>IET-DAVV</h1>
      </div>
      <div className={styles.navigationContainer}>
        <p>Main Navigation</p>
        <div className={styles.elements}>
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <div className={styles.element}>
              <img src={home} alt="icon" />
              <p>Dashboard</p>
            </div>
          </Link>
          <Link to="/dashboard/studentlist" style={{ textDecoration: "none" }}>
            <div className={styles.element}>
              <img src={student} alt="icon" />
              <p>All Students</p>
            </div>
          </Link>
          <Link to="/dashboard/teacherinfo" style={{ textDecoration: "none" }}>
            <div className={styles.element}>
              <img src={teacher} alt="icon" />
              <p>Teachers Information</p>
            </div>
          </Link>
          <Link to="/dashboard/groupinfo" style={{ textDecoration: "none" }}>
            <div className={styles.element}>
              <img src={groupimg} alt="icon" />
              <p> Group Information</p> 
            </div>
          </Link>
           <Link to="/dashboard/noticeSync" style={{ textDecoration: "none" }}>
            <div className={styles.element}>
              <span className={styles.iconMD}>
              <MdMarkEmailRead/>
              </span>
              <p> NoticeSync</p> 
            </div>
          </Link>
          <Link to="/dashboard/feedback" style={{ textDecoration: "none" }}>
            <div className={styles.element}>
              <span className={styles.iconMD}>
              <MdFeed/>
              </span>
              <p>FeedBack</p> 
            </div>
          </Link>
           <Link to="/dashboard/addldapuser" style={{ textDecoration: "none" }}>
            <div className={styles.element}>
              <span className={styles.iconMD}>
              <MdMarkEmailRead/>
              </span>
              <p> LDAP User</p> 
            </div>
          </Link>
          <Link to="/dashboard/adminAccess" style={{ textDecoration: "none" }}>
            <div className={styles.element}>
                
              <img src={teacher} alt="icon" />
              <p>Admin Portal Access</p> 
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.logout} onClick={Logout}>
        <img src={logoutimg} alt="logout" />
        <p>Logout</p>
      </div>
    </div>
  );
}
