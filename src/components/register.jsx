import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./App";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setUserEmail, setIsregister } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/submit", {
        email,
        password,
      });

      if (response.status === 200) {
        setMessage("User registered successfully!");
        navigate("/");
        setUserEmail(email);
        setIsregister(true);
        toast.success("Registered successfully");
      } else {
        setMessage("Failed to register user.");
      }
    } catch (error) {
      toast.error("Failed to register user.");
      console.error("Submission error:", error);
      setMessage("Submission error. Please try again.");
    }
  };

  return (
    <div className="container mt-14 card bg-stone-200">
      <h1 className="font-semibold text-lg underline">Register</h1>
      <form className="font-semibold " onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            className="flex flex-grow"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            className="flex flex-grow"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="mt-3 font-bold text-lg" type="submit">
          Submit
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Register;
