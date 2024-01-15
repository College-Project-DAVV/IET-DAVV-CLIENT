import {db}  from "../firebaseConfig.js";
import {
	getFirestore,
	addDoc,
	getDocs,
	getDoc,
	doc,
	setDoc,
	deleteDoc,
	collection,
	query,
	where,
	updateDoc,
} from "firebase/firestore";

export const addMember = async (formData) => {
	const usersCollection = collection(db, "users");
	const emailQuery = query(
		usersCollection,
		where("email", "==", formData.email)
	);
	const emailQuerySnapshot = await getDocs(emailQuery);

	if (emailQuerySnapshot.size > 0) {
		return "User with the same email already exists";
	}

	// If no user with the same email exists, add the new user
	const docRef = await addDoc(usersCollection, formData);
	return "User added successfully";
};

export const updateUserData = async (userData) => {
	try {
		const userRef = doc(db, "users", userData.id);

		const updatedUserData = {
			name: userData.name,
			email: userData.email,
			role: userData.role.toLowerCase(),
			allowed: userData.allowed
		};

		await updateDoc(userRef, updatedUserData);

		return "User data updated in Firestore"
	} catch (error) {
		console.error("Error updating user data in Firestore:", error);
		throw error;
	}
};

export const getUsers = async () => {
	try {
		const usersCollection = collection(db, "users");
		const usersQuery = query(usersCollection);

		const userArr = [];

		const querySnapshot = await getDocs(usersQuery);

		querySnapshot.forEach((doc) => {
			const userId = doc.id;
			const userData = doc.data();

			userArr.push({
				id: userId,
				email: userData.email,
				name: userData.name,
				role: userData.role,
				allowed: userData.allowed,
				count: userData.count,
			});
		});
		return userArr;
	} catch (error) {
		// Handle errors if needed
		console.error("Error fetching group data:", error);
		throw error;
	}
};

export const updateAccess = async (id) => {
	try {
		const userRef = doc(db, "users", id); // 'users' is the Firestore collection name
		
		const docSnapshot = await getDoc(userRef);
		if (docSnapshot.exists()) {
			const userData = docSnapshot.data();

			userData.allowed = !userData.allowed;

			await updateDoc(userRef, userData);

			return true;
		} else {
			// console.log("Document does not exist.");
			return null;
		}
	} catch (error) {
		console.error("Error updating user data in Firestore:", error);
		throw error;
	}
};

export const deleteUser = async (id) => {
	try {
		const userRef = doc(db, "users", id);

		await deleteDoc(userRef);

		return true;
	} catch (error) {
		console.error("Error deleting document:", error);
		throw error;
	}
};