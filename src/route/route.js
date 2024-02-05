import React from "react";
import {Routes, Route} from "react-router-dom";
import Login from "../container/Auth/login";

export const Router = () => {
  return(
    <Routes>
      <Route path="/login" element={<Login/>}></Route>
    </Routes>
  )
}
