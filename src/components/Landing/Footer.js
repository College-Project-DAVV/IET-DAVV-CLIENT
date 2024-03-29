import React from "react";
import styles from "./Footer.module.scss";
import Facebook from "../../assets/FacebookLogo.svg";
import Instagram from "../../assets/InstagramLogo.svg";
import Linkedin from "../../assets/LinkedinLogo.svg";
import Youtube from "../../assets/YoutubeLogo.svg";
const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.links}>
        <div className={styles.link}>
          <div className={styles.head}>
            <p>QUICK LINKS</p>
          </div>
          <div className={styles.head1}>
            <a href="https://ietdavv.edu.in" target="_blank" rel="noreferrer">
              <p>IET WEBSITE</p>
            </a>
            <a href="https://faculty.ietdavv.edu.in" target="_blank" rel="noreferrer">
              <p>TEACHER PORTAL</p>
            </a>
            <a href="https://student.ietdavv.edu.in" target="_blank" rel="noreferrer">
              <p>STUDENT PORTAL</p>
            </a>
            <a href="https://notices.ietdavv.edu.in" target="_blank" rel="noreferrer">
              <p>NoticeSync</p>
            </a>
          </div>
        </div>

        <div className={styles.connect}>
          <p>CONNECT WITH US</p>
          <div className={styles.social}>
           <a href="https://www.facebook.com/davv.iet" target="_blank">  <img src={Facebook} alt="Facebook" /></a>
           <a href="https://twitter.com/ietdavv" target="_blank">  <img src={Instagram} alt="Twitter" /></a>
            <a href="https://www.linkedin.com/school/ietdavv/" target="_blank"><img src={Linkedin} alt="Linkedin" /></a>
            <a href="https://www.youtube.com/channel/UCPFbqGEevBQ7-VT-Z_VWu1w/featured" target="_blank"> <img src={Youtube} alt="Facebook" /></a>
            
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.contribute}>
          <h4>Contributors</h4>
        </div>
        <div className={styles.name}>
          <a href="https://www.linkedin.com/in/harsh-farkiya-410523201/" target="_blank" rel="noreferrer">Harsh Farkiya</a>
          <a href="https://www.linkedin.com/in/smrutii/" target="_blank" rel="noreferrer">Smruti Lakhamapurkar</a>
          <a href="https://www.linkedin.com/in/suhani-verma/" target="_blank" rel="noreferrer">Suhani Verma</a>
          <a href="https://www.linkedin.com/in/deepakkpatil/" target="_blank" rel="noreferrer">Deepak Patil</a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
