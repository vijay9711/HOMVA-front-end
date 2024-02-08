import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRoleContext } from "../context/roleContext";
import PropertiesService from "../service/propertiesService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark, faDog, faHouse, faToolbox, faFan, faSnowflake, faBed, faShower, faRuler } from "@fortawesome/free-solid-svg-icons";
import CustomerService from "../service/customerService";

const propertiesService = new PropertiesService();
export const PropertyDetailsPage = ({ propId }) => {
  const id = propId;
  const { state, dispatch } = useRoleContext();
  const [property, setProperty] = useState(null);
  const [isFav, setIsFav] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [editOffer, setEditOffer] = useState(false);
  const [price, setPrice] = useState();
  const makeOffer = () => {
    const body = {
      customerId: state.id,
      propertyId: property.id,
      price,
    };
    console.log(body);
    propertiesService.createOffer(state.id, body).then((res)=>{
      setEditOffer(false);
    }).catch(e=>{
      console.log(e);
    })

  }
  const enterOffer = () => {
    setEditOffer({ editOffer: !editOffer });
  }
  useEffect(() => {
    if (property) {
      setPrice(property.price);
      fetch(property.photos[0]?.link)
        .then((response) => response.blob())
        .then((blob) => {
          setImageSrc(URL.createObjectURL(blob));
        })
        .catch((error) => console.error(error));
    }
  }, [property]);

  useEffect(() => {
    propertiesService.getPropertyById(id)
      .then((res) => setProperty(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {property && (
        <div className="rounded-md p-4 overflow-y-auto">
          <div className="grid grid-cols-1">
            <div className="col-span-1">
              <img
                src={imageSrc}
                alt=""
                className="h-64 w-full object-cover rounded-md"
              />
              
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <div className="mt-3 grid col-span-2">
                    <div className={`${property.listingType == "SALE" ? "bg-red-100 text-red-800 " : "bg-blue-100 text-blue-800"} text-xl w-fit font-medium me-2 px-2.5 py-0.5 mt-2 rounded`}>FOR {property.listingType}</div>

                    <div className="flex mt-4">
                      {state && state.role === "CUSTOMER" && !(property.propertyStatus == "SOLD" || property.propertyStatus == "RENTED" || property.propertyStatus == "CONTINGENT") && (
                        <div
                          onClick={() => setEditOffer(true)}
                          className="rounded-md bg-blue-600 text-white font-semibold px-4 py-2 mr-2 hover:bg-blue-700 transition duration-300"
                        >
                          Make an Offer
                        </div>
                      )}
                        {
                          !state.id && (
                            <>
                              <p>Please login to make a offer for this property. <Link to={'login'} className="border bg-blue-200 border-blue-300 text-blue-600 p-1 px-3 rounded-lg hover:bg-blue-300 hover:border-transparent duration-300">Go To Login</Link></p>
                            </>
                          )
                        }
                      {
                        editOffer && (
                          <>
                          <input className="border focus:outline-none border-slate-950 rounded-lg pl-3" type="number" value={price} onChange={(event) => { setPrice(event.target.value) }} />
                          <button onClick={()=>{makeOffer()}} className="border border-green-500 bg-green-300 text-green-600 text-lg font-bold p-1 px-3 ml-2 rounded-lg">
                            <FontAwesomeIcon icon={faCheck} />
                          </button>
                          <button onClick={()=>{setEditOffer(!editOffer)}} className="border border-red-500 bg-red-300 text-red-600 text-lg font-bold p-1 px-3 ml-2 rounded-lg">
                            <FontAwesomeIcon icon={faXmark} />
                          </button>
                          </>
                        )
                      }
                    </div>
                  </div>

                  <div className="items-end mt-3">
                    <p className="text-4xl font-bold tracking-tight text-gray-900">
                      ${property.price?.toLocaleString()}
                    </p>
                    <p className=" text-gray-700 text-3xl mt-3">
                      ${property.propertyDetails?.deposit}/<span className="text-xl">Desposit</span>
                    </p>
                  </div>
                  <div className="mt-2 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill={
                        property.propertyStatus === "AVAILABLE"
                          ? "rgb(54, 179, 150)"
                          : property.propertyStatus === "PENDING"
                            ? "#FFC300"
                            : "#C70039"
                      }
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.5 7.5a3 3 0 013-3h9a3 3 0 013 3v9a3 3 0 01-3 3h-9a3 3 0 01-3-3v-9z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <label className="text-gray-600">
                      {property.propertyStatus}
                    </label>
                  </div>
                </div>
                <p className="text-gray-600">
                  {property.address?.street}, {property.address?.city},{" "}
                  {property.address?.state} {property.address?.zipcode}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6 mb-3">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faHouse}/>
              <div className="flex flex-col ml-4">
                <label className="text-gray-800 text-md font-bold">
                  {property.propertyType}
                </label>
                <label className="text-gray-500 text-xs">Property Type</label>
              </div>
            </div>
            <div className="flex items-center">
            <FontAwesomeIcon icon={faToolbox}/>

              <div className="flex flex-col ml-4">
                <label className="text-gray-800 text-md font-bold">
                  {property.builtYear?.split("-")[0]}
                </label>
                <label className="text-gray-500 text-xs">Year built</label>
              </div>
            </div>
            <div className="flex items-center">
            <FontAwesomeIcon icon={faDog} />

              <div className="flex flex-col ml-4">
                <label className="text-gray-800 text-md font-bold">
                  {property.propertyDetails?.pet ? "Allowed" : "Not Allowed"}
                </label>
                <label className="text-gray-500 text-xs">Pets allowed</label>
              </div>
            </div>
            <div className="flex items-center">
            <FontAwesomeIcon icon={faFan}/>
              <div className="flex flex-col ml-4">
                <label className="text-gray-800 text-md font-bold">
                  {property.propertyDetails?.heater}
                </label>
                <label className="text-gray-500 text-xs">Heater</label>
              </div>
            </div>
            <div className="flex items-center">
            <FontAwesomeIcon icon={faSnowflake}/>
              <div className="flex flex-col ml-4">
                <label className="text-gray-800 text-md font-bold">
                  {property.propertyDetails?.cooling}
                </label>
                <label className="text-gray-500 text-xs">Cooling</label>
              </div>
            </div>
            <div className="flex items-center">
            <FontAwesomeIcon icon={faBed}/>
              <div className="flex flex-col ml-4">
                <label className="text-gray-800 text-md font-bold">
                  {property.bedrooms}
                </label>
                <label className="text-gray-500 text-xs">Bed</label>
              </div>
            </div>
            <div className="flex items-center">
            <FontAwesomeIcon icon={faShower}/>
              <div className="flex flex-col ml-4">
                <label className="text-gray-800 text-md font-bold">
                  {property.bathrooms}
                </label>
                <label className="text-gray-500 text-xs">Bath</label>
              </div>
            </div>
            <div className="flex items-center">
            <FontAwesomeIcon icon={faRuler}/>
              <div className="flex flex-col ml-4">
                <label className="text-gray-800 text-md font-bold">
                  {property.lotSize}
                </label>
                <label className="text-gray-500 text-xs">sq. feet</label>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

