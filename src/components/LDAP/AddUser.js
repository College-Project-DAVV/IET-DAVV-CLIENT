import React, { useState } from 'react'
import styles from "./ldap.module.scss"
import eyeopen from '../../assets/eyeopen.svg'
import eyeclose from '../../assets/eyeclose.svg'
import {adduser} from "./adduserapi"
import ProgressBar from '../progressbar/ProgressBar'
export default function AddUser() {
    const [showpassword, setshowpassword]=useState(false);
    const [data,setData] = useState({"title":"","first_name":"","last_name":"","email":"","username":"","password":"","group":"","designation":"","branch":"","phoneno":""});
    const [adding,setAdding] =useState(false);
    function Toggle() {
        var temp = document.getElementById("typepass");
        if (temp.type === "password") {
            temp.type = "text";
            setshowpassword(true);
        }
        else {
            temp.type = "password";
            setshowpassword(false);
        }
        }
    const handlesubmit = (e) => {
        e.preventDefault();
    
        // Check if all required fields are filled before submitting
        if (data.title && data.first_name && data.last_name && data.email && data.password && data.username && data.group && data.designation && data.branch && data.phoneno) {
          // Your logic for form submission here
          setAdding(true);
            adduser(data).then((result)=>{
                if(result){
                alert(result);
                }
                setData({
                    title: '',
                    first_name: '',
                    last_name: '',
                    email: '',
                    password: '',
                    username: '',
                    group: '',
                    designation: '',
                    branch: '',
                    phoneno: '',
                  });
                  setAdding(false);
            })
          // Reset form fields after submission
          
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
                        <option value="Mr.">Mr.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Dr.">Dr.</option>
                    </select>
                    <input name='first_name' type='text' className={styles.input} onChange={handleChange} value={data.first_name} placeholder='First Name' required/>
                    <input name='last_name' type='text' className={styles.input} onChange={handleChange} value={data.last_name} placeholder='Last Name' required/>
                </div>
                <div className={styles.line}>
                    <input name='email' type='text' className={styles.input} onChange={handleChange} value={data.email} placeholder='Email' required/>
                </div>
                <div className={styles.line}>
                    <input name='username' type='text' className={styles.input} onChange={handleChange} value={data.username} placeholder='Username'required/>
                    <div className={styles.pass}>
                        <input type='password' name='password'className={styles.input1} placeholder='Password'
                                id="typepass" onChange={handleChange} value={data.password} required/>
                        <img src={showpassword?eyeopen:eyeclose} alt='eyeopen' className={styles.eyeopen} onClick={Toggle}/>
                     </div>                    
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
                        <option value="Lecturer">Lecturer</option>
                        <option value="Professor">Professor</option>
                        <option value="Assistant Professor">Assistant Professor</option>
                        <option value="Associate Professor">Associate Professor</option>
                    </select>
                </div>
                <div className={styles.line}>
                    <select name="branch" value={data.branch} onChange={handleChange} required>
                        <option value="" disabled selected hidden>Branch</option>
                        <option value="Computer Engineering">Computer Engineering</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Electonics & telecommunication">Electonics & telecommunication</option>
                        <option value="Electical and Instrumentation">Electical and Instrumentation</option>
                        <option value="Civil Engineering">Civil Engineering</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Applied Science">Applied Science</option>
                    </select>
                    <input name='phoneno' type='text' className={styles.input} onChange={handleChange} value={data.phoneno} placeholder='Phone No.' required/>
                </div>
                {!adding ?<button onClick={handlesubmit}>ADD</button> : <ProgressBar/>}
            </form>
        </div>
    )
}
