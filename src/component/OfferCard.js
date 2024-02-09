import React, { useState, useEffect } from "react";
import { PropertyDetailsPage } from "../container/propertyDetailsPage";
import Drawer from "react-modern-drawer";
import { type } from "@testing-library/user-event/dist/type";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
export const OfferCard = ({ offer, parent, buttonOne, buttonTwo }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isEdit, setIsEdit] = useState(true);
  let newPrice = 0;
  const getDifference = () => {
    let price = offer.property?.price - offer.price;
    return price > 0 ? price : price * -1;
  }
  useEffect(() => {
    fetch(offer.property?.photos[0]?.link)
      .then((response) => response.blob())

      .then((blob) => {
        setImageSrc(URL.createObjectURL(blob));
      })
      .catch((error) => console.error(error));
  }, [offer]);
  const buttonOneEvent = (event) => {
    console.log(event);
    if (event.property.propertyStatus == "CONTINGENT" && parent == "customer") {
      alert("You can't delete contingent offer.");
    } else {
      buttonOne(event);
    }
  }
  const cancelEdit = () => {
    // buttonTwo(null);
    newPrice = 0;
    setIsEdit(true);
  }
  const makeNewPrice = (offer, newPrice) => {
    buttonTwo(offer, newPrice);
    newPrice = 0;
    setIsEdit(true);
  }
  const buttonTwoEvent = (event) => {
    console.log(event);
    if (parent == "customer") {
      setIsEdit(false);
    } else {
      buttonTwo(event);
    }
  }
  const getAddress = (data) => {
    let address = `${data.address?.street}, ${data.address?.city}, ${data.address?.state} 
    ${data.address?.zipcode}`
    if (address.length > 40) {
      address = address.substring(0, 45);
      address = address + "...";
    }
    return address;
  }
  const getTagColor = (status) => {
    switch (status) {
      case 'WAITING':
        return "bg-yellow-200 border-yellow-300 text-yellow-800";
      case 'ACCEPTED':
        return "bg-green-200 border-green-300 text-green-800";
      case 'DECLINED':
        return "bg-red-200 border-red-300 text-red-800";
    }
  }
  const getAction = (offer, property) => {
    console.log("offer and status property ", offer.status, property.propertyStatus, parent)
    if ((offer.status == "WAITING" || offer.status == "ACCEPTED") && (property.propertyStatus == "PENDING" || property.propertyStatus == "CONTINGENT" || property.propertyStatus == "AVAILABLE")) {
      return (
        <>
          <div className="grid grid-cols-2 items-center mt-3">
            <div className="flex justify-center">
              <button
                onClick={() => { buttonOneEvent(offer) }}
                type="button"
                className={`${property.propertyStatus == "CONTINGENT" && parent == "customer" ? "cursor-not-allowed bg-red-500" : "cursor-pointer"} text-right focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"`}>
                {parent == "owner" ? 'Decline' : 'Delete'}
              </button>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => { buttonTwoEvent(offer) }}
                type="button"
                className="focus:outline-none cursor-pointer text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                {parent == "owner" ? 'Approve' : 'Edit'}
              </button>
            </div>
          </div>
        </>
      )
    }
  }
  return (
    <>
      <div className="shadow-lg rounded-lg border">
        <div className="w-full relative h-40">
          <img src={imageSrc} alt="" className="h-full w-full rounded-lg rounded-br-none rounded-bl-none" />
        </div>
        <div className="p-3">
          <div>
            <div className="grid grid-cols-2 mb-3" >
              <div>
                {offer.property?.listingType}
                <span onClick={() => setIsOpen((prevState) => !prevState)} className="text-blue-500 cursor-pointer ml-2 hover:text-blue-700 duration-200">View More</span>
              </div>
              <div>
                <div className={`${getTagColor(offer.status)} p-1 border text-slate-900 px-2 items-center align-center w-fit ml-auto rounded-lg `}>
                  {offer.status}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 items-center text-center">
              <div>
                Price
              </div>
              <div>
                Offered Price
              </div>
            </div>
            <div className="grid grid-cols-2 items-center text-center">
              <div className="font-bold text-2xl">
                {offer.property?.price}
              </div>
              <div className="font-bold text-2xl">
                {
                  isEdit ?
                    <div>
                      {offer.price}
                    </div> :
                    <div className="flex justify-between">
                      <input className="border w-[70px] rounded-md px-2" type="number" onChange={(e)=>{newPrice = e.target.value}} />
                      <button onClick={() => { makeNewPrice({offer, newPrice}) }} className="border border-green-500 bg-green-300 text-green-600 text-lg font-bold p-1 px-3 ml-2 rounded-lg">
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                      <button onClick={() => { cancelEdit() }} className="border border-red-500 bg-red-300 text-red-600 text-lg font-bold p-1 px-3 ml-2 rounded-lg">
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </div>
                }
              </div>
            </div>
            <div className="mt-3">
              Address : {getAddress(offer.property)}
            </div>
          </div>
          {
            getAction(offer, offer.property)
          }
        </div>
        <Drawer
          open={isOpen}
          onClose={() => setIsOpen((prevState) => !prevState)}
          direction='right'
          className='absolute transition-all duration-900 right-36 group-hover:right-0 overflow-y-auto'
          size={700}

        >
          <PropertyDetailsPage propId={offer?.property?.id} />
        </Drawer>
      </div>
    </>
  )
}