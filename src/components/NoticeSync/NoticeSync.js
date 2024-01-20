import React, {useEffect, useState} from "react";
import styles from "./NoticeSync.module.scss";
import AccessTable from "./AccessTable";
import { BiSolidPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { addMember, deleteUser, getUsers, updateUserData } from "../../actions/user";
import { FaLock } from "react-icons/fa";

const NoticeSync = () => {

    const[ showForm, setShowForm]= useState(false) ;
    const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [allowed, setAllowed] = useState(false);
  const [role, setRole] = useState("Student");
    const [members, setMembers] = useState([]);
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

  const handleAllowedChange = (e) => {
    // Convert the string value to a boolean
    setAllowed(e.target.value === "true");
  };
  
  const handleSave=()=>{
  
  console.log(members)
  }
  
  
  
  

  const [editIndex, setEditIndex] = useState(null);
  const [selectedItem,setSelectedItem]= useState({}) ;

  const handleEdit = (index,id) => {
  
    setEditIndex(index);
    setSelectedItem(members[index]);
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

  const handleSaveEdit = (index, editedData) => {
   
  
    const updatedMembers = [...members];
    updatedMembers[index] = { ...editedData };
    setMembers(updatedMembers);
  };
  
  const checkAll=(editedData)=>{
   if (!editedData.name || !editedData.email || !editedData.role || editedData.allowed === undefined) {
    alert('Please fill in all required fields');
    return false; // Do not proceed with saving if validation fails
  }
  
  return true ;
  }
  
  
    const handleAddMember = async () => {

    let newIte={
    count:0,
  name:name,
  email:email,
  role:role?role:"Student",
  allowed:allowed 
  } ;
  
    if(checkAll(newIte))
    {
    setMembers([...members,newIte])
    
    const res= await addMember(newIte) ;
    
   
    alert("Member Added")
    setName("")
    setEmail("")
    setAllowed(false)
    setRole("")
    setShowForm(false) ;
    }

  };

  useEffect(()=>{
  
  const getAllUsers= async()=>{
  
  const noticeSyncUsers= await getUsers() ;
    
    const users=noticeSyncUsers?.filter((item)=>item.email!==user)
    setMembers(users)
  
  } 
  getAllUsers() ;
  
  },[])
  
  return (
  <>
  <AccessTable numberOfUsers={ members?members.length:0}/>
  <div className={styles.addPerson}>
  
  <div className={styles.icon} onClick={()=>setShowForm(!showForm)}>
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
              <span className={styles.phone}>Role</span>
              <span className={styles.phone}>Access</span>
              <span className={styles.phone}>Edit & Delete</span>
            </div>
         <div className={styles.table}>
      {members &&
        members.map((item, index) => (
          <div className={styles.row} key={index}>
            <span className={styles.name}>
              {editIndex === index ? (
                <input
                  type="text"
                  required
                  value={item.name}
                  onChange={(e) =>
                    handleSaveEdit(index, { ...item, name: e.target.value })
                  }
                />
              ) : (
                item.name || 'Not Available'
              )}
            </span>
            <span className={styles.email}>
              {editIndex === index ? (
                <input
                  type="text"
                  value={item.email}
                  required
                  onChange={(e) =>
                    handleSaveEdit(index, { ...item, email: e.target.value })
                  }
                />
              ) : (
                item.email || 'Not Available'
              )}
            </span>
            <span className={styles.phone}>
              {editIndex === index ? (
                <select
                required
                  value={(item && item.role)?item.role:"Student"}
                  onChange={(e) =>
                    handleSaveEdit(index, { ...item, role: e.target.value })
                  }
                >
                  <option value="Student">STUDENT</option>
                  <option value="faculty">FACULTY</option>
                  <option value="Admin">ADMIN</option>
                  <option value="Others">Others</option>
                </select>
              ) : (
                item.role || 'Not Available'
              )}
            </span>
            <span className={styles.phone}>
              {editIndex === index ? (
                <select
                 required
                  value={item.allowed}
                  onChange={(e) =>
                    handleSaveEdit(index, {
                      ...item,
                      allowed: e.target.value === 'true',
                    })
                  }
                >
                  <option value="true">true</option>
                  <option value="false">false</option>
                </select>
              ) : (
                item.allowed ? 'true' : 'false'
              )}
            </span>
            <span className={styles.edit}>
              {editIndex === index ? (
              <>
                <button onClick={async() =>{ 
                if(checkAll(item))
                {
                handleSaveEdit(index, item) ;
                const res= await updateUserData(item)
                setEditIndex(null)
                setSelectedItem({});
                }
                else{
                handleSaveEdit(index,selectedItem) ;
                setSelectedItem({});
                setEditIndex(null)
                }
                }}
                style={{ padding:5, background:'#6C74CA', border:0, color:"#fff", borderRadius:5}}
                >
                  Save
                </button>
                <MdCancel style={{ padding:5,}} className={styles.delete} onClick={()=>setEditIndex(null)} />
                </>
              ) : (
                <BiSolidPencil
                  className={styles.edit}
                  onClick={() => handleEdit(index)}
                />
              )}
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
         
         <h4>Enter Details of members to add</h4>
      <div className={styles.main}>
      <div className={styles.emailInput}>
            <span>Name</span>
            <input
              type="text"
              label="User Name"
               placeholder="User Name"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
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
              <option value="Student">STUDENT</option>
              <option value="faculty">FACULTY</option>
              <option value="Admin">ADMIN</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className={styles.roleInput}>
            <span>Access</span>
            <select
              label="Access"
              required
              size="small"
              value={allowed}
              onChange={handleAllowedChange}
            
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          
      </div>
      <div>
      <button
          className={styles.btn}
          onClick={handleAddMember}
        >
          Add Member
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
    </>
  );
};

export default NoticeSync;
