import { doc, setDoc, getDoc } from "firebase/firestore";
import FirebaseApp from "../../firebase";

const postsDb = getFirestore(FirebaseApp);

const saveWorkflow = async (userId, nodes, edges) => {
    if (!userId) return alert("User not authenticated");

    try {
        const workflowData = { nodes, edges };
        await setDoc(doc(postsDb, "workflowNodes", userId), workflowData);
        alert("Workflow saved successfully!");
    } catch (error) {
        console.error("Error saving workflow:", error);
    }
};

const loadWorkflow = async (userId, updateHistory) => {
    if (!userId) return;

    try {
        const docSnap = await getDoc(doc(postsDb, "workflowNodes", userId));
        if (docSnap.exists()) {
            const { nodes, edges } = docSnap.data();
            updateHistory(nodes, edges); // Update state with saved data
        } else {
            console.log("No saved workflow found");
        }
    } catch (error) {
        console.error("Error loading workflow:", error);
    }
};

export { saveWorkflow, loadWorkflow};