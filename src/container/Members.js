import React, { useEffect, useState } from "react";
import AdminService from "../service/adminService";
import Dropdown from "../widget/Dropdown";
import { UserCard } from "../component/UserCard";
const adminService = new AdminService();
export const Member = () => {
  const [members, setMembers] = useState([]);
  const memberType = ["Owner", "Customer"];
  const [params, setParams] = useState({memberType:"Customer"});
  useEffect(() => {
    getAllCustomers();
  }, [])
  const getAllCustomers = () => {
    adminService.getCustomers().then(res => {
      console.log(res);
      setMembers(res.data);
    }).catch(e => {
      console.log(e);
    })
  }
  const getAllOwners = () => {
    adminService.getOwners().then(res => {
      console.log(res);
      setMembers(res.data);
    }).catch(e => {
      console.log(e);
    })
  }

  const onClicked = (query) => {
    console.log(query)
    if(query?.memberType == "Customer"){
      getAllCustomers();
    }else{
      getAllOwners();
    }
    setParams((prev) => ({...prev, ...query}));
  };
  const ownerAction = (id,type) => {
    console.log("decline", type);
    if(type == "Approve"){
      adminService.activateOwner(id).then(res=>{
        console.log(res);
        alert('user approved');
      }).catch(e=>{
        console.log(e);
      })
    }else{
      adminService.deactivateOwner(id).then(res=>{
        console.log(res);
        alert('user declined');
      }).catch(e=>{
        console.log(e);
      })
    }
  }
  return (
    <div className="m-5">
      <Dropdown
        query={params}
        value="memberType"
        title="Member Type"
        items={memberType}
        onClicked={onClicked}
        className="mr-1"
      />
      <div className="grid grid-cols-5 gap-5 mt-5">
      {
        members.map(res=>{
          return (
            <>
              <UserCard data={res} type={params.memberType} ownerAction={(id, type)=>ownerAction(id, type)}/>
            </>
          )
        })
      }
      </div>
    </div>
  )
}