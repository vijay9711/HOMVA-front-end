import React, { useContext, useEffect, useState } from "react";
import { useRoleContext } from "../../context/roleContext";
import { ArrowDownOnSquareStackIcon } from "@heroicons/react/24/outline";
import {OfferCard} from "../../component/OfferCard";
import CustomerService from "../../service/customerService";

const customerService = new CustomerService();
export const CustomerOffers = () => {
  const [offers, setOffers] = useState([]);
  const { state, dispatch } = useRoleContext();

  useEffect(() => {
    if (state) {
      getAllOffer();
    }
  }, [state]);

  const getAllOffer = () => {
    customerService.getCustomerOffers(state.id).then(res=>{
      setOffers(res.data);
    }).catch(e=>{console.log(e)});
  }

  const onDelete = (event) => {
    console.log(event);
    customerService.deleteOfferByCustomerId(state.id, event.id).then(() => {
      getAllOffer();
    })
    .catch((err) => console.log(err));
  };

  const onEdit = (event) => {
    console.log(event);
    const price = document.getElementById(event).value;

    // customerService.editOfferByCustomerId(state.id, offerId, price).then(()=>{
    //   getAllOffer();
    // })
    // .catch((err) => console.log(err));
  };

  // vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8
  const onDownload = () => {
    let csvRows = [];
    let data = offers.map((o) => {
      return {
        id: o.id,
        price: o.price,
        status: o.status,
        submittedAt: o.submittedAt,
        propertyPrice: o.property.price,
        propertyStatus: o.property.propertyStatus,
        propertyType: o.property.propertyType,
      };
    });
    const header = [
      "Id",
      "Offer Price",
      "Offer Status",
      "Offer Date",
      "Property Price",
      "Property Status",
      "Property Type",
    ];
    data = data.map((dt) => Object.values(dt).join(","));
    csvRows.push(header.join(","));
    csvRows = [...csvRows, ...data];
    data = csvRows.join("\n");
    // file object
    const file = new Blob([data], { type: "application/csv" });

    // anchor link
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = "100ideas-" + Date.now() + ".csv";

    // simulate link click
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  return (
    <div className="flex flex-col m-5">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-medium">My Offers</h1>
        {offers.length > 0 && (
          <button
            onClick={onDownload}
            className="border rounded px-3 py-1.5 flex items-center hover:border-gray-300 hover:shadow-sm transition"
          >
            Download
            <ArrowDownOnSquareStackIcon className="h-6 w-6 ml-2" />
          </button>
        )}
      </div>

      <div className="grid gap-8 grid-cols-4">
            {offers.map((offer) => (
              <OfferCard offer={offer} parent={'customer'} buttonOne={onDelete} buttonTwo={onEdit} />
            ))}
      </div>
    </div>
  );
}

