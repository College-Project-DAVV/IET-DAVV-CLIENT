import React, {useEffect, useState} from "react";
import styles from "./Access.module.scss";
import { BiSolidPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { addMember, deleteUser, getUsers, updateUserData } from "../../../actions/user";
import { FaLock } from "react-icons/fa";
import { addNewMember, getDepartment, getFaculty, getaccessUsers, updateAccesUserData } from "../../../actions/feedbackSession";

const Access = () => {

    const[ showForm, setShowForm]= useState(false) ;
    const [email, setEmail] = useState('');
  const [name, setName] = useState("");
  const [departmentname, setDepartmentname] = useState('');
  const [role, setRole] = useState('Class-Cordinator');
  const [nameFeild,setnameFeild]=useState(false);
    const [members, setMembers] = useState([]);

    const [department,setDepartment] = useState([]);
    
    const [faculty,setfaculty] = useState([]);
    const user= JSON.parse(localStorage.getItem("profile"))?.result?.email
    

    const handleCancel=()=>{
    
     setName("")
    setEmail("")
    setRole("Class-Cordinator")
    setShowForm(false) ;
    setEditIndex(null);
    
    }

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };


  const handleFacultyClick=(item)=>{
    setnameFeild(false)
    setSelectedItem(item)
    setName(item.title+" "+item.first_name+" "+item.last_name)
    setEmail(item.email);
    
  }
  
  
  
  

  const [editIndex, setEditIndex] = useState(null);
  const [selectedItem,setSelectedItem]= useState({}) ;

  const handleEdit = (index) => {
  
    setEditIndex(index);
    setSelectedItem(members[index]);
    const item=members[index]
    setRole(item.designation)
    setName(item.name)
    setEmail(item.email);
    setDepartmentname(item.department)
   handleAddnewMember()
  };



const handleAddnewMember=async()=>{
  const res = await getDepartment();
  const res2 = await getFaculty();
  if(res?.results && res2?.results)
  {
    setDepartment(res.results);
    setfaculty(res2.results)
    
    setShowForm(!showForm)
  }
}


  const handleSaveEdit = (index, editedData) => {
   
  
    const updatedMembers = [...members];
    updatedMembers[index] = { ...editedData };
    setMembers(updatedMembers);
  };
  
  const checkAll=()=>{
   if (!selectedItem.id || !email || !department|| !role) {
    alert('Please fill in all required fields');
    return false; // Do not proceed with saving if validation fails
  }
  
  return true ;
  }
  
  const handleUpdate = async ()=>{

    
    let newIte={
      id:selectedItem.id,
      name:selectedItem.name,
      designation:role,
  email:email,
      department:departmentname,

  };
  const res = await updateAccesUserData(newIte);
  if(res.message)
  {
  
    setName("")
    setEmail("");
    alert(res.message);
    
  const updatedMembers = [...members];
  updatedMembers[editIndex] = { ...newIte };
  setMembers(updatedMembers);
  setShowForm(false);
  setRole("Class-Cordinator");
  }
  else{

  }


  }
  
    const handleAddMember = async () => {
      

    let newIte={
      facultyId:selectedItem.id,
      name:name,
      designation:role,
  email:email,
      department:departmentname,

  };

if(true)
    {
    // setMembers([...members,newIte])
    
    const res = await addNewMember(newIte) ;
    
   if(res?.id){
    newIte['id']=res.id;
   
   console.log(newIte)
   setMembers([...members,newIte])
    
    setName("")
    setEmail("")

    
    alert(res.message)
    
    setShowForm(false) ;
    setRole("Class-Cordinator")
  }else{
 
    alert(res.error)}
    }

  };
  const filteredFaculty = faculty.filter((item) =>
  (item.title + " " + item.first_name + " " + item.last_name).toLowerCase().includes(name.toLowerCase())
);

  useEffect(()=>{
  
  const getAllUsers= async()=>{
  
  const res= await getaccessUsers() ;
   
    setMembers(res.results)
  
  } 
  getAllUsers() ;
  
  },[])
  return (
  <div className={styles.accessContainer}>
  <div className={styles.addPerson}>
  
  <div className={styles.icon} onClick={()=>handleAddnewMember()}>
  <IoMdPersonAdd/>
  </div>
  <div>Add a member</div>
  </div>
    <div className={styles.groupMemberList}>
      {members && (
        <div className={styles.details}>
          <div className={styles.list}>
            <div className={styles.head}>
              
            <span className={styles.indexClass}>S.no</span>
              <span className={styles.name}>Name</span>
              <span className={styles.email}>Email id</span>
              <span className={styles.phone}>Designation</span>
              <span className={styles.phone}>Department</span>
              <span className={styles.phone}>Edit</span>
            </div>
         <div className={styles.table}>
      {members &&
        members.map((item, index) => (
          <div className={styles.row} key={index}>
              <span className={styles.indexClass}>
      
        {index+1} 
    
     </span>
            <span className={styles.name}>
        
               { item.name} 
           
            </span>
            <span className={styles.email}>
         
               { item.email}
        
            </span>
            <span className={styles.phone}>
         
               { item.designation }
            
            </span>
            <span className={styles.phone}>
      
               { item.department}
           
            </span>
            <span className={styles.edit}>
             
              
           
                <BiSolidPencil
                  className={styles.edit}
                  onClick={() => handleEdit(index)}
                />
              
           
            </span>
          </div>
        ))}
    </div>
          </div>
          
        </div>
      )}
      
      
     {showForm  &&<div className={styles.form}>
         
         <h4>Enter Details to add Class-Cordinator</h4>
      <div className={styles.main}>
      <div className={styles.emailInput}>
            <span >Name</span>
            <div className={styles.nameContainer}>
            <input
              type="text"
              label="User Name"
               placeholder="User Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              onFocus={()=>setnameFeild(true)}
              
              disabled={editIndex!=null?true:false}
            />
        
 {  (editIndex==null && nameFeild)
  && <div className={styles.facultynameList}>
    {filteredFaculty.map((item) => (
        <div key={item.id}  onClick={()=>{
        handleFacultyClick(item)
      }}>{item.title} {item.first_name} {item.last_name}</div>
    ))}
</div>}</div>
          </div>

         
          <div className={styles.emailInput2}>
            <span>Email</span>
            <input
            required
            placeholder="user@ietdavv.edu.in"
              type="email"
              value={email}
              label="User Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.roleInput}>
            <span>Role</span>
            <select
              label="Role"
              required
              value={role}
              onChange={(e)=>handleRoleChange(e)}
            
            >
              <option value="Class-Cordinator">Class-Cordinator</option>
              <option value="HOD">HOD</option>
              <option value="Director">Director</option>
            </select>
          </div>

          <div className={styles.roleInput}>
            <span>Department</span>
            <select
              label="Access"
              required
              size="small"
              value={departmentname}
              onChange={(e)=>setDepartmentname(e.target.value)}
            
            >
              
              <option value={"Not Needed"}>Not Needed</option>

              {department.map((item,index)=><option key={item.department_name} value={item.department_name}>{item.department_name}</option>)}
            </select>
          </div>
          
      </div>
      <div>
      <button
          className={styles.btn}
          onClick={(e)=>{editIndex!=null?handleUpdate():handleAddMember()}}
        >
          {editIndex!=null?"Update":"Add"}
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

export default Access;
