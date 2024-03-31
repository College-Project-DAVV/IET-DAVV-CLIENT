import React, { useState } from 'react'
import styles from './FeedBackComponent.module.scss';
import Feedback from './Feedback/Feedback';
import Session from './Session/Session';
import Analytics from './Analytics/Analytics';
import Access from './Access/Access';

const FeedbackComponent = () => {
  const [step,setStep]=useState(0);
 
  return (
    <div className={styles.main_conatiner_feedBack}>
      <div className={styles.switchcomponent}>
        
        <div className={styles.differentcomponents} onClick={()=>setStep(0)}         style={step === 0 ? { backgroundColor: '#6c74ca', color: '#ffffff' } : {}}>Manage FeedBack</div>
      
        <div className={styles.differentcomponents} onClick={()=>setStep(1)}       style={step === 1 ? { backgroundColor: '#6c74ca', color: '#ffffff' } : {}}>Manage Session</div>
        <div className={styles.differentcomponents} onClick={()=>setStep(2)}       style={step === 2 ? { backgroundColor: '#6c74ca', color: '#ffffff' } : {}}>Manage Access</div>
        <div className={styles.differentcomponents} onClick={()=>setStep(3)}       style={step === 3 ? { backgroundColor: '#6c74ca', color: '#ffffff' } : {}}>View Analytics</div>
       
         </div>

         <div className={styles.componentContainer}>
          {step===0 && <Feedback/> || step===1  && <Session/> || step===2&&<Access/>|| step===3 && <Analytics/>}
         </div>
    </div>
  )
}

export default FeedbackComponent