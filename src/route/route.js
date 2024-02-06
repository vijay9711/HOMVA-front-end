import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../container/Auth/login";
import { NavBar } from "../component/NavBar";
import Signup from "../container/Auth/signup";
export const Router = () => {
  return (
    <div>
    <div>
      <NavBar/>
    </div>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
      </Routes>
    </div>
  )
}
