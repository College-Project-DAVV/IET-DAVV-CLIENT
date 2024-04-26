import React, { useEffect, useRef, useState } from 'react'

import styles from './Analytics.module.scss';
import {getAnalyticsBySession, getSession } from '../../../actions/session';
import { formatDate, formatDateToDate } from '../../../actions/exportingFunctions';
import FeedbackAnalytics from './FeedbackAnalytics/FeedbackAnalytics';
import logo from '../../../assets/logo.png'

import html2pdf from 'html2pdf.js';
import ApexChart from './FeedbackAnalytics/ApexChart';
import YesNo from './FeedbackAnalytics/YesNo';
const Analytics = () => {

  const [uniqueDepartments, setUniqueDepartments] = useState([]);

  const [selectedSession, setSelectedSession] = useState({});
  const [session, setSession] = useState([]);
  
  const [manageState, setManageState] = useState(0);
  const [sessionString, setSessionString] = useState("");
  const [total,setTotal]=useState(0);
  
  const [totalclass,setTotalclass]=useState(0);
  const [editFeedback,setEditFeedback]=useState(false);
  const [department_id,setDepartment_id]=useState("")
  const [feedback,setFeedback]=useState([]);

  useEffect(() => {
    const getClassNames = async () => {
      const res2 = await getSession();
      if (res2?.results ) {
        setSession(res2?.results);
      }
    };
    getClassNames();
  }, []);
  const filteredDataSession = session?.filter((item) => {
    const combinedString = `${formatDate(item.sessionStart)} to ${formatDate(
      item.sessionEnd
    )}`;

    return (
      combinedString.toLowerCase().includes(sessionString.toLowerCase()) ||
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(sessionString.toLowerCase())
      )
    );
  });

 async function  handleSessionClick(item) {
    const combinedString = `${formatDate(item.sessionStart)} to ${formatDate(
      item.sessionEnd
    )}`;
    setSelectedSession(item);
    setSessionString(combinedString);
    setManageState(0);

    const res = await getAnalyticsBySession(item.id)
    console.log(res)
    if(res?.results.length>0)
{ 
    let total_sum=0;
    let total_Class=0;
 
    for (let i = 0; i < res?.results.length; i++) {
      if (res?.results[i].total_students && res?.results[i]?.subjects?.length>0) {
        total_sum += (res?.results[i].total_students / res?.results[i]?.subjects?.length);
     
     total_Class++; }
    }
    const results = res?.results || [];
    const uniqueDepartmentsMap = new Map();

    results.forEach(result => {
      if ( result.department_name) {
        // Check if the department_id is not already in the Map before adding
        if (!uniqueDepartmentsMap.has(result.department_name)) {
          uniqueDepartmentsMap.set(result.department_name);
        }
      }
    });
    const uniqueDepartmentsArray = Array.from(uniqueDepartmentsMap).map(([ name]) => ({  name }));
    setUniqueDepartments(uniqueDepartmentsArray);
    setTotalclass(total_Class)
    setTotal(total_sum)
    setFeedback(res?.results)}
    else if (res?.results.length===0){
      alert('No Feedback is Collected for this session')
    }
    else{
      alert(res?.error)
    }

  }
 
  
	const contentRef = useRef(null);

  const convertToPdf = () => {
    const content = contentRef.current;

    const options = {
        filename: `Session-${formatDate(selectedSession?.sessionStart)} - ${formatDate(
          selectedSession?.sessionEnd
        )}.pdf`, 
        margin: 0.5,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: {
            unit: 'in',
            format: 'letter',
            orientation: 'portrait',
        },
        pagebreak: { avoid: '.pagebreak' }, // Specify the class name for the pagebreak
        onBeforeSendPdf: (pdf) => {
            const pageCount = pdf.internal.getNumberOfPages();

            for (let i = 1; i <= pageCount; i++) {
                const contentHeight = pdf.internal.getNumberOfPages(pageCount).contentHeight;
                const pageHeight = pdf.internal.pageSize.getHeight() - (0.5 * 72); // Margin: 0.5 inches

                if (contentHeight > pageHeight) {
                    console.warn(`Content on page ${i} is cut.`);
                    pdf.internal.pages[i].styles['min-height'] = '100%'; // Force content to next page
                }
            }
        },
    };

    html2pdf().set(options).from(content).toPdf((pdf) => {
        // Insert pagebreak before and after the specified div
        const pagebreakDiv = document.querySelector('.pagebreak');
        if (pagebreakDiv) {
            const divIndex = Array.from(pdf.internal.pages).findIndex((page) => {
                return page.pagebreakId === pagebreakDiv.id;
            });
            if (divIndex !== -1) {
                pdf.internal.insertPage(divIndex);
                pdf.internal.insertPage(divIndex + 2);
            }
        }
    }).save();
};


  return (
    <div className={styles.analyticsConatiner}>
      <div className={styles.filterComponent}>
      <div className={styles.inputContainer}>
              <div className={styles.inputheading}> Select Session</div>
              <div className={styles.inputfeild}>
                <input
                  placeholder="Select Session"
                  value={sessionString}
                  onFocus={() => setManageState(3)}
                  onChange={(e) => setSessionString(e.target.value)}
                  disabled={editFeedback}
                />
                {manageState === 3 && (
                  <div className={styles.dropdownselector}>
                    {filteredDataSession.map((item, index) => (
                      <div onClick={(e) => handleSessionClick(item)}>
                        {formatDate(item.sessionStart)} -{" "}
                        {formatDate(item.sessionEnd)}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className={styles.roleInput}>
            <span> Select Department</span>
            <select
              label="Access"
              required
              size="small"
              value={department_id}
              onChange={(e)=>setDepartment_id(e.target.value)}
            
            >
              
              <option value={""}>All Departments</option>

              {uniqueDepartments?.map((item,index)=><option key={item.department_name} value={item.name}>{item.name}</option>)}
            </select>
          </div>
          <button className={styles.downloadpdfButton} onClick={convertToPdf}>
				Download PDF
			</button>
      </div>

     {sessionString!==""? <div className={styles.analyticsComponent} id="divToDownload" ref={contentRef}>
        <div className={styles.headerContainer}>
        <div className={styles.headerContentImageContainer}><img src={logo} alt='logoiet'/></div>
          
          <div className={styles.headerContent1}>Institute of Engineering and Technology , DAVV </div>
          
        <div className={styles.headerContent}>FeedBack Report</div>
          
          <div className={styles.headerContent}><span>{sessionString}</span></div>
        </div>
   { department_id===""&&    <div className={styles.feedbackDetailsContainer}>
          <div>Total Classes : {totalclass}</div>
          
          <div>Total Number of Students : {total}</div>
        </div>}
        <div className={`${styles.feedbackGeneratorContainer} pagebreak`}>
          {feedback?.map((item,index)=>( 
  item.total_students>0 &&((department_id!=="" &&item.department_name===department_id)|| (department_id==="")) &&(            <div className={styles.classDetailsContainer} key = {index}>
              <div className={styles.feedbackDetails1}><span>{item.course_code} {item.year} Year {item.department_name} {item.section}</span> </div>
              <div className={styles.feedbackDetails}>Conducted on :<span> {formatDateToDate(item.startTime)}</span></div>
              <div className={styles.feedbackDetails}>Class Teacher:<span> {item.name}</span></div>
              <div className={styles.feedbackDetails}>Total Students Appeared:<span> {item?.subjects?.length ? Math.round(item.total_students / item?.subjects.length) : "Not available"}</span>
</div>

                <FeedbackAnalytics item={item}/>
                
                <div className={`${styles.chartContainer} pagebreak`} >
          <ApexChart item={item}/></div>
          <div className={`${styles.chartContainer} pagebreak`}>
          <YesNo item={item}/></div>
            </div>)
          ))
             
          }

        </div>
        </div>:<div>Select the Session</div>}
    </div>
  )
}

export default Analytics