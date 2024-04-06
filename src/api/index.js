import axios from 'axios';

const APINotice = axios.create({baseURL:'https://notices.ietdavv.edu.in/server/'});

const APIStudent = axios.create({baseURL:'http://localhost:5000/'});

const APIAdmin = axios.create({baseURL:'http://localhost:5000/'});





// NoticeSync Access User
export const addUser = (formData) => APINotice.post('/users/add',formData);
export const getAllUsers=()=>APINotice.get('/users/getall');

export const fetchdashboard=()=>APINotice.get('/users/dashboard');
export const updateUserAccess=(id)=>APINotice.get(`/users/updateaccess/${id}`);

export const deleteUserById=(id)=>APINotice.get(`/users/deleteuser/${id}`);

export const updateUserById=(userData)=>APINotice.post(`/users/updateuseradmin`,userData);












// Admin Portal Server


export const addUserAdmin = (formData) => APIStudent.post('/users/add',formData);
export const getAllUsersAdmin=()=>APIStudent.get('/users/getall');

export const updateUserAccessAdmin=(id)=>APIStudent.get(`/users/updateaccess/${id}`);

export const deleteUserByIdAdmin=(id)=>APIStudent.get(`/users/deleteuser/${id}`);

export const updateUserByIdAdmin=(userData)=>APIStudent.post(`/users/updateuseradmin`,userData);














// All functions related to session
export const addSession=(data)=>APIStudent.post('/feedback/session/addsession',data);

export const updateSessionById=(data)=>APIStudent.post('/feedback/session/updatesession',data);
export const getAllSession=()=>APIStudent.get('/feedback/session/getsession');

export const getAnalytics=(id)=>APIStudent.get(`/feedback/session/getAnalytics/${id}`);






export const getdepartment=()=>APIStudent.get('/feedback/access/getdepartment');

export const getFacultyName= ()=>APIStudent.get('/feedback/access/getfacultyname');

export const getAccessUsers= ()=>APIStudent.get('/feedback/access/getaccessusers');
export const updatedataUserAccess=(formdata)=>APIStudent.post('/feedback/access/updateUserData',formdata)

export const getBranchClass=()=>APIStudent.get('/feedback/feedback/getclass');

export const getAllFeedback=()=>APIStudent.get('/feedback/feedback/getfeedback');
export const addAccessMember=(data)=>APIStudent.post('/feedback/access/addmember',data);

export const createFeedback=(data)=>APIStudent.post('/feedback/feedback/addfeedback',data);


export const updatedataFeedback=(data)=>APIStudent.post('/feedback/feedback/updatefeedback',data);
export const sendReminder=(email)=>APIStudent.get(`/feedback/feedback/rem/${email}`);