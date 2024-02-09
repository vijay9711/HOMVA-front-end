import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRoleContext } from "../context/roleContext";
import PropertiesService from "../service/propertiesService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';
import { faXmark, faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";


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
    propertiesService.createOffer(state.id, body)
      .then((res)=>{
        setEditOffer(false);
        Swal.fire({
          title: 'Offer submitted!',
          icon: 'success'
        });
      })
      .catch(e=>{
        console.log(e);
      });
  }

  const enterOffer = () => {
    setEditOffer(!editOffer);
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

  const getTagColor = (status) => {
    switch (status) {
      case 'AVAILABLE':
        return "bg-green-200 border-green-300 text-green-800";
      case 'PENDING':
        return "bg-yellow-200 border-yellow-300 text-yellow-800";
      case 'CONTINGENT':
        return "bg-red-200 border-red-300 text-red-800";
      default:
        return 'bg-gray-200 broder-gray-300 text-gray-800'
    }
  }

  const handleContactOwner = () => {
    // Implement functionality to contact the property owner via email
    // You can use emailjs or any other service to send emails
    const recipient = property.ownerEmail;
    const subject = 'Regarding Your Property';
    const body = 'Hello, I am interested in your property. Can we discuss further?';
    
    const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open the user's default email client with the pre-filled email
    window.location.href = mailtoLink;
  };

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
                    <label className={`${getTagColor(property.propertyStatus)} border rounded px-2`}>
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
  <span>Contact Owner</span>
  <FontAwesomeIcon
    icon={faEnvelope}
    onClick={handleContactOwner}
    className="text-blue-600 cursor-pointer hover:text-blue-700 ml-2"
    style={{ fontSize: '1.5em' }} // Adjust the font size as needed
  />
</div>

            {/* Other property details */}
          </div>
        </div>
      )}
    </>
  );
}
