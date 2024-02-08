import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useRoleContext } from "../context/roleContext";
import { faShower, faBed, faXmark, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css'
import { PropertyDetailsPage } from "../container/propertyDetailsPage";
import EditProperty from "../container/Owner/EditProperty";
export const Property = ({ data, isDelete, deleteProperty }) => {
  const { state, dispatch } = useRoleContext();

  const [imageSrc, setImageSrc] = useState(null);
  const [isEditProperty, setIsEditProperty] = useState(false);
  const [editData, setEditData] = useState('');

  useEffect(() => {
    fetch(data.photos[0]?.link)
      .then((response) => response.blob())

      .then((blob) => {
        setImageSrc(URL.createObjectURL(blob));
      })

      .catch((error) => console.error(error));
  }, []);


  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  }
  const toggleEdit = () => {
    setIsOpen((prevState) => !prevState);
    setIsEditProperty((prevState) => !prevState);
  }
  const deleteProp = (data) =>{
    deleteProperty(data);
    setIsOpen((prevState) => !prevState);
  }
  const editProp = () => {
    console.log("reder")
    setIsOpen((prevState) => !prevState);

  }
  const getAddress = () => {
    let address = `${data.address?.street}, ${data.address?.city}, ${data.address?.state} 
    ${data.address?.zipcode}`
    if (address.length > 40) {
      address = address.substring(0, 45);
      address = address + "...";
    }
    return address;
  }
  return (
    <div className="max-w-sm  rounded overflow-hidden shadow-md hover:shadow-lg duration-150">
      <div
        onClick={toggleDrawer}
        className="z-10"
      >
        <div className="w-full relative h-40 group duration-200">
          <img src={imageSrc} alt="" className="h-full w-full" />
          {
            isDelete ?
              <>
                <div className="invisible group-hover:visible flex flex-row duration-200 absolute top-1 right-1">
                  <button onClick={()=>{deleteProp(data)}} className="bg-red-300 z-20 cursor-pointer px-2  p-1 items-center text-center flex border border-red-400 rounded-lg">
                    <FontAwesomeIcon icon={faXmark} className="text-red-700" />
                  </button>
                  <button onClick={()=>{toggleEdit()}} className="bg-blue-300 ml-2 cursor-pointer px-2 p-1 items-center text-center flex  border border-blue-400 rounded-lg">
                    <FontAwesomeIcon icon={faPen} className="text-blue-700" />
                  </button>
                </div>
              </> : null
          }

        </div>
        <div className="p-3 flex flex-col">
          <div className="flex justify-between">
            <div>
              <span className={`${data.listingType == "SALE" ? "bg-red-100 text-red-800 " : "bg-blue-100 text-blue-800"} text-xs font-medium me-2 px-2.5 py-0.5 rounded`}>FOR {data.listingType}</span>
            </div>
            <div className="flex justify-between">
              <p>
                <FontAwesomeIcon icon={faBed} />
                <strong className="ml-1">{data.bedrooms}</strong>
              </p>

              <p className="ml-2">
                <FontAwesomeIcon icon={faShower} /><strong className="ml-1">{data.bathrooms}</strong>
              </p>
            </div>
          </div>


          <div className="flex justify-between items-center mb-0 mt-2">
            <p className="w-full text-md">
              {getAddress()}
            </p>
            <h1 className="rounded-xl font-medium border text-slate-900 hover:bg-slate-900 hover:text-white px-2 py-0.5 duration-300">
              ${data.price?.toLocaleString()}
            </h1>
          </div>
        </div>
      </div>
      {/* { */}
      {/* isOpen && */}
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction='right'
        className='absolute transition-all duration-900 right-36 group-hover:right-0  overflow-y-auto'
        size={700}
      >
        <PropertyDetailsPage propId={data.id} />
      </Drawer>
      <Drawer
        open={isEditProperty}
        onClose={toggleEdit}
        direction='right'
        className='absolute transition-all duration-900 right-36 group-hover:right-0  overflow-y-auto'
        size={700}
      >
        <EditProperty id={data.id}/>
      </Drawer>
      {/* } */}

    </div>
  );
}
