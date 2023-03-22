import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react"
import axios from "axios"
import HomePage from "./pages/HomePage/HomePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import {Words} from "./pages/Words/Words";
import Navbar from "./components/Navbar/Navbar";
import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";

const API_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:5005"

function App() {


    // const [data, setData] = useState([])

    // const refresh = () => {
    //     axios
    //         .get(`${API_URL}/pages/Words/Words`)
    //         .then((response) => setData(response.data), console.log(data))
    // }
    // useEffect(() => {
    //     refresh()
    // }, [])
    // console.log(data)



  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/word" element={<Words  />} />

        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
