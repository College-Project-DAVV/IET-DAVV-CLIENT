import React, {useEffect, useState} from "react";
import styles from "./Access.module.scss";
import { BiSolidPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { addMember, deleteUser, getUsers, updateUserData } from "../../../actions/user";
import { FaLock } from "react-icons/fa";
import { addNewMember, getDepartment, getFaculty, getaccessUsers } from "../../../actions/feedbackSession";

const Access = () => {

    const[ showForm, setShowForm]= useState(false) ;
    const [email, setEmail] = useState('');
  const [name, setName] = useState("");
  const [departmentname, setDepartmentname] = useState('');
  const [role, setRole] = useState('Faculty');
  const [allowed,setAllowed]=useState(false);
    const [members, setMembers] = useState([]);

    const [department,setDepartment] = useState([]);
    
    const [faculty,setfaculty] = useState([]);
    const user= JSON.parse(localStorage.getItem("profile"))?.result?.email
    

    const handleCancel=()=>{
    
     setName("")
    setEmail("")
    setAllowed(false)
    setRole("")
    setShowForm(false) ;
    
    }

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };


  const handleFacultyClick=(item)=>{
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
    console.log(item)
    setName(item.name)
    setEmail(item.email);
    setDepartmentname(item.department)
   handleAddnewMember()
  };

const handleDelete = async (index, id) => {

  const userConfirmed = window.confirm("Are you sure you want to delete this user?");

  if (userConfirmed) {
    try {
      const res = await deleteUser(id);
      const updatedMembers = [...members];
      updatedMembers.splice(index, 1);
      setMembers(updatedMembers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
  
  return ;
};


const handleAddnewMember=async()=>{
  const res = await getDepartment();
  const res2 = await getFaculty();
  console.log(res2)
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

  }
  
    const handleAddMember = async () => {

    let newIte={
      facultyId:selectedItem.id,
      name:name,
      designation:role,
  email:email,
      department:departmentname,

  } ;
  console.log(newIte)

    if(true)
    {
    // setMembers([...members,newIte])
    
    const res = await addNewMember(newIte) ;
    console.log(res)
   if(res?.id){
    newIte['id']=res.id;
   
   console.log(newIte)
   setMembers([...members,newIte])
    
    setName("")
    setEmail("")
    setAllowed(false)
    
    alert(res.message)
    
    setShowForm(false) ;
    setRole("")}else{
 
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
  console.log(editIndex)
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
              <span className={styles.name}>Name</span>
              <span className={styles.email}>Email id</span>
              <span className={styles.phone}>Designation</span>
              <span className={styles.phone}>Department</span>
              <span className={styles.phone}>Edit & Delete</span>
            </div>
         <div className={styles.table}>
      {members &&
        members.map((item, index) => (
          <div className={styles.row} key={index}>
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
              
              <MdDelete
                className={styles.delete}
                onClick={() => handleDelete(index,item.id)}
              />
            </span>
          </div>
        ))}
    </div>
          </div>
          
        </div>
      )}
      
      
     {showForm  &&<div className={styles.form}>
         
         <h4>Enter Details of member to add</h4>
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
            />
        
        <div className={styles.facultynameList}>
    {filteredFaculty.map((item) => (
        <div key={item.id}  onClick={()=>{
        handleFacultyClick(item)
      }}>{item.title} {item.first_name} {item.last_name}</div>
    ))}
</div></div>
          </div>

         
          <div className={styles.emailInput}>
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
              onChange={handleRoleChange}
            
            >
              <option value="faculty">Faculty</option>
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
          onClick={editIndex>=0?handleUpdate:handleAddMember}
        >
          {editIndex>=0?"Update Member":"Add Member"}
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
