import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getFirestore,
    collection,
    getDocs,
} from "firebase/firestore";
import FirebaseApp from "../../firebase";

const postsDb = getFirestore(FirebaseApp);

const fetchWorkflows = createAsyncThunk("workflows/fetchWorkflows", async()=>{
    const workflowsRef = collection(postsDb, "workflows");
    const querySnapshot = await getDocs(workflowsRef);
    return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return{
            id: doc.id,
            ...data,
            lastEditedAt: data.lastEditedAt ? data.lastEditedAt.toMillis() : null,
        };
    });
});

export { fetchWorkflows };