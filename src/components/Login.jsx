import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./App";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setUserEmail, setIsregister } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });

      if (response.status === 200) {
        setMessage("User login successfully!");
        setUserEmail(email);
        setIsregister(true);
        toast.success("Login successfully");
        navigate("/");
      } else {
        setMessage("Failed to login user.");
      }
    } catch (error) {
      toast.error("Failed to login user.");
      console.error("Submission error:", error);
      setMessage("Submission error. Please try again.");
    }
  };

  return (
    <div className="container card bg-stone-200 mt-14">
      <h1 className="font-semibold text-lg underline">Login</h1>
      <form onSubmit={handleSubmit} className="font-semibold ">
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

export default Login;
