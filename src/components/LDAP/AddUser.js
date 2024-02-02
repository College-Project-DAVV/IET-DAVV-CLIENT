import React, { useState } from 'react'
import styles from "./ldap.module.scss"
export default function AddUser() {
    const [data,setData] = useState({"name":"","email":"","password":"","username":"","group":"","enumber":""});
    const handlesubmit = (e) => {
        e.preventDefault();
    
        // Check if all required fields are filled before submitting
        if (data.name && data.email && data.password && data.username && data.group && data.enumber) {
          console.log(data);
          // Your logic for form submission here
    
          // Reset form fields after submission
          setData({
            name: '',
            email: '',
            password: '',
            username: '',
            group: '',
            enumber: '',
          });
        } else {
          alert('Please fill in all required fields');
        }
      };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
    return (
        <div className={styles.adduser}>
            <div className={styles.head}>
                <p>ADD LDAP USER</p>
            </div>
            <form>
                <div className={styles.inputbox}>
                    <p className={styles.title}>Name</p>
                    <div>
                        <input name='name' type='text' onChange={handleChange} value={data.name} placeholder='Enter Name' required/>
                    </div>
                </div>

                <div className={styles.inputbox}>
                    <p className={styles.title}>Email</p>
                    <div>
                        <input name='email' type='text' onChange={handleChange} value={data.email} placeholder='Enter Email' required/>
                    </div>
                </div>

                <div className={styles.inputbox}>
                    <p className={styles.title}>Username</p>
                    <div>
                        <input name='username' type='text' onChange={handleChange} value={data.username} placeholder='Enter Username'required/>
                    </div>
                </div>

                <div className={styles.inputbox}>
                    <p className={styles.title}>Password</p>
                    <div>
                        <input name='password' type='password' onChange={handleChange} value={data.password} placeholder='Enter Password' required/>
                    </div>
                </div>

                <div className={styles.inputbox}>
                    <p className={styles.title}>Employee</p>
                    <div>
                        <input name='enumber' type='password' onChange={handleChange} value={data.enumber} placeholder='Enter Employee Number' required/>
                    </div>
                </div>
                <div className={styles.inputbox}>
                    <p className={styles.title}>Group</p>
                    <div>
                        <select name="group" className={styles.title} value={data.group} onChange={handleChange} required>
                            <option value="guestfaculty">Guest Faculty</option>
                            <option value="faculty">Faculty</option>
                        </select>
                    </div>
                </div>

            <button onClick={handlesubmit}>ADD</button>
            </form>
        </div>
    )
}
