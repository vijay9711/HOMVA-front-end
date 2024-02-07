import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export const UserCard = ({ data, type, ownerAction }) => {
  return (
    <>
      <div className="">
        <div className="border shadow-md hover:shadow-lg rounded-lg p-3 duration-200 h-full">
          <div className="grid grid-cols-3">
            <div className="text-xl font-bold col-span-3">{data.firstName} {data.lastName}</div>
          </div>
          <div>{data.email}</div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div className="col-span">ID:{data.id}</div>
            <div className="col-span-2 items-end text-right"> <span className={`rounded-md border py-1 px-2 
            ${data.status == "ACTIVE" ? "bg-green-200 border-green-600 text-green-600" : ""}
            ${data.status == "PENDING" ? "bg-yellow-200 border-yellow-600 text-yellow-600" : ""}
            ${data.status == "DEACTIVE" ? "bg-red-200 border-red-600 text-red-600" : ""}
            
            `}>{data.status}</span>
              {
                type == "Owner" && data.status == "PENDING" &&
                <>
                  <button className="border cursor-pointer px-1  ml-2 border-green-500 text-green-700 hover:bg-green-200 duration-200 rounded-md" onClick={() => ownerAction(data.id, 'Approve')}>
                    <FontAwesomeIcon icon={faCheck} />
                  </button>
                  <button className="border cursor-pointer px-1.5  ml-2 border-red-500 text-red-700 hover:bg-red-200 duration-200 rounded-md" onClick={() => ownerAction(data.id, 'Decline')}>
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </>
              }
            </div>
          </div>

          <div className="grid grid-cols-2 gap-1">
            <div className="col-span-1">
              Properties: {data.properties.length}
            </div>
            {
              type == "Customer" &&
              <>
                <div className="col-span-1">
                  Offers: {data.offers.length}
                </div>
              </>
            }
          </div>
        </div>
      </div>
    </>
  )
}