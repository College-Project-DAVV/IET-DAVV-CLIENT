import React from 'react'
import styles from './FeedbackAnalytics.module.scss'
const question1=[
    "Clarity",
    "Motivation",
    "Communication Skills",
    "Regularity",
    "Knowledge",
    "Coverage",
    "Practical Approach",
    "Interaction",
    "IT Skills",
    "Overall"
]
const question2=[
    "Result of test declared within two weeks of it being conducted",
    "Adequate number of assignments/cases given.",
    "Would you recommend him/her to teach the same subject to your juniors?",
    "Would you recommend him/her to teach you any other subject?",
    "In your opinion is this syllabus adequate?"
  ]

  const StrengthComponent = ({item}) => {
    const strengths = [];
  
    Object.entries(item?.response).forEach(([question, responseValue], index) => {
      if (question !== 'total' && question.includes('sum') && (responseValue / item.response.total).toFixed(2) >= 4) {
        strengths.push(question1[index-1]); 
      }
    });
  
    if (strengths.length === 0) {
        return "No strengths found"; // If no strengths found, return this message
      }
    return strengths.join(', '); 
  }
  const WeeknessComponent = ({item}) => {
    const strengths = [];
  
    Object.entries(item?.response).forEach(([question, responseValue], index) => {
      if (question !== 'total' && question.includes('sum') && (responseValue / item.response.total).toFixed(2) < 3) {
        strengths.push(question1[index-1]); 
      }
    });
  
    if (strengths.length === 0) {
        return "No Weakness found"; // If no strengths found, return this message
      }
    return strengths.join(', '); 
  }
  function calculateRating  (item)  {
    let sum = 0;
    let count = 0;
    Object.entries(item?.response).forEach(([question, responseValue], index) => {
        if (question !== 'total' && question.includes('sum')) {
            sum += responseValue;
        }
        else if (question !== 'total' && question.includes('count')) {
            count += responseValue  // Increment count for true (positive)
        }
    });
let ans = sum/item.response.total
ans/=10;
 count = count/item.response.total

 
 sum = (ans+count)/2
 
    return sum; 
}

const FeedbackAnalytics = ({item}) => {
  return (
  
             <div className={styles.subjectsContainer}>
            {item?.subjects?.length>0&& item?.subjects.map((item,index1)=>(

              <div  key = {index1} className={styles.subjectChild1}>
                <div className={`${styles.pagebreakStop} pagebreak`}>
                <div>Subject Name : {item?.subject_name}</div>
                
                <div>Subject Code : {item?.subject_code}</div>
                <div>Faculty Name : {item?.title}{item?.first_name}{item?.last_name}</div>
                </div>
                <div className={styles.responsesContainer}>
                <div className={`${styles.tableContainer} pagebreak`}>
      <table>
        <thead>
          <tr>
            {question1.map((question, index) => (
              <th key={index}>{question}</th>
            ))}
          </tr>
        </thead>
        <tbody>
        <tr>
            {Object.entries(item?.response).map(([question, responseValue]) => (
              question !== 'total' && question.includes('sum') && (
                <td key={question}>{(responseValue / item.response.total).toFixed(2)}</td>
              )
            ))}
          </tr>
        </tbody>
      </table>
    </div>
    <div className={`${styles.yesNoContainer} pagebreak`}>
      <div className={styles.questionyesno1}>
        <div className={styles.q1}>Question  Asked</div>
        <div className={styles.yesno1}>Yes in %</div>
        <div className={styles.yesno1}> No in %</div>
      </div>
           <div className={styles.questionyesno}>
            <span className={styles.number}>1</span>
        <div className={styles.q}>Result of test declared within two weeks of it being conducted</div>
        <div className={styles.yesno}>{((item.response.q11_count / item.response.total)*100).toFixed(2)}%</div>
        <div className={styles.yesno}> {(((item.response.total-item.response.q11_count) / item.response.total)*100).toFixed(2)}%</div>
      </div>
           <div className={styles.questionyesno}>
           <span className={styles.number}>2</span>
        <div className={styles.q}>Adequate number of assignments/cases given.</div>
        <div className={styles.yesno}>{((item.response.q12_count / item.response.total)*100).toFixed(2)}%</div>
        <div className={styles.yesno}>{(((item.response.total-item.response.q12_count) / item.response.total)*100).toFixed(2)}%</div>
      </div>
           <div className={styles.questionyesno}>
           <span className={styles.number}>3</span>
        <div className={styles.q}>Would you recommend him/her to teach the same subject to your juniors?</div>
        <div className={styles.yesno}>{((item.response.q13_count / item.response.total)*100).toFixed(2)}%</div>
        <div className={styles.yesno}> {(((item.response.total-item.response.q13_count) / item.response.total)*100).toFixed(2)}%</div>
      </div>
           <div className={styles.questionyesno}>
           <span className={styles.number}>4</span>
        <div className={styles.q}>Would you recommend him/her to teach you any other subject?</div>
        <div className={styles.yesno}>{((item.response.q14_count / item.response.total)*100).toFixed(2)}%</div>
        <div className={styles.yesno}> {(((item.response.total-item.response.q14_count) / item.response.total)*100).toFixed(2)}%</div>
      </div>
           <div className={styles.questionyesno}>
           <span className={styles.number}>5</span>
        <div className={styles.q}>In your opinion is this syllabus adequate?</div>
        <div className={styles.yesno}>{((item.response.q15_count / item.response.total)*100).toFixed(2)}%</div>
        <div className={styles.yesno}> {(((item.response.total-item.response.q15_count) / item.response.total)*100).toFixed(2)}%</div>
      </div>
    </div>
        <div className={styles.overAllContainer}>        
    <div>Strength :<StrengthComponent item={item}/></div>
    
    <div>Weekness : <WeeknessComponent item={item}/></div>
                <div>Overall Rating: {calculateRating(item).toFixed(2)}</div>
                </div>

                </div>
             
              </div>
            ))}
          </div>
    
  )
}

export default FeedbackAnalytics