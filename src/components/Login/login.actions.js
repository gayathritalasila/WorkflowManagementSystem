import {
    getAuth,
    GoogleAuthProvider,
    signInWithPopup,
    User as FirebaseUser,
    FacebookAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "firebase/auth";
import { toast } from "react-toastify";
import FirebaseApp from "../../firebase";
import { login } from "./login.slice";

const auth = getAuth(FirebaseApp);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();


const handleEmailLogin = async (email, password, dispatch, navigate) => {
    try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;

        localStorage.setItem("user", JSON.stringify(user));

        dispatch(login({
            uid: user.uid,
            displayName: user.displayName || "New User",
            email: user.email,
        }));

        // Show success message
        toast.success("Logged into your account", {
            position: "top-center",
            autoClose: 1000,
        });

        setTimeout(() => {
            navigate("/listView");
        }, 2000);
        console.log("Email Login Success:", user);
    } catch (error) {
        console.error("Email Login Error:", error.message);
    }
};

const handleGoogleLogin = async (dispatch, navigate) => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log("Google Login Success:", result.user);
        const user = result.user;
      localStorage.setItem("user", JSON.stringify(user));
        dispatch(login({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
        }));

        // Show success message
        toast.success("Logged into your account", {
            position: "top-center",
            autoClose: 1000,
        });

        setTimeout(() => {
            navigate("/listView");
        }, 2000);
        console.log("Google Login Success:", user);
    } catch (error) {
        console.error("Google Login Error:", error);
    }
};

const handleFacebookLogin = async (dispatch, navigate) => {
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        const user = result.user;
      localStorage.setItem("user", JSON.stringify(user));
        dispatch(login({
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
        }));

        // Show success message
        toast.success("Logged into your account", {
            position: "top-center",
            autoClose: 1000,
        });

        setTimeout(() => {
            navigate("/listView");
        }, 2000);
        console.log("Facebook Login Success:", result.user);
    } catch (error) {
        console.error("Facebook Login Error:", error);
    }
};

const handleSignup = async (email, password, dispatch, navigate, setIsSignup) => {
    try {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;

        dispatch(login({
            uid: user.uid,
            displayName: user.displayName || "New User",
            email: user.email,
        }));

        // Show success message
        toast.success("Signup Successful! Redirecting to login...", {
            position: "top-center",
            autoClose: 3000,  // 3 seconds
        });

        setTimeout(() => {
            setIsSignup(false);
            navigate("/");
        }, 3000);

        console.log("Signup Success:", user);
    } catch (error) {
        console.error("Signup Error:", error.message);
        toast.error("Signup Failed: " + error.message);
    }
};

export { handleEmailLogin, handleGoogleLogin , handleFacebookLogin, handleSignup };