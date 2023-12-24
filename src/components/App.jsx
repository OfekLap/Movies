import React, { useState } from "react";
import NewHeader from "./newHeader";
import Register from "./register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MyReviews from "./MyReviews";
import Login from "./Login";
import { createContext } from "react";
import { Toaster } from "react-hot-toast";
import AllMovies from "./AllMovies";
import Slider from "./Slider";

export const UserContext = createContext();
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isRegister, setIsregister] = useState(false);

  return (
    <UserContext.Provider
      value={{
        userEmail,
        setUserEmail,
        isRegister,
        setIsregister,
        setSearchTerm,
      }}
    >
      <Router>
        <div>
          <Toaster />
          <NewHeader />

          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Slider>Movies of the week</Slider>} />
            <Route
              path="/myReviews"
              element={<MyReviews email={userEmail} />}
            />
            <Route
              path="/"
              element={
                <div className="bg-yellow-50 h-full">
                  {searchTerm === "" && (
                    <h1 className="h-full">
                      Search for your favorite movies!🍿🍿🍿
                    </h1>
                  )}
                </div>
              }
            />
            <Route
              path="/allMovies"
              element={<AllMovies searchTerm={searchTerm} />}
            />
          </Routes>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
