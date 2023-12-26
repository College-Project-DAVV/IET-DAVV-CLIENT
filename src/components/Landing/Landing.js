// Landing.js
import React, { useState } from "react";
import styles from './Landing.module.scss';
import logo from '../../assets/logo2.svg';
import Footer from "./Footer";
import Login from "../Login/Login";
import Slider from "./Slider/Slider";
const Landing = () => {
  const [index,setIndex] = useState(undefined);
  const changeSlide=(i)=>{
      setIndex(i);
  }
  return (
    <div className={styles.container}>
      <div className={styles.rectangle}>
        <div className={styles.left}>
        <img src={logo} alt="Logo" className={styles.logo} />
        <p className={styles.text}>Institute of Engineering and Technology</p>
        </div>
        <div className={styles.button}><Login/></div>
      </div>
    
    <div className={styles.mid}>
      <div className={styles.left}>
        <Slider ind={index}/>
      </div>
      <div className={styles.right}>
        <div className={styles.top}>
          <p className={styles.welcome}>WELCOME TO</p>
          <p className={styles.iet}>INFORMATION MAINTENANCE SYSTEM</p>
        </div>
        <p className={styles.content}>
  Discover a dynamic educational hub where students, teachers, and groups seamlessly converge. Our user-centric platform offers a unified experience, providing easy access to comprehensive information. Effortlessly navigate class schedules, group activities, and individual details through an intuitive interface. The robust search option ensures quick and efficient retrieval of any user's information. Empower your academic journey with a connected, informed, and collaborative environment. Welcome to a digital realm that enhances communication and accessibility, fostering a vibrant educational community for both students and teachers alike.
  </p>
      <div className={styles.feature}>
        <button className={styles.button} onClick={()=>{changeSlide(0)}}>DASHBOARD</button>
        <button className={styles.button} onClick={()=>{changeSlide(1)}}>STUDENT INFO</button>
        <button className={styles.button} onClick={()=>{changeSlide(2)}}>TEACHER INFO</button>
        <button className={styles.button} onClick={()=>{changeSlide(3)}}>GROUP INFO</button>
        <button className={styles.button} onClick={()=>{changeSlide(4)}}>COURSE INFO</button>
        <button className={styles.button} onClick={()=>{changeSlide(5)}}>SEARCH</button>
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
