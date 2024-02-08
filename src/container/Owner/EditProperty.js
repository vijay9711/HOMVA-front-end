import React, { useContext, useEffect, useRef, useState } from "react";
// import userAxios from "../../util/axios";
import { useNavigate } from "react-router-dom";
//import { UserContext } from '../../context/UserContext';
import { useRoleContext } from "../../context/roleContext";
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import PropertiesService from "../../service/propertiesService";


const propertiesService = new PropertiesService();

function EditProperty({ propertyAdded, id }) {
  const formRef = useRef(null);
  const navigate = useNavigate();
  //const { user } = useContext(UserContext);
  const { state, dispatch } = useRoleContext();
  const [file, setFile] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  useEffect(() => {
    propertiesService.getPropertyById(id).then(res=>{
      loadData(res.data);
    }).catch(e=>{console.log(e)});
  }, [])
  const loadData = (data) => {
    const form = formRef.current;
    form["propertyType"].value = data.propertyType;
    form["price"].value = data.price;
    form["bedrooms"].value = data.bedrooms;
    form["bathrooms"].value = data.bathrooms;
    form["lotSize"].value = data.lotSize;
    form["builtYear"].value = data.builtYear;
    form["listingType"].value = data.listingType;
    form["pet"].value = data.propertyDetails.pet;
    form["cooling"].value = data.propertyDetails.cooling;
    form["heater"].value = data.propertyDetails.heater;
    form["deposit"].value = data.propertyDetails.deposit;
    form["street"].value = data.address.street;
    form["city"].value = data.address.city;
    form["state"].value = data.address.state;
    form["zipcode"].value = data.address.zipcode;
  }
  const AddHandler = (e) => {
    e.preventDefault();
    const form = formRef.current;
    setIsUploading(true);

    const body = {
      propertyType: form["propertyType"].value,
      price: form["price"].value,
      bedrooms: form["bedrooms"].value,
      bathrooms: form["bathrooms"].value,
      lotSize: form["lotSize"].value,
      builtYear: form["builtYear"].value,
      listingType: form["listingType"].value,
      pet: form["pet"].value,
      cooling: form["cooling"].value,
      heater: form["heater"].value,
      deposit: form["deposit"].value,
      // },
      ownerId: state.id
    };
    onUploadHandler(body)
  };

  const cancelUpload = () => {
    setFile(null);
  }

  const onFileChange = ({ target }) => {
    const file = target.files[0];
    setFile(file);
  }

  const onUploadHandler = (data) => {
    const formData = new FormData();

    formData.append('file', file);
    for (const [key, value] of Object.entries(data)) {
      if (["propertyDetails", "address"].includes(key)) {
        formData.append(key, JSON.stringify(value));
        continue;
      }
      formData.append(key, value)
    }
    propertiesService.createProperty(formData, state.id)
      .then((res) => {
        setIsUploading(false);
        alert("Property Added Successfully");
        propertyAdded();
      })
      .catch(e => { setIsUploading(false); console.log(e) })
  }

  if (state && state.status !== 'ACTIVE') {
    return (
      <div className="flex flex-col items-center">
        <h1 className="flex items-center font-semibold text-3xl text-gray-800 mb-4">
          Your account is under review <ExclamationTriangleIcon className="ml-2 mt-1 h-8 w-8 text-yellow-600" aria-hidden="true" />
        </h1>
        <p className="text-gray-500 text-xl">
          Admin has to activate your account before you are able to post properties.
        </p>
      </div>
    )
  }

  return (
    <div className="flex  flex-col items-center mb-6">
      <form
        ref={formRef}
        onSubmit={AddHandler}
        className="flex border px-24 py-12 rounded-md flex-col"
      >
        <h1 className="text-center text-lg mb-6 font-medium">
          Edit your property
        </h1>
        <label className="font-bold" htmlFor="propertyType">
          Property Type:
        </label>
        <select
          required
          className="border px-3 py-2 rounded-md focus:outline-sky-500"
          name="propertyType"
          id="propertyType"
        >
          <option value="">Select Property Type</option>
          <option value="HOUSE">HOUSE</option>
          <option value="APARTMENT">APARTMENT</option>
          <option value="CONDO">CONDO</option>
          {/* Add more options for other property types */}
        </select>
        <br />
        <label className="font-bold" htmlFor="price">
          Price:
        </label>
        <input
          required
          className="border px-3 py-2 rounded-md focus:outline-sky-500"
          type="number"
          name="price"
          id="price"
        />
        <br />

        <div className="flex">
          <div className="flex flex-col mr-3">
            <label className="font-bold" htmlFor="price">
              Bed Rooms:
            </label>
            <input
              required
              className="border px-3 py-2 rounded-md focus:outline-sky-500"
              type="number"
              name="bedrooms"
              id="bedrooms"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold" htmlFor="price">
              Bath Rooms:
            </label>
            <input
              required
              className="border px-3 py-2 rounded-md focus:outline-sky-500"
              type="number"
              name="bathrooms"
              id="bathrooms"
            />
          </div>
        </div>
        <br />
        <label className="font-bold" htmlFor="price">
          Lot Size:
        </label>
        <input
          required
          className="border px-3 py-2 rounded-md focus:outline-sky-500"
          type="number"
          name="lotSize"
          id="lotSize"
        />
        <br />

        <label className="font-bold" htmlFor="price">
          Built Year:
        </label>
        <input
          required
          className="border px-3 py-2 rounded-md focus:outline-sky-500"
          type="date"
          name="builtYear"
          id="builtYear"
        />

        <br />
        <label className="font-bold" htmlFor="listingType">
          Listing Type:
        </label>
        <select
          required
          className="border px-3 py-2 rounded-md focus:outline-sky-500"
          name="listingType"
          id="listingType"
        >
          <option value="">Select Listing Type</option>
          <option value="RENT">RENT</option>
          <option value="SALE">SALE</option>
        </select>
        <br />
        <div className="gap-4">
          <label className="font-bold mr-4" htmlFor="pet">
            Pet Allowed
            <input
              className="ml-2"
              type="checkbox"
              name="pet"
              id="pet"
              defaultValue={false}
            />
          </label>
        </div>

        <br />
        <label className="font-bold" htmlFor="cooling">
          Cooling:
        </label>
        <input
          required
          className="border px-3 py-2 rounded-md focus:outline-sky-500"
          type="text"
          name="cooling"
          id="cooling"
        />
        <br />

        <label className="font-bold" htmlFor="heater">
          Heater:
        </label>
        <input
          required
          className="border px-3 py-2 rounded-md focus:outline-sky-500"
          type="text"
          name="heater"
          id="heater"
        />
        <br />
        <label className="font-bold" htmlFor="deposit">
          Deposit:
        </label>
        <input
          required
          className="border px-3 py-2 rounded-md focus:outline-sky-500"
          type="number"
          name="deposit"
          id="deposit"
        />
        <button className="flex justify-center items-center rounded-md mt-8 px-3 py-2 bg-sky-600 p-1 text-white hover:bg-sky-700 hover:text-white focus:outline-none transitions">
          Edit property
          {isUploading && (
            <span className="inline-block ml-2 animate-spin w-5 h-5 border-2 border-white ease-linear rounded-full border-t-2"></span>
          )}
        </button>
      </form>
    </div>
  );


}

export default EditProperty;
