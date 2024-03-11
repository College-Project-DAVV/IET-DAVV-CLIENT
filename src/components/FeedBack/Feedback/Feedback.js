import React, { useEffect, useState } from 'react'

import styles from './Feedback.module.scss';
import { MdCancel, MdDelete } from 'react-icons/md';
import { addFeedback, getClass, getFeedback, getaccessUsers } from '../../../actions/feedbackSession';
import { getSession } from '../../../actions/session';
function formatDate(inputString) {
  // Create a new Date object from the input string
  const date = new Date(inputString);

  // Get day, month, and year from the date object
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}

function formatDateToAMPM(startDateISOString, endDateISOString) {
  const startDate = new Date(startDateISOString);
  const endDate = new Date(endDateISOString);

  const options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true // Use 12-hour format
  };

  // Format start date
  const formattedStartDate = startDate.toLocaleDateString('en-US', options);

  // Format end date
  const formattedEndDate = endDate.toLocaleDateString('en-US', options);

  return `${formattedStartDate} to ${formattedEndDate}` ;
}
const Feedback = () => {
  const [branch, setBranch] = useState([]);
  const [users,setUsers]=useState([]);
  const [userName,setUserName]=useState('');
  
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedbranch, setSelectedBranch] = useState({});
  
  const [selectedSession, setSelectedSession] = useState({});
  const [session, setSession] = useState([]);
  const [time, setTime] = useState('');

  const [startTime,setStartTime]=useState('');
  const [feedback,setFeedback]=useState([]);
  const [endTime,setEndTime]=useState('');
  const [create,setCreate]=useState(true);
  const [classname,setclassName]=useState('');
  const [manageState,setManageState]=useState(0);
  const [sessionString,setSessionString]=useState('');
  const handleCreate = async()=>{

    setCreate(true);
  }
 

  useEffect(()=>{

const getClassNames = async()=>{
  const res = await getClass();
  const res2 = await  getSession();
  const res3 = await getaccessUsers();
  const res4 = await getFeedback();
  setFeedback(res4.results)
if(res && res2 && res3){setUsers(res3.results);
 setSession(res2.results)
  setBranch(res.results)}
}
    getClassNames()
    
  },[])
  console.log(feedback)
function handleBranchClick(item){
  
  setSelectedBranch(item);
  const combinedString = `${item.course_code} ${item.year} Year ${item.department_name} ${item.section}`;
  setclassName(combinedString)
  setManageState(0)


}

  function handleSessionClick (item){
 
    const combinedString = `${formatDate(item.sessionStart)} - ${formatDate(item.sessionEnd)}`;
    setSelectedSession(item);
    setSessionString(combinedString)
    setManageState(0)

  }  

  
  function handleUserClick (item){
 
    setSelectedUser(item);
    setUserName(item.name)
    setManageState(0)

  }  
  async function handleSubmitClick (){

    let item={
      classtable_id : selectedbranch.id,
      session_id:selectedSession.id,
      faculty_id:selectedUser.id,
      startTime,
     endTime

    }
    const res = await addFeedback(item)
    console.log(res)
    // console.log(item)

  }





















  const filteredDataClass = branch?.filter((item) => {
    // Combine properties into a single string for comparison
    const combinedString = `${item.course_code} ${item.year} Year ${item.department_name} ${item.section}`;
  
  return (
      combinedString.toLowerCase().includes(classname.toLowerCase()) ||
      Object.values(item).some(
        (value) => String(value).toLowerCase().includes(classname.toLowerCase())
      )
    );
  });

  const filteredDataSession = session?.filter((item) => {
    const combinedString = `${formatDate(item.sessionStart)} - ${formatDate(item.sessionEnd)}`;
  
  return (
      combinedString.toLowerCase().includes(sessionString.toLowerCase()) ||
      Object.values(item).some(
        (value) => String(value).toLowerCase().includes(sessionString.toLowerCase())
      )
    );
  });

  const filteredDataUsers = users?.filter((item) => {
  
  return (
    
    item.name.toLowerCase().includes(userName.toLowerCase()) ||
      Object.values(item).some(
        (value) => String(value).toLowerCase().includes(userName.toLowerCase())
      )
    );
  });
  console.log(filteredDataUsers)
  return (
    <div className={styles.feed_main_container}>
    
    <div className={styles.container_header} onClick={()=>handleCreate()}>
      <div className={styles.feedbackContainer_Card_button}>
        Create Feedback
      </div>
     
      </div>
 <div className={styles.feedbackContainer_Card}>
{      feedback.map((item,index)=>(
 <div className={styles.card_Container}>

  <span  className={styles.indexCount}>{index+1}</span>
  <div className={styles.card_content}>
    <div className={styles.card_content_child}>
      <div>Class :{` ${item.course_code} ${item.year} Year ${item.department_name} ${item.section}`}</div>
      <div >Class Teacher : {item.name}</div>
      <div >Number of Students given Feedback: 50</div>
    </div>
    <div className={styles.card_content_child}>
      <div>Session {formatDate(item.sessionStart)} to {formatDate(item.sessionEnd)}</div>
      <div >FeedBack Time:{formatDateToAMPM(item.startTime,item.endTime)}</div>
      <div >FeedBack Code : {item.code}</div>
    </div>
    <div className={styles.card_content_child}>
     <div>subjectName :{Array(5).map((item,index)=>(<>        <span key={index} className={styles.subjectList}>{item}</span>
       {/* <span> {index===session.length-1?"":","}</span> */}
       </>
 ))}</div>
    </div>
  </div>
  <div className={styles.card_container_buttons}>
    
      <button>View Details</button>
      <button>View Analytics</button>
      <button>Edit</button>
     </div>
 </div>

      ))}

     
</div>
{
  create&&<div className={styles.create_feedback_container}>
    <div className={styles.cancel_container}><span onClick={()=>setCreate(false)}><MdCancel className={styles.delete} /></span></div>
    <div className={styles.feedbackform}>
      <div  className={styles.inputContainer}>
        <div className={styles.inputheading}>Class</div>
        <div className={styles.inputfeild}>
          <input 
          placeholder='Search class'
          value={classname}
          onChange={(e)=>setclassName(e.target.value)}
          onFocus={()=>setManageState(1)}
          

          />
          
       {manageState===1&&   <div className={styles.dropdownselector}>{filteredDataClass.map((item,index)=>
            <div onClick={()=>handleBranchClick(item)}>{item.course_code+" "+item.year+" Year"+" "+item.department_name+" "+item.section}</div>
          )}</div>}
        </div>
      </div>
      <div  className={styles.inputContainer}>
        <div className={styles.inputheading}> Class Teacher</div>
        <div className={styles.inputfeild}>
        <input 
          placeholder='Search class'
          value={userName}
          onFocus={()=>setManageState(2)}
          onChange={(e)=>setUserName(e.target.value)}
        

          />
           {manageState===2&&   <div className={styles.dropdownselector}>{filteredDataUsers.map((item,index)=>
            <div onClick={()=>handleUserClick(item)}>{item.name}</div>
          )}</div>}
        </div>
      </div>
      <div  className={styles.inputContainer}>
        <div className={styles.inputheading}>Session</div>
        <div  className={styles.inputfeild}>
        <input 
          placeholder='Search class'
          value={sessionString}
          onFocus={()=>setManageState(3)}
          
          onChange={(e)=>setSessionString(e.target.value)}

          />
           {manageState===3&&   <div className={styles.dropdownselector}>{filteredDataSession.map((item,index)=>
            <div onClick={()=>handleSessionClick(item)}>{formatDate(item.sessionStart)} - {formatDate(item.sessionEnd)}</div>
          )}</div>}
        </div>
      </div>
      <div  className={styles.inputContainer}>
        <div className={styles.inputheading}>Date Time From </div>
        <div  className={styles.inputfeild}>
        <input 
type="datetime-local"
value={startTime}
onChange={(e)=>setStartTime(e.target.value)}
/>
        </div>
      </div>
      <div  className={styles.inputContainer}>
        <div className={styles.inputheading}>Date Time to </div>
        <div  className={styles.inputfeild}>
        <input 
type="datetime-local"
value={endTime}
onChange={(e)=>setEndTime(e.target.value)}
/>
        </div>
      </div>
    </div>
    <div className={styles.submitButton}><button  onClick={()=>handleSubmitClick()}>Submit</button></div>

  </div>
}
    </div>
  )
}

export default Feedback


