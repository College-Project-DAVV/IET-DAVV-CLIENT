import React, { useState } from 'react'
import styles from "./ldap.module.scss"
export default function AddUser() {
    const [data,setData] = useState({"title":"","first_name":"","last_name":"","email":"","password":"","username":"","group":""});
    const handlesubmit = (e) => {
        e.preventDefault();
    
        // Check if all required fields are filled before submitting
        if (data.title && data.first_name && data.last_name && data.email && data.password && data.username && data.group ) {
          console.log(data);
          // Your logic for form submission here
    
          // Reset form fields after submission
          setData({
            title: '',
            first_name: '',
            last_name: '',
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
            <form>
                <h2>ADD LDAP USER</h2>
                    <div className={styles.line}>
                        <select name="title" value={data.title} onChange={handleChange} required>
                                <option value="" disabled selected hidden>Title</option>
                                <option value="mr">Mr.</option>
                                <option value="ms">Ms.</option>
                                <option value="mrs">Mrs.</option>
                                <option value="dr">Dr.</option>
                        </select>
                        <input name='first_name' type='text' className={styles.input} onChange={handleChange} value={data.first_name} placeholder='First Name' required/>
                        <input name='last_name' type='text' className={styles.input} onChange={handleChange} value={data.last_name} placeholder='Last Name' required/>
                    </div>
                    <div className={styles.line}>
                        <input name='email' type='text' className={styles.input} onChange={handleChange} value={data.email} placeholder='Email' required/>
                    </div>
                    <div className={styles.line}>
                        <input name='username' type='text' className={styles.input} onChange={handleChange} value={data.username} placeholder='Username'required/>
                        <input name='password' type='password' className={styles.input} onChange={handleChange} value={data.password} placeholder='Password' required/>
                    </div>
                <div className={styles.line}>
                    <div className={styles.faculty}>
                        <label>Type of Faculty</label>
                        <div className={styles.radio}>
                            <input type="radio" id="guestfaculty" name="group" value="guestfaculty"
                                checked={data.group === "guestfaculty"} onChange={handleChange} required/>
                            <label htmlFor="guestfaculty">Guest Faculty</label>
                        </div>
                        <div className={styles.radio}>
                            <input type="radio" id="faculty" name="group" value="faculty"
                                checked={data.group === "faculty"} onChange={handleChange} required/>
                            <label htmlFor="faculty">Faculty</label>
                        </div> 
                    </div>   
                        <select name="designation" className={styles.select} value={data.designation} onChange={handleChange} required>
                            <option value="" disabled selected hidden>Designation</option>
                            <option value="lecturer">Lecturer</option>
                            <option value="Professor">Professor</option>
                            <option value="AssistantProfessor">Assistant Professor</option>
                            <option value="AssociateProfessor">Associate Professor</option>
                        </select>
                </div>
                <div className={styles.line}>
                <select name="branch" value={data.branch} onChange={handleChange} required>
                            <option value="" disabled selected hidden>Branch</option>
                            <option value="CS">Computer Science</option>
                            <option value="IT">Information Technology</option>
                            <option value="ETC">Electonics & telecommunication</option>
                            <option value="EI">Electical and Instrumentation</option>
                            <option value="CI">Civil</option>
                            <option value="Mech">Mechanical</option>
                            <option value="AS">Applied Science</option>
                        </select>
                        <input name='phoneno' type='text' className={styles.input} onChange={handleChange} value={data.phoneno} placeholder='Phone No.' required/>
                </div>

            <button onClick={handlesubmit}>ADD</button>
            </form>
        </div>
    )
}
