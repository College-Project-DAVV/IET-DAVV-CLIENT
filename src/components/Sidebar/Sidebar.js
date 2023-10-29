import React from "react";
import styles from "./Sidebar.module.scss";
import logo from "../../assets/logo2.svg";
import home from "../../assets/home.svg";
import logoutimg from "../../assets/logout.svg";
import { Link,useNavigate } from "react-router-dom";
export default function Sidebar() {
  const navigate = useNavigate();
  const Logout=()=>{
      localStorage.clear();
      navigate("/");
  }
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
          <Link to="/dashboard" style={{ textDecoration:"none"}}>
            <div className={styles.element}>
              <img src={home} alt="icon" />
              <p>Dashboard</p>
            </div>
          </Link>
          <Link to="/dashboard/studentlist" style={{ textDecoration:"none"}}>
            <div className={styles.element}>
              <img src={home} alt="icon" />
              <p>All Students</p>
            </div>
          </Link>
          <Link to="/dashboard/teacherinfo" style={{ textDecoration:"none"}}>
            <div className={styles.element}>
              <img src={home} alt="icon" />
              <p>Teachers Information</p>
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
