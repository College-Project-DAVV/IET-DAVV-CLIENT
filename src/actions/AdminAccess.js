import * as api from "../api/index.js";


export const addMember = async (formData) => {



	const { data } = await api.addUserAdmin(formData);

	return data;

};

export const getUsers = async () => {
	try {
		const { data } = await api.getAllUsersAdmin();

		return data.users;

	} catch (error) {
		console.error("Error fetching group data:", error);

	}
};

export const getCurrentUser = async (email) => {
	try {
		const { data } = await api.getUserAdmin({"email":email});
		return data;

	} catch (error) {
		console.error("Error fetching data:", error);

	}
};

export const deleteUser = async (email) => {
	try {
		const { data } = await api.deleteUserByIdAdmin({"email":email});
		return data;

	} catch (error) {
		console.error("Error deleting document:", error);

	}
};














