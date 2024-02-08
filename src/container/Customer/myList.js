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
    customerService.myList(state.id).then(res => {
      console.log(res);
      setProperties(res.data);
    }).catch(e => {
      console.log(e);
    })
  }
  return (
    <>
      <div className="m-3">
        <div className="grid gap-8 grid-cols-5">
          {
            properties.map(data => {
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
      <div>My list</div>
    </>
  )
}