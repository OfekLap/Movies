import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "./App";
import SearchField from "./searchField";

const headingStyle = {
  fontSize: "4em",
};

const buttonStyle = {
  margin: "10px",
};

function NewHeader() {
  const navigate = useNavigate();
  const { setUserEmail, setIsregister, isRegister } = useContext(UserContext);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const updateHeaderHeight = () => {
      const headerElement = document.getElementById("headerContainer");
      const headerOffset = headerElement.offsetTop;
      const windowHeight = window.innerHeight;
      const newHeight = Math.min(
        Math.max(windowHeight - headerOffset, 100),
        300
      );
      setHeaderHeight(newHeight);
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);

    return () => {
      window.removeEventListener("resize", updateHeaderHeight);
    };
  }, []);

  const headerStyle = {
    backgroundImage:
      'url("https://images.unsplash.com/photo-1553095066-5014bc7b7f2d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "white",
    textAlign: "center",
    textShadow: "2px 2px 4px #000",

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  function logout() {
    axios
      .post("http://localhost:4000/logout")
      .then((response) => {
        console.log(response.data);
        setIsregister(false);
        setUserEmail("");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  }

  return (
    <div
      id="headerContainer"
      className="h-75 flex flex-row space-x-52 mt-4 rounded-lg"
      style={headerStyle}
    >
      <div>
        <h1
          style={{ cursor: "pointer", headingStyle }}
          onClick={() => {
            navigate("/");
          }}
        >
          OOMDB
        </h1>
        <p style={{ fontSize: "1.5em" }}>SEE THE LATEST REVIEWS!</p>

        {!isRegister ? (
          <div>
            <Link className="btn btn-primary" style={buttonStyle} to="register">
              REGISTER
            </Link>
            <Link className="btn btn-primary" style={buttonStyle} to="login">
              LOGIN
            </Link>
          </div>
        ) : (
          <div>
            <button
              className="btn btn-primary"
              style={buttonStyle}
              onClick={() => navigate("/myReviews")}
            >
              MY REVIEWS
            </button>
            <Link to="/" className="btn btn-success" style={buttonStyle}>
              HOME
            </Link>
            <Link
              to="/"
              onClick={logout}
              className="btn btn-dark"
              style={buttonStyle}
            >
              LOGOUT
            </Link>
          </div>
        )}
      </div>
      <SearchField />
    </div>
  );
}

export default NewHeader;
