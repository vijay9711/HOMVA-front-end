import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useRoleContext } from "../context/roleContext";
import { faShower, faBed } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css'
import { PropertyDetailsPage } from "../container/propertyDetailsPage";
export const Property = ({ data }) => {
  const { state, dispatch } = useRoleContext();

  const [imageSrc, setImageSrc] = useState(null);

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
        to={"/properties/" + data.id}
        onClick={toggleDrawer}
        className=""
      >
        <div className="w-full relative h-40">
          <img src={imageSrc} alt="" className="h-full w-full" />
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
        className='absolute transition-all duration-900 right-36 group-hover:right-0'
        size={700}
      >
        <PropertyDetailsPage propId={data.id} />
      </Drawer>
      {/* } */}

    </div>
  );
}
