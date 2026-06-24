import "../styles/auth.css";
import googleIcon from "../images/google.svg";
import githubIcon from "../images/github.svg";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {jwtDecode} from "jwt-decode";
import { loginUser } from "../services/userService";
import { Navigate, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })

  const {login, logout} = useContext(AuthContext);
  const navigate = useNavigate();


  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleLoginRequest = async (e) => {
    e.preventDefault();
    if(!userData.email || !userData.password){
      alert("Please fill in all fields");
      return;
    }else{
      const response = await loginUser(userData);
      console.log("user login done before : ",response);
      if(response && response.token){
        const token = response.token;
        const decodedData = jwtDecode(token);
        console.log("decoded data : ",decodedData);
        login(decodedData.userId, token);
        navigate("/dashboard");
        alert("Login successful!");
      }
      // const responseData = jwtDecode(response.token);
      // console.log("user login done data : ",responseData);
      
    }
  }
  // if(login){
  //   return <Navigate to={"/dashboard"}/>;
  // }

  return (
    <div className="auth-container">

      <div className="auth-card">
        <h2>Welcome back</h2>
        <p>Login to continue tracking your shared expenses</p>

        <form className="auth-form" onSubmit={handleLoginRequest}>
          <input type="email" placeholder="Email" name="email" value={userData.email} onChange={handleInputChange}/>
          <input type="password" placeholder="Password" name="password" value={userData.password} onChange={handleInputChange}/>

          <button type="submit" className="btn primary full">
            Login
          </button>
        </form>

        <div className="auth-divider">
          <span>or continue with</span>
        </div>

        <div className="oauth-options">
          <button type="button" className="btn oauth-btn">
            <img className="oauth-icon" src={googleIcon} alt="" />
            Google
          </button>
          <button type="button" className="btn oauth-btn">
            <img className="oauth-icon" src={githubIcon} alt="" />
            GitHub
          </button>
        </div>

        <div className="auth-footer">
          Don't have an account? <span>Sign Up</span>
        </div>
      </div>

    </div>
  );
}
