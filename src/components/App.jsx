import React, { useState, useEffect } from "react";
import NewHeader from "./newHeader";
import SearchField from "./searchField"; // Note: I've updated the component name to follow the common convention of starting with an uppercase letter.
import Post from "./Post";
import Register from "./register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Review from "./Review";
import MyReviews from "./MyReviews";
import Login from "./Login";

function App() {
  console.log("App component is rendering.");

  const [userEmail, setUserEmail] = useState("");
  const [isRegister, setIsregister] = useState(false);
  const [data, setData] = useState(false);
  const [src, setSrc] = useState("");
  const [moviePlot, setMoviePlot] = useState("");
  const [movieTitle, setMovieTitle] = useState("");

  function handleSearchData(data) {
    // Process the data received from SearchAppBar
    console.log("Data received in app.jsx:", data);
    if (data && data.Poster) {
      setData(true);
      // Ensure data has a Poster property
      console.log("there is a poster!");
      setSrc(data.Poster);
      setMoviePlot(data.Plot);
      setMovieTitle(data.Title);
      console.log(data.Plot);
    }
  }

  const [displayRegister, setDisplayRegister] = useState(false);

  function submitNote() {
    if (displayRegister === false) setDisplayRegister(true);
    else {
      setDisplayRegister(false);
    }
  }

  function handelRegister(data) {
    setIsregister(true);
    setUserEmail(data);
    localStorage.setItem("userEmail", data);
  }

  useEffect(() => {
    // Check if the user is already authenticated (information in localStorage)
    const storedUserEmail = localStorage.getItem("userEmail");
    if (storedUserEmail && !userEmail) {
      setIsregister(true);
      setUserEmail(storedUserEmail);
    }
  }, [userEmail]);

  function logout() {
    setIsregister(false);
    setUserEmail("");
  }

  return (
    <Router>
      <div>
        <NewHeader
          submitNote={submitNote}
          register={isRegister}
          logout={logout}
        />
        <SearchField onSearchData={handleSearchData} />
        <Routes>
          <Route
            path="/movie"
            element={
              data && (
                <div>
                  <Post poster={src} plot={moviePlot} title={movieTitle} />
                  <Review
                    title={movieTitle}
                    register={isRegister}
                    email={userEmail}
                  />
                </div>
              )
            }
          />

          <Route
            path="/register"
            element={<Register handelRegister={handelRegister} />}
          />
          <Route
            path="/login"
            element={<Login handelRegister={handelRegister} />}
          />
          <Route path="/myReviews" element={<MyReviews email={userEmail} />} />
          <Route
            path="/"
            element={
              <div>
                {!data && <h1>Search for your favorite movies!🍿🍿🍿</h1>}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;