
import * as api from "../api/index.js";

export const addfeedbackAccess= async (data)=>{
console.log(data)
}



export const getDepartment = async ()=>{
    try {
        const {data} = await api.getdepartment();
        return data
    } catch (error) {
        
    }
}
export const getFaculty = async ()=>{
    try {
        const {data} = await api.getFacultyName();
        return data
    } catch (error) {
        
    }
}
export const addNewMember= async (formdata)=>{
    try {
        const {data} = await api.addAccessMember(formdata);
        return data
    } catch (error) {
        
    }
}

export const getaccessUsers = async()=>{
    try {
        const {data} =  await  api.getAccessUsers();
        
        return data;
    } catch (error) {
        
    }
}




export const getClass = async ()=>{
    try {
        const {data} = await api.getBranchClass();
        return data
    } catch (error) {
        
    }
}


export const addFeedback = async (formdata)=>{
    try {
        const {data} = await api.createFeedback(formdata);
        return data
    } catch (error) {
        
    }
}


export const getFeedback = async ()=>{
    try {
        const {data} = await api.getAllFeedback();
        return data
    } catch (error) {
        
    }
}