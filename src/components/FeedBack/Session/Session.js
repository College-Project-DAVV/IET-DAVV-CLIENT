import React, {useEffect, useState} from "react";
import styles from "./Session.module.scss";
import { BiSolidPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { addMember, deleteUser, getUsers, updateUserData } from "../../../actions/user";
import { FaLock } from "react-icons/fa";
import { addNewSession, getSession, updateSession } from "../../../actions/session";

function formatDate(inputString) {
  // Create a new Date object from the input string
  const date = new Date(inputString);

  // Get day, month, and year from the date object
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  // Format the date in the desired way
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
}

function formatDateinput(inputString) {
  const date = new Date(inputString);
  const year = date.getFullYear();
  // Month and day need to be formatted to have leading zeros if necessary
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
const Session = () => {

    const[ showForm, setShowForm]= useState(false) ;
    const [sessionStart , setSessionStart] = useState("");
    
    const [sessionEnd , setSessionEnd] = useState("");

    const [members, setMembers] = useState([]);
    

    const handleCancel=()=>{
    setSessionStart('');
    setSessionEnd('')
  
    setShowForm(false) ;
    
    }


 

  
  
  

  const [editIndex, setEditIndex] = useState(null);
  const [selectedItem,setSelectedItem]= useState({}) ;

  const handleEdit = (index,item) => {
  
    setEditIndex(index);
    setSelectedItem(members[index]);
    setSessionStart(formatDateinput(item.sessionStart));
    setSessionEnd(formatDateinput(item.sessionEnd))
  };


  const handleSaveEdit = async(index, id) => {
   let newIte={
    id:id,
    sessionStart:sessionStart,
    sessionEnd:sessionEnd
   } ;
   const res = await updateSession(newIte);
   
   setEditIndex(null)
                setSelectedItem({});
   const datatoupdate = members;
   datatoupdate[index]=newIte;
   setMembers(datatoupdate)
   
   setSessionStart('');
   setSessionEnd('')


   

  

  };
  
  const checkAll=()=>{
   if (!sessionStart || !sessionEnd ) {
    alert('Please fill in all required fields');
    return false; // Do not proceed with saving if validation fails
  }
  
  return true ;
  }
  
  
    const handleAddMember = async () => {

    let newIte={
   sessionStart:sessionStart,
   sessionEnd:sessionEnd
  } ;
  
  if(checkAll(newIte))
    {
    const res = await addNewSession(newIte);
    

    alert(res?.message)
    if(res)
    {
      newIte['id']=res.id;
      setMembers([newIte,...members])
    }
  setSessionEnd('');
  setSessionStart('');
    setShowForm(false) ;}
    

  };

  useEffect(()=>{
  
  const getSessions= async()=>{
  
  const res= await getSession() ;
    if(res?.results)
    {
setMembers(res.results);
    }
  } 
  getSessions() ;
  
  },[])
  return (
  <div className={styles.accessContainer}>
  <div className={styles.addPerson}>
  
  <div className={styles.icon} onClick={()=>setShowForm(!showForm) && setSessionStart('') && setSessionEnd('')}>
  <IoMdPersonAdd/>
  </div>
  <div onClick={()=>setShowForm(!showForm)} style={{cursor:'pointer'}}>Add New Sesson</div>
  </div>
    <div className={styles.groupMemberList}>
      {members && (
        <div className={styles.details}>
          <div className={styles.list}>
            <div className={styles.head}>
              <span className={styles.name}>Sq. NO</span>
              <span className={styles.email}>Session Starting Date</span>
              <span className={styles.email}>Session Ending Date</span>
              <span className={styles.edit}>Edit</span>
            </div>
         <div className={styles.table}>
      {members &&
        members.map((item, index) => (
          <div className={styles.row} key={index}>
            <span className={styles.name}>
            {index+1}
            </span>
            <span className={styles.email}>
              {editIndex === index ? (
                <input
                  type="date"
                  value={sessionStart}
                  required
                  onChange={(e) =>
                setSessionStart(e.target.value)
                  }
                />
              ) : (
                formatDate(item.sessionStart) || 'Not Available'
              )}
            </span>
            <span className={styles.email}>
              {editIndex === index ? (
                <input
                type="date"
                required
                  value={sessionEnd}
                  onChange={(e) =>
                setSessionEnd(e.target.value)
                  }
               />
             
              ) : (
                formatDate(item.sessionEnd) || 'Not Available'
              )}
            </span>
    
            <span className={styles.edit}>
              {editIndex === index ? (
              <>
                <button onClick={async() =>{ 
                if(checkAll())
                {
                handleSaveEdit(index, item.id) ;
                // const res= await updateUserData(item)
                
                }
               
                
                }}
                style={{ padding:5, background:'#6C74CA', border:0, color:"#fff", borderRadius:5,cursor:'pointer'}}
                >
                  Save
                </button>
                <MdCancel style={{ padding:5,}} className={styles.delete} onClick={()=>setEditIndex(null)} />
                </>
              ) : (
                <BiSolidPencil
                  className={styles.edit}
                  onClick={() => handleEdit(index,item)}
                />
              )}
             
            </span>
          </div>
        ))}
    </div>
          </div>
          
        </div>
      )}
      
      
     {showForm  &&<div className={styles.form}>
         
         <h4>Enter Details of New Session</h4>
      <div className={styles.main}>
      <div className={styles.emailInput}>
            <span>Session Starting Date</span>
            <input
              type="date"
              label="Session Starting Date"
              value={sessionStart}
              required
              onChange={(e) => setSessionStart(e.target.value)}
            />
          </div>
          <div className={styles.emailInput}>
            <span>Session Ending Date</span>
            <input
            required
              type="date"
              value={sessionEnd}
              label="Session Endind Date"
              onChange={(e) => setSessionEnd(e.target.value)}
            />
          </div>


          
      </div>
      <div>
      <button
          className={styles.btn}
          onClick={handleAddMember}
        >
          Add Session
        </button>
           <button
          className={styles.btn}
          onClick={handleCancel}
          style={{background:"#ea4335"}}
        >
          Cancel
        </button>
        </div>
    </div>
    }
    </div>
    </div>
  );
};

export default Session;
