import React from 'react'
import styles from './Footer.module.scss'
import Facebook from '../../assets/FacebookLogo.svg';
import Instagram from '../../assets/InstagramLogo.svg';
import Linkedin from '../../assets/LinkedinLogo.svg';
import Youtube from '../../assets/YoutubeLogo.svg';
const Footer = () => {
  return (
    <div className={styles.footer}>
        <div className={styles.section}>
            <div className={styles.links}>
                <div className={styles.head}>
                    <h1>QUICK LINKS</h1>
                    
                </div>
                <div className={styles.head1}>
                   
                    <a href='/IET WEBSITE'>
                        <p>IET WEBSITE</p>
                    </a>
                    <a href='/TEACHER'>
                        <p>TEACHER PORTAL</p>
                    </a>
                    <a href='/STUDENT'>
                        <p>STUDENT PORTAL</p>
                    </a>
                </div>
               
                <div className={styles.connect}>
                    <p>CONNECT WITH US</p>
                    <div className={styles.social}>
                    <p><img src={Facebook} alt="Facebook"/></p>
                    <p><img src={Instagram} alt="Facebook"/></p>
                    <p><img src={Linkedin} alt="Facebook"/></p>
                    <p><img src={Youtube} alt="Facebook"/></p>
                    </div>
                </div>
            </div>

            <hr></hr>

            <div className={styles.bottom}>
                <div className={styles.contribute}>
                    <h4>Contributors</h4>
                </div>
                <div className={styles.name}>
                    <p>Harsh Farkiya</p>
                    <p>Smruti Lakhamapurkar</p>
                    <p>Suhani Verma</p>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default Footer
