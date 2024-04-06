import React, { useEffect, useState } from "react";
import styles from "./Admin.module.scss";
import { BiSolidPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { addMember, deleteUser, getUsers } from "../../actions/AdminAccess";

const Admin = () => {

  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [members, setMembers] = useState([]);
  const user = JSON.parse(localStorage.getItem("profile"))?.result?.email


  const handleCancel = () => {

    setName("")
    setEmail("")
    setShowForm(false);

  }
  const [editIndex, setEditIndex] = useState(null);
  const [selectedItem, setSelectedItem] = useState({});

  const handleEdit = (index, id) => {

    setEditIndex(index);
    setSelectedItem(members[index]);
  };

  const handleDelete = async (index, email) => {
    const userConfirmed = window.confirm("Are you sure you want to delete this user?");
    if (userConfirmed) {
      try {
        const res = await deleteUser(email);
        const updatedMembers = [...members];
        updatedMembers.splice(index, 1);
        setMembers(updatedMembers);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }

    return;
  };

  const handleSaveEdit = (index, editedData) => {


    const updatedMembers = [...members];
    updatedMembers[index] = { ...editedData };
    setMembers(updatedMembers);
  };

  const checkAll = (editedData) => {
    if (!editedData.name || !editedData.email) {
      alert('Please fill in all required fields');
      return false; // Do not proceed with saving if validation fails
    }

    return true;
  }


  const handleAddMember = async () => {

    let newIte = {
      name: name,
      email: email,
    };

    if (checkAll(newIte)) {
      if (members && members.length > 0) {
        setMembers([...members, newIte]);
      }
      else {
        setMembers([newIte]);
      }
      const res = await addMember(newIte);

      alert(res.messege);
      setName("")
      setEmail("")
      setShowForm(false);
    }

  };

  useEffect(() => {
    const getAllUsers = async () => {
      const AdminUsers = await getUsers();
      const users = AdminUsers?.filter((item) => item.email !== user)
      setMembers(users)
    }
    getAllUsers();

  }, [])

  return (
    <div>
      <div className={styles.adminheader}>Admin portal Access</div>
      <div className={styles.addPerson}>

        <div className={styles.icon} onClick={() => setShowForm(!showForm)}>
          <IoMdPersonAdd />
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
                <span className={styles.phone}>Delete</span>
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


                      <span className={styles.edit}>


                        <MdDelete
                          className={styles.delete}
                          onClick={() => handleDelete(index, item.email)}
                        />
                      </span>
                    </div>
                  ))}
              </div>
            </div>

          </div>
        )}


        {showForm && <div className={styles.form}>

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
              style={{ background: "#ea4335" }}
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

export default Admin;
