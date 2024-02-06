import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../container/Auth/login";
import { NavBar } from "../component/NavBar";
import Signup from "../container/Auth/signup";
import {Admin} from "../container/Admin";
import { Customer } from "../container/Customer";
import { Owner } from "../container/Owner";
import Properties from "../container/Properties";
import { PropertyDetailsPage } from "../container/propertyDetailsPage";
import { CustomerOffers } from "../container/Customer/CustomerOffer";
import MyProperty from "../container/Owner/MyProperty";
export const Router = () => {
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
            <Route path="customers" element={<Customer />} />
            <Route path="owners" element={<Owner />} />
        </Route>

        <Route path="owner" element={<Owner />}>
            {/* <Route path="offers" element={<OwnerOffers />} /> */}
            {/* <Route path="properties" element={<OwnerProperties />} /> */}
            {/* <Route path="properties/:id" element={<OwnerPropertyDetails />} /> */}
            {/* <Route path="properties/add" element={<AddProperty />} /> */}
            { <Route path="properties/my-property" element={<MyProperty />} /> }
          </Route>
          <Route path="customer" element={<Customer />}>
            <Route path="offers" element={<CustomerOffers />} />
            {/* <Route path="properties" element={<OwnerProperties />} /> */}
            {/* <Route path="properties/:id" element={<OwnerPropertyDetails />} /> */}
            {/* <Route path="properties/add" element={<AddProperty />} /> */}
          </Route>
      </Routes>
    </div>
  )
}
