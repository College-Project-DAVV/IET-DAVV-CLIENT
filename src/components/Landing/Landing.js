// Landing.js
import React from "react";
import styles from './Landing.module.scss';
import logo from '../../assets/logo2.svg';
import Footer from "./Footer";

const Landing = () => {
  return (
    <div>
      <div className={styles.rectangle}>
        <div className={styles.left}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <p className={styles.text}>Institute of Engineering and Technology</p>
        </div>
        
        <button className={styles.button}/>
      </div>
    
    <div className={styles.mid}>
      <div className={styles.left}>
        <div className={styles.slider}></div>
      </div>
      <div className={styles.right}>
        <div className={styles.top}>
          <h1>WELCOME TO</h1>
          <p>INFORMATION MAINTENANCE SYSTEM</p>
          <hr></hr>
        </div>
        
        <p className={styles.content}>Lorem ipsum dolor sit amet. Est sint illo quo dolor consectetur qui sequi aspernatur ab doloremque nihil est aperiam eius! Et officiis maxime nam iure saepe sit rerum odit aut dolore rerum ab voluptatem fugit et corrupti
        Lorem ipsum dolor sit amet. Est sint illo quo dolor consectetur qui sequi aspernatur ab doloremque nihil est aperiam eius! Et officiis maxime nam iure saepe sit rerum odit aut dolore rerum ab voluptatem fugit et corrupti Lorem ipsum
        </p>
      <div className={styles.feature}>
        <button className={styles.button}>DASHBOARD</button>
        <button className={styles.button}>STUDENT INFO</button>
        <button className={styles.button}>TEACHER INFO</button>
      </div>
      <div className={styles.feature1}>
        <button className={styles.button}>GROUP INFO</button>
        <button className={styles.button}>COURSE INFO</button>
        <button className={styles.button}>TEACHER PORTAL</button>
      </div>
      </div>
    </div>
    <div className={styles.Footer}>
        <Footer/>
      </div>
    </div>
  );
};

export default Landing;
