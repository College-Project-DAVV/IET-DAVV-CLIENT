import React, { useEffect, useRef, useState } from 'react'

import styles from './Analytics.module.scss';
import {getAnalyticsBySession, getSession } from '../../../actions/session';
import { formatDate, formatDateToDate } from '../../../actions/exportingFunctions';
import FeedbackAnalytics from './FeedbackAnalytics/FeedbackAnalytics';


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
  const [department_id,setDepartment_id]=useState(-1)
  const [feedback,setFeedback]=useState([]);

  useEffect(() => {
    const getClassNames = async () => {
      const res2 = await getSession();
      if (res2 ) {
        setSession(res2.results);
      }
    };
    getClassNames();
  }, []);
  const filteredDataSession = session?.filter((item) => {
    const combinedString = `${formatDate(item.sessionStart)} - ${formatDate(
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
    const combinedString = `${formatDate(item.sessionStart)} - ${formatDate(
      item.sessionEnd
    )}`;
    setSelectedSession(item);
    setSessionString(combinedString);
    setManageState(0);

    console.log(item)
    const res = await getAnalyticsBySession(item.id)
    console.log(res)
    let total_sum=0;
    let total_Class=0;
 
    for (let i = 0; i < res?.results.length; i++) {
      if (res?.results[i].total_students && res?.results[i]?.subjects?.length>0) {
        total_sum += (res?.results[i].total_students / res?.results[i]?.subjects?.length);
     
     total_Class++; }
    }
    const results = res?.results || [];
    const uniqueDepartmentsSet = new Set();

    results.forEach(result => {
      if (result.department_id && result.department_name) {
        const departmentString = JSON.stringify({
          id: result.department_id,
          name: result.department_name
        });

        // Check if the department is not already in the set before adding
        if (!uniqueDepartmentsSet.has(departmentString)) {
          uniqueDepartmentsSet.add(departmentString);
        }
      }
    });

    setUniqueDepartments(Array.from(uniqueDepartmentsSet).map(departmentString => JSON.parse(departmentString)));
  
    setTotalclass(total_Class)
    setTotal(total_sum)
    setFeedback(res?.results)

  }
  console.log(uniqueDepartments)
 
  
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
              
              <option value={-1}>All Departments</option>

              {uniqueDepartments?.map((item,index)=><option key={item.department_name} value={item.id}>{item.name}</option>)}
            </select>
          </div>
          <button className={styles.downloadpdfButton} onClick={convertToPdf}>
				Download PDF
			</button>
      </div>

      <div className={styles.analyticsComponent} id="divToDownload" ref={contentRef}>
        <div className={styles.headerContainer}>
          
        <div className={styles.headerContent}>FeedBack Report</div>
          <div className={styles.headerContent}>Institute of Engineering and Technology , DAVV </div>
          
          <div className={styles.headerContent1}>Session :10/02/2024  to 10/05/2025</div>
        </div>
        <div className={styles.feedbackDetailsContainer}>
          <div>Total Classes : {totalclass}</div>
          
          <div>Total Number of Students : {total}</div>
        </div>
        <div className={styles.feedbackGeneratorContainer}>
          {feedback?.map((item,index)=>( 
  item.total_students>0 && (            <div className={styles.classDetailsContainer} key = {index}>
              <div className={styles.feedbackDetails}>Class : {item.course_code} {item.year} Year {item.department_name} {item.section} </div>
              <div className={styles.feedbackDetails}>Conducted on : {formatDateToDate(item.startTime)}</div>
              <div className={styles.feedbackDetails}>Class Teacher: {item.name}</div>
              <div className={styles.feedbackDetails}>Total Students Appeared: {item?.subjects?.length ? Math.round(item.total_students / item?.subjects.length) : "Not available"}
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
        </div>
    </div>
  )
}

export default Analytics