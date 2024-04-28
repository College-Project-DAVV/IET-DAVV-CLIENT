import React, { useState } from "react";
import styles from "./FeedBackComponent.module.scss";
import Feedback from "./Feedback/Feedback";
import Session from "./Session/Session";
import Analytics from "./Analytics/Analytics";
import Access from "./Access/Access";
import ProgressBar from "../progressbar/ProgressBar";

import studentsvg from "../../assets/student.svg";

const FeedbackComponent = () => {
  const [step, setStep] = useState(0);
  const [loader, setLoader] = useState(false);

  return (
    <>
      <div className={styles.main_conatiner_feedBack}>
        <div className={styles.switchcomponent}>
          <div
            className={styles.differentcomponents}
            onClick={() => setStep(0)}
            style={
              step === 0 ? { backgroundColor: "#6c74ca", color: "#ffffff" } : {}
            }
          >
            Manage FeedBack Schedule
          </div>

          <div
            className={styles.differentcomponents}
            onClick={() => setStep(1)}
            style={
              step === 1 ? { backgroundColor: "#6c74ca", color: "#ffffff" } : {}
            }
          >
            Manage Academic Session
          </div>
          <div
            className={styles.differentcomponents}
            onClick={() => setStep(2)}
            style={
              step === 2 ? { backgroundColor: "#6c74ca", color: "#ffffff" } : {}
            }
          >
            Grant Access
          </div>
          <div
            className={styles.differentcomponents}
            onClick={() => setStep(3)}
            style={
              step === 3 ? { backgroundColor: "#6c74ca", color: "#ffffff" } : {}
            }
          >
            View Analytics
          </div>
        </div>

        <div className={styles.componentContainer}>
          {(step === 0 && <Feedback setLoader={setLoader} />) ||
            (step === 1 && <Session setLoader={setLoader} />) ||
            (step === 2 && <Access setLoader={setLoader} />) ||
            (step === 3 && <Analytics setLoader={setLoader} />)}
        </div>
      </div>
      {loader && (
        <div className={styles.progressbarcontainer}>
          <ProgressBar url={studentsvg} />
        </div>
      )}
    </>
  );
};

export default FeedbackComponent;
