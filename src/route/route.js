import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../container/Auth/login";
import { NavBar } from "../component/NavBar";
import Signup from "../container/Auth/signup";
import {Admin} from "../container/Admin";
import { Member } from "../container/Members";
import {Customer} from "../container/Customer"; 
import { Owner } from "../container/Owner";
import Properties from "../container/Properties";
import { PropertyDetailsPage } from "../container/propertyDetailsPage";
import { CustomerOffers } from "../container/Customer/CustomerOffer";
import { OwnerOffers } from "../container/Owner/Owneroffer";
import MyProperty from "../container/Owner/MyProperty";
import { useRoleContext } from "../context/roleContext";
export const Router = () => {
  const {state, dispatch} = useRoleContext();

  useEffect(() => {
    if(localStorage.getItem('token')){
      let data = JSON.parse(localStorage.getItem("data"));
      dispatch({type: 'update', payload: data});
    }
  }, []);
  return (
    <div>
    <div>
      <NavBar/>
    </div>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/" element={<Properties />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="properties/:id" element={<PropertyDetailsPage />} />
        <Route path="/admin" element={<Admin/>}>
            <Route path="members" element={<Member />} />
        </Route>

        <Route path="owner" element={<Owner />}>
            <Route path="offers" element={<OwnerOffers />} />
            { <Route path="properties/my-property" element={<MyProperty />} /> }
          </Route>
          <Route path="customer" element={<Customer />}>
            <Route path="offers" element={<CustomerOffers />} />
          </Route>
      </Routes>
    </div>
  )
}
