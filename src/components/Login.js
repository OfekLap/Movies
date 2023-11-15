import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });
  
      if (response.status === 200) {
        setMessage("User login successfully!");
        props.handelRegister(email); // Update the user email state
        localStorage.setItem("userEmail", email);
        navigate("/");
      } else {
        setMessage("Failed to register user.");
      }
      
    } catch (error) {
      console.error("Submission error:", error);
      setMessage("Submission error. Please try again.");
    }
  };


  return (
    <div className="container mt-3 card">
      <h1>Login</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;