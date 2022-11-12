import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
// import {Browser}

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(()=> {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if(userAuth) {
        //logged in

        dispatch(login({
          uid : userAuth.uid,
          email: userAuth.email,
        }))
        // console.log(userAuth);
      }else{
        //logged out
        dispatch(logout())
      }
    });
    return unsubscribe; // when this cleans up it return fresh unsubscribe fucntion
  },[dispatch])

  return (
    <div className="app">
      <Router>
        {!user ? (<LoginScreen/>) : (<Routes>
          <Route path = '/profile' element = {<ProfileScreen/>}/>
          <Route exact path="/" element={<HomeScreen />} />
        </Routes>)}
        
      </Router>
    </div>
  );
}

export default App;
