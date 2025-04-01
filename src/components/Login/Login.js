import React, { useEffect, useState } from "react";
import LoginlogoIcon from "../../../icons/LoginlogoIcon";
import GooglelogoIcon from "../../../icons/GooglelogoIcon";
import FacebooklogoIcon from "../../../icons/FacebooklogoIcon";
import ApplelogoIcon from "../../../icons/ApplelogoIcon";
import { handleEmailLogin, handleFacebookLogin, handleGoogleLogin, handleSignup } from "./login.actions";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.login.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (isSignup) {
            try {
                await handleSignup(email, password, dispatch, navigate, setIsSignup);
                setEmail("");
                setPassword("");
            } catch (error) {
                console.error("Signup Error:", error);
            }
        } else {
            await handleEmailLogin(email, password, dispatch, navigate);
            if (rememberMe) {
                localStorage.setItem("rememberedUser", JSON.stringify({ email, password }));
            } else {
                localStorage.removeItem("rememberedUser");
            }
        }
    };

    useEffect(()=>{
        const storedUser = JSON.parse(localStorage.getItem("rememberedUser"));
        if (storedUser) {
            setEmail(storedUser.email);
            setPassword(storedUser.password);
            setRememberMe(true);
        }
    }, []);

    return (
        <div className="container">
            <ToastContainer />
            {/* Left Side */}
            <div className="left-section">
                <div className="logo-container">
                    <div className="logo-row">
                        <LoginlogoIcon className="logo-icon" />
                        <h1 className="logo-text">HighBridge</h1>
                    </div>
                </div>

                <h2 className="tagline">Building the Future...</h2>
                <p className="tagline">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </div>

            {/* Right Side - Login Form */}
            <div className="right-section">
                <div className="login-card">
                <h2 className="welcome-text">WELCOME {isSignup ? "TO HIGHBRIDGE!" : "BACK!"}</h2>
                <h2 className="login-header">{isSignup ? "Create an Account" : "Log In to your Account"}</h2>

                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" placeholder="Type here..." value={email} onChange={(e)=>setEmail(e.target.value)} required />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" placeholder="Type here..." value={password} onChange={(e)=>setPassword(e.target.value)} required />
                    </div>

                    {!isSignup && (
                    <div className="options">
                        <div className="remember-me">
                            <input type="checkbox" id="remember" checked={rememberMe} onChange={()=>setRememberMe(!rememberMe)} />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <a href="#" className="forgot-password">Forgot Password?</a>
                    </div>
                    )}

                    <button className="login-button" onClick={handleLogin}>{isSignup ? "Sign Up" : "Log In"}</button>

                    <div className="divider">Or</div>

                    <button className="social-button" onClick={()=>handleGoogleLogin(dispatch, navigate)}>
                        <GooglelogoIcon />
                        {isSignup ? "Sign up with Google" : "Log in with Google"}
                    </button>
                    <button className="social-button" onClick={()=>handleFacebookLogin(dispatch, navigate)}>
                        <FacebooklogoIcon />
                        {isSignup ? "Sign up with Facebook" : "Log in with Facebook"}
                    </button>
                    <button className="social-button">
                        {/* <img src="/apple-icon.png" alt="Apple" />  */}
                        <ApplelogoIcon />
                        {isSignup ? "Sign up with Apple" : "Log in with Apple"}
                    </button>

                    <p className="signup-text">
                        {isSignup ? "Already have an account?" : "New User?"} 
                        <a href="#" className="signup-link" onClick={() => setIsSignup(!isSignup)}>
                            {isSignup ? " LOG IN HERE" : " SIGN UP HERE"}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
