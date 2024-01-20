import { fetchDataFromAPI } from "../components/GroupData/fetchgroupmembers";
import { db, db2 } from "../firebaseConfig.js";
import {
	getFirestore,
	addDoc,
	collection,
	getDocs,
	getDoc,
	query,
	doc,
	setDoc,
	where,
	deleteDoc,
    updateDoc,
} from "firebase/firestore";



export const adminGroupUpdateStudentPortal = async (data) => {
	
	console.log("inside adminGroupUpdateStudentPortal")
	try {

	  const groupsCollection = collection(db2, 'groups');
	  const groupDocs = await getDocs(groupsCollection);
  
	  for (const doc of groupDocs.docs) 
	  {
		await deleteDoc(doc.ref);
		
	  }
  
	  for (const x of data) {
		await createGroupStudentPortal(x);
	  }
    
	  return "updated";
	} catch (error) {
	  console.error(error);
	}
  };
   const createGroupStudentPortal = async (formData) => {
	try {
	    console.log("inside createGroupStudentPortal")
    
		const { groupDescription, groupEmail, groupMembersCount, groupName} = formData;
		
        const GrpMembers= await fetchDataFromAPI(groupEmail)  ;
		 let grpArr=[] ;
        for(const x of GrpMembers)
        {
            grpArr.push({emailId:x.email}) ;
        }
		const docRef = await addDoc(collection(db2, "groups"), {groupEmail, title: groupName, description: groupDescription, members: grpArr});
	    console.log("outside createGroupStudentPortal")
        
        
		return docRef;
	} catch (error) {
	  console.error(error)
	  
	}
};

export const adminGroupUpdate = async (data) => {
	    console.log("inside adminGroupUpdate")

	try {
		const groupsCollection = collection(db, "groups");
		const groupDocs = await getDocs(groupsCollection);
		for (const doc of groupDocs.docs) {
			
			await deleteDoc(doc.ref);
		}

		// Create new documents in the 'groups' collection
		for (const x of data) {
			await createGroup(x);
		}
		const studentPortalUpdate = await adminGroupUpdateStudentPortal(data);

		await saveGroupInformation();
	    console.log("outside adminGroupUpdate")

		return "updated";
	} catch (error) {
		console.error(error);
	}
};

export const createGroup = async (formData) => {
	    console.log("inside createGroup")
	
	try {
	
		const { groupDescription, groupEmail, groupMembersCount, groupName} = formData;


        const GrpMembers= await fetchDataFromAPI(groupEmail)  ;
        let grpArr=[] ;
        for(const x of GrpMembers)
        {
            grpArr.push({emailId:x.email}) ;
        }
        
        console.log("GrpEmail is:",groupEmail," groupMembers: ",grpArr.length)
		// Check if the group with the given groupEmail already exists
		const groupQuery = query(
			collection(db, "groups"),
			where("groupEmail", "==", groupEmail)
		);
		const groupSnapshot = await getDocs(groupQuery);

		if (groupSnapshot.size > 0) {
			// Group with the given groupEmail already exists, update its properties
			const existingGroupDoc = groupSnapshot.docs[0];
			await updateDoc(existingGroupDoc.ref, {
				title: groupName,
				description: groupDescription,
				members:grpArr ,
			});
	    console.log("outside createGroup")

			return existingGroupDoc.ref;
		} else {
			
	    console.log("else outside createGroup")
			
			const newGroupDocRef = await addDoc(collection(db, "groups"), {
				 groupEmail, title: groupName, description: groupDescription, members:  grpArr
			});

			return newGroupDocRef;
		}
	} catch (error) {
		console.error(error);
		throw error; // Re-throw the error for handling at the calling site if needed
	}
};

export const editGroup = async (formData, id) => {
	try {
		const groupRef = doc(db, "groups", id);

		await setDoc(groupRef, formData, { merge: true });

		return true;
	} catch (error) {
		console.error("Error updating template:", error);
		throw error;
	}
};
export const getGroup = async () => {
	    console.log("inside getGroup")

	try {
	
			const groupsCollection = collection(db, "groups");
			const groupsQuery = query(groupsCollection);

			const querySnapshot = await getDocs(groupsQuery);

			const documentRefs = querySnapshot.docs.map((doc) => doc.ref);

			const documents = await Promise.all(
				documentRefs.map((docRef) => getDoc(docRef))
			);

			const groupArr = documents.map((doc) => ({
				id: doc.id,
				data: doc.data(),
			}));
	    console.log("ouside getGroup")
			
			return groupArr;
		
	} catch (error) {
		console.log(error);
	}
};

export const getgroupById = async (id) => {
	try {
		const groupRef = doc(db, "groups", id);

		const docSnapshot = await getDoc(groupRef);
		if (docSnapshot.exists()) {
			const groupData = docSnapshot.data();
			return groupData;
		} else {
		
			return null;
		}
	} catch (error) {
		console.error("Error fetching document:", error);
		throw error;
	}
};

export const deleteGroup = async (id) => {
	    console.log("inside deleteGroup")

	try {
		const groupRef = doc(db, "groups", id);

		await deleteDoc(groupRef);
	    console.log("outside deleteGroup")
    
		return true;
	} catch (error) {
		console.error("Error deleting document:", error);
		throw error;
	}
};

export const saveGroupInformation = async () => {
	    console.log("inside saveGroupInformation")
	
	try {
		const groupArr = await getGroupRequireDetails();

		const groupInformationCollectionI = collection(db, "groupInformation");
		const querySnapshot = await getDocs(groupInformationCollectionI);

		// Step 2: Delete each document in the collection
		for (const doc of querySnapshot.docs) {
			try {
				await deleteDoc(doc.ref);
			} catch (deleteError) {
				console.error("Error deleting document:", deleteError);
			}
		}

		const groupInformationCollection = collection(db, "groupInformation");

		const jsonString = JSON.stringify(groupArr);

		const docRef = await addDoc(groupInformationCollection, {
			data: jsonString,
			timestamp: new Date(),
		});
		
	    console.log("ouside saveGroupInformation")
	} catch (error) {
		console.error("Error saving group information to Firestore:", error);
	}
};

export const readGroupInformation = async () => {
	    console.log("inside readGroupInformation")
	try {
		const groupInformationCollection = collection(db, "groupInformation");

		const querySnapshot = await getDocs(groupInformationCollection);

		if (!querySnapshot.empty) {
			const doc = querySnapshot.docs[0];
			const jsonData = JSON.parse(doc.data().data);
	    console.log("ouside readGroupInformation")
			
			return jsonData;
		} else {
		
	    console.log("else ouside readGroupInformation")
			// console.log("No documents found in the groupInformation collection.");
		}
	} catch (error) {
		console.error("Error reading group information from Firestore:", error);
	}
};

export const getGroupRequireDetails = async () => {
        console.log("inside getGroupRequireDetails")
	try {
		const groupsCollection = collection(db, "groups");
		const groupsQuery = query(groupsCollection);
        
		const querySnapshot = await getDocs(groupsQuery);

		const documentRefs = querySnapshot.docs.map((doc) => doc.ref);

		const documents = await Promise.all(
			documentRefs.map((docRef) => getDoc(docRef))
		);

		const groupArr = documents.map((doc) => {
			const groupData = doc.data();

			const customizedGroup = {
				id: doc.id,
				title: groupData.title,
				groupEmail: groupData.groupEmail,
				description: groupData.description,
			};
             console.log("outside getGroupRequireDetails")
			return customizedGroup;
		});
        console.log("outside getGroupRequireDetails")
		return groupArr;
	} catch (error) {
		console.log(error);
	}
};