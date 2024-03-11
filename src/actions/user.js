import * as api from "../api/index.js";


export const addMember = async (formData) => {

	

	const {data} = await api.addUser(formData);

return {id:data.id}
	
};

export const updateUserData = async (userData) => {
	try {
		const {data} = await api.updateUserById(userData);
		return "User data updated"
	} catch (error) {
		console.error("Error updating user data in Firestore:", error);
		
	}
};

export const getUsers = async () => {
	try {
		const {data} = await api.getAllUsers();
	
		return data.results;

	} catch (error) {
		console.error("Error fetching group data:", error);
		
	}
};

export const updateAccess = async (id) => {
	try {

		const {data} = await api.updateUserAccess(id);
		
		return data.val

	} catch (error) {
		console.error("Error updating user data in Firestore:", error);
		
	}
};

export const deleteUser = async (id) => {
	try {
const {data } = await api.deleteUserById(id);
		return data.val
	
	} catch (error) {
		console.error("Error deleting document:", error);

	}
};






export const dashBoard = async (req, res) => {
	try {
			const {data} = await api.fetchdashboard();
			
			
		
		return data.combinedResult;
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};








