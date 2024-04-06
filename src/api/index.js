import axios from 'axios';

const API = axios.create({baseURL:'https://notices.ietdavv.edu.in/server/'});




export const getallEmail=()=>API.get('/send/getEmails');

export const getMailByUser=(formData)=>API.post('/send/getmail',formData);

export const sendMail=(maildata)=>API.post('/send/addmail',maildata);

export const getUserMailByID=(id)=>API.get(`/send/getmail/${id}`);
export const syncDatabaseGroups=(email)=>API.get(`/groups/fetch/${email}`);
















// All Functions Related to Groups
export const getGroupsFromServer=()=>API.get('/groups/fetchgroup');
export const getGroupsForAdmin=()=>API.get('/groups/fetchadmin');






export const addUser = (formData) => API.post('/users/add',formData);
export const getAllUsers=()=>API.get('/users/getall');

export const fetchdashboard=()=>API.get('/users/dashboard');
export const updateUserAccess=(id)=>API.get(`/users/updateaccess/${id}`);

export const deleteUserById=(id)=>API.get(`/users/deleteuser/${id}`);

export const updateUserById=(userData)=>API.post(`/users/updateuseradmin`,userData);








// All functions related to session
export const addSession=(data)=>API.post('/feedback/session/addsession',data);

export const updateSessionById=(data)=>API.post('/feedback/session/updatesession',data);
export const getAllSession=()=>API.get('/feedback/session/getsession');

export const getAnalytics=(id)=>API.get(`/feedback/session/getAnalytics/${id}`);






export const getdepartment=()=>API.get('/feedback/access/getdepartment');

export const getFacultyName= ()=>API.get('/feedback/access/getfacultyname');

export const getAccessUsers= ()=>API.get('/feedback/access/getaccessusers');
export const updatedataUserAccess=(formdata)=>API.post('/feedback/access/updateUserData',formdata)

export const getBranchClass=()=>API.get('/feedback/feedback/getclass');

export const getAllFeedback=()=>API.get('/feedback/feedback/getfeedback');
export const addAccessMember=(data)=>API.post('/feedback/access/addmember',data);

export const createFeedback=(data)=>API.post('/feedback/feedback/addfeedback',data);


export const updatedataFeedback=(data)=>API.post('/feedback/feedback/updatefeedback',data);
export const sendReminder=(email)=>API.get(`/feedback/feedback/rem/${email}`);