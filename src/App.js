import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
// import {Browser}

function App() {
  const user = null;
  return (
    <div className="app">
      {/* <Router>
        {!user ? (<LoginScreen/>) : (<Routes>
          <Route exact path="/" element={<HomeScreen />} />
        </Routes>)}
        
      </Router> */}
      <Router>
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
          <Route  path="/login" element={<LoginScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
