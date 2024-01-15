import React, {useState} from "react";
import styles from "./GroupMembersList.module.scss";
import AccessTable from "./AccessTable";
import { BiSolidPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
const mem=[ {
    name: "vjain",
    email: "vjain@ietdavv.edu.in",
    role: "Admin",
    access: true,
  },
  {
    name: "john_doe",
    email: "john.doe@example.com",
    role: "Student",
    access: true,
  },
  {
    name: "mary_smith",
    email: "mary.smith@example.com",
    role: "Faculty",
    access: false,
  },
]
const NoticeSync = () => {

    const[ showForm, setShowForm]= useState(false) ;
    const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [allowed, setAllowed] = useState(false);
  const [role, setRole] = useState("Student");
    const [members, setMembers] = useState(mem);


    const handleCancel=()=>{
    
    setShowForm(!showForm);
    
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

  const handleEdit = (index) => {
    setEditIndex(index);
    setSelectedItem(members[index]);
  };

  const handleDelete = (index) => {
    const updatedMembers = [...members];
    updatedMembers.splice(index, 1);
    setMembers(updatedMembers);
  };

  const handleSaveEdit = (index, editedData) => {
   
  
    const updatedMembers = [...members];
    updatedMembers[index] = { ...editedData };
    setMembers(updatedMembers);
  };
  
  const checkAll=(editedData)=>{
   if (!editedData.name || !editedData.email || !editedData.role || editedData.access === undefined) {
    alert('Please fill in all required fields');
    return false; // Do not proceed with saving if validation fails
  }
  
  return true ;
  }
  
  
    const handleAddMember = async () => {
    // const newMember = {
    //   email,
    //   name,
    //   allowed,
    //   role,
    //   refreshToken: '',
    //   count: '',
    // };
    // const res = "ha" ;
    // // await addMember(newMember);

    // if (res) {
    //  setEmail("");
    //   setName("");
    //   setAllowed(false);
    //   setRole("Student");
    // }
    
    let newIte={
  name:name,
  email:email,
  role:role,
  access:allowed 
  } ;
    if(checkAll(newIte))
    {setMembers([...members,newIte])
    alert("Member Added")
    setShowForm(false) ;
    }

  };

  
  return (
  <>
  <AccessTable/>
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
                  value={item.role}
                  onChange={(e) =>
                    handleSaveEdit(index, { ...item, role: e.target.value })
                  }
                >
                  <option value="Student">STUDENT</option>
                  <option value="Faculty">FACULTY</option>
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
                  value={item.access.toString()}
                  onChange={(e) =>
                    handleSaveEdit(index, {
                      ...item,
                      access: e.target.value === 'true',
                    })
                  }
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              ) : (
                item.access ? 'Yes' : 'No'
              )}
            </span>
            <span className={styles.edit}>
              {editIndex === index ? (
                <button onClick={() =>{ 
                if(checkAll(item))
                {
                handleSaveEdit(index, item) ; 
                setEditIndex(null)
                setSelectedItem({});
                }
                else{
                handleSaveEdit(index,selectedItem) ;
                setSelectedItem({});
                setEditIndex(null)
                }
                }}
                style={{ padding:5}}
                >
                  
                  Save
                </button>
              ) : (
                <BiSolidPencil
                  className={styles.edit}
                  onClick={() => handleEdit(index)}
                />
              )}
              <MdDelete
                className={styles.delete}
                onClick={() => handleDelete(index)}
              />
            </span>
          </div>
        ))}
    </div>
          </div>
          
        </div>
      )}
      <div style={{ display: 'flex', alignItems:'center',justifyContent:'right', marginRight:40}}>
      <button className={styles.btn} onClick={handleSave}>Save</button>
      </div>
      
      
     {showForm  &&<div className={styles.form}>
         
         <h4>Enter Details of members to add</h4>
      <div className={styles.main}>
      <div className={styles.emailInput}>
            <span>Name</span>
            <input
              type="text"
              label="User Name"
               placeholder="User Name"
              variant="outlined"
              size="small"
              value={name}
              fullWidth
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
              variant="outlined"
              size="small"
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.roleInput}>
            <span>Role</span>
            <select
              label="Role"
              select
              fullWidth
              required
              variant="outlined"
              size="small"
              value={role}
              onChange={handleRoleChange}
              SelectProps={{
                native: true,
              }}
            >
              <option value="Student">STUDENT</option>
              <option value="Faculty">FACULTY</option>
              <option value="Admin">ADMIN</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className={styles.roleInput}>
            <span>Access</span>
            <select
              label="Access"
              select
              fullWidth
              required
              variant="outlined"
              size="small"
              value={allowed.toString()} // Convert boolean to string
              onChange={handleAllowedChange}
              SelectProps={{
                native: true,
              }}
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
          style={{background:"red"}}
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
