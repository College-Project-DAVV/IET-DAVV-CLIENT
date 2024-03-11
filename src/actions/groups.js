import * as api from "../api/index.js";


import {
} from "./credentitals.js";




export const getGroup = async () => {
	try {
	
			const {data } = await  api.getGroupsForAdmin();
			return data.results;
	
	
	} catch (error) {
		console.log(error);
	}
};




export const readGroupInformation = async () => {
	try {



		const {data} = await api.getGroupsFromServer();
		return data.results;
	
	} catch (error) {
		console.error("Error reading group information from Firestore:", error);
	}
};





 export const syncGroups = async()=>{

	try {
		const user = localStorage.getItem('Profile')
	const email = user?.result?.email
			const {data }=  await api.syncDatabaseGroups(email)
			console.log(data);
			return data
	} catch (error) {
		
	}

}