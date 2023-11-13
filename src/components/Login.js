import React, { useState } from "react";

const Login = () => {return (
    <div className="container mt-5">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: "200px" }}>
        {/* ... (your form content remains the same) ... */}
        <button 
          style={{ 
            color: "white", 
            backgroundColor: "blue", 
            // Other styles 
          }} 
          type="submit"
        >
          Submit
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default Login;