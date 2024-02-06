import React from "react";

export const OfferCard = ({ offer }) => {
  const getDifference = () => {
    let price = offer.property?.price - offer.price;
    return price > 0 ? price : price * -1;
  }
  const approveOffer = (event) => {
    console.log(event);
  }
  const declineOffer = (event) => {
    console.log(event);
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
  return (
    <>
      <div className="shadow-lg p-3 rounded-md border">
        <div className="grid grid-cols-2">
          <div>
            {offer.property?.listingType}
          </div>
          <div>
            <div className={`${offer.status == "WAITING" ? "bg-yellow-200 border-yellow-800" : ""} p-1 border text-slate-900 px-2 items-center align-center w-fit ml-auto rounded-lg `}>
              {offer.status}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 items-center text-center">
          <div>
            Your Price
          </div>
          <div>
            Offer Price
          </div>
        </div>
        <div className="grid grid-cols-2 items-center text-center">
          <div className="font-bold text-2xl">
            {offer.property?.price}
          </div>
          <div className="font-bold text-2xl">
            {offer.price}
          </div>
        </div>
        {/* <div className="grid grid-cols-1 items-center text-center">
          <div className="font-bold text-2xl">
            Difference
          </div>
          <div className="font-bold text-2xl">
           {getDifference()}
          </div>
        </div> */}
        <div>
          Address : {getAddress(offer.property)}
        </div>
        <div className="grid grid-cols-2">
          <div className="items-center align-middle text-justify">
            {/* <button >Approve</button> */}
            <button onClick={(event) => { approveOffer(event) }}
              type="button"
              className="text-right focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
              Approve
            </button>
          </div>
          <div>
            <button
              onClick={(event) => { declineOffer(event) }}
              type="button"
              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              Decline
            </button>
          </div>
        </div>
      </div>
    </>
  )
}