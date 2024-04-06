import * as api from "../api/index.js";


export const addMember = async (formData) => {

	

	const {data} = await api.addUserAdmin(formData);

return {id:data?.id}
	
};

export const updateUserData = async (userData) => {
	try {
		const {data} = await api.updateUserByIdAdmin(userData);
		return "User data updated"
	} catch (error) {
		console.error("Error updating user data in Firestore:", error);
		
	}
};

export const getUsers = async () => {
	try {
		const {data} = await api.getAllUsersAdmin();
	
		return data.results;

	} catch (error) {
		console.error("Error fetching group data:", error);
		
	}
};

export const updateAccess = async (id) => {
	try {

		const {data} = await api.updateUserAccessAdmin(id);
		
		return data.val

	} catch (error) {
		console.error("Error updating user data in Firestore:", error);
		
	}
};

export const deleteUser = async (id) => {
	try {
const {data } = await api.deleteUserByIdAdmin(id);
		return data.val
	
	} catch (error) {
		console.error("Error deleting document:", error);

	}
};














