import React, { useEffect, useState } from "react";
import CustomerService from "../../service/customerService";
import { useRoleContext } from "../../context/roleContext";
import { Property } from "../../component/Property";

const customerService = new CustomerService;
export const MyList = () => {
  const { state, dispatch } = useRoleContext();
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getMyList();
  }, [])
  const getMyList = () => {
    console.log(state, " from my list");
    customerService.myList(state?.id).then(res => {
      res.data.map(item => item.isFav = true);
      setProperties(res.data);
    }).catch(e => {
      console.log(e);
    })
  }
  return (
    <>
      <div className="m-6">
      <div className="font-bold text-3xl">My List</div>
        <div className="grid gap-8 grid-cols-5 mt-4">
          {
            properties.map((data) => {
              return (<>
                <Property
                  key={data.id}
                  data={data}
                  deleteProperty={getMyList}
                />
              </>)
            })
          }
        </div>
      </div>
    </>
  )
}