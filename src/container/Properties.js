import React, {useContext, useState, useEffect} from "react"
import {Property} from "../component/Property";
import {useRoleContext} from "../context/roleContext";
import Dropdown from "../widget/Dropdown";
import PropertiesService from "../service/propertiesService";
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css'

const propertiesService = new PropertiesService();

function Properties() {
    const BASE_URL = "http://localhost:8080/api/v1/properties";
    const [properties, setProperties] = useState([]);

    const [pagination, setPagination] = useState({});

    const propertyTypes = ["HOUSE", "APARTMENT", "CONDO", "TOWNHOUSE"];

    const [text, setText] = useState("");

    const listingTypes = ["RENT", "SALE"];

    const numbers = [1, 2, 3, 4, 5];

    const [params, setParams] = useState({});

    const [favs, setFavs] = useState([]);

    const {state, dispatch} = useRoleContext();
    const [isOpen, setIsOpen] = React.useState(false)
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    useEffect(() => {
        // fetchData();
        getProperties();

        // if (user && user.role === "CUSTOMER") {
        //   fetchFavs();
        // }
    }, [params]);

    const getProperties = () => {
        propertiesService.getAllProperties().then((res) => {
            setProperties(res.data.content);
        }).catch(e => {
            console.log(e)
        })
    }

    // const fetchFavs = async () => {
    //   userAxios

    //     .get(`http://localhost:8080/api/v1/customers/${user.id}/favorites`)

    //     .then(({ data }) => {
    //       const ids = data.map((dt) => dt.id);

    //       console.log(ids);

    //       setFavs(ids);
    //     })

    //     .catch((err) => console.log(err));
    // };

    // const checkIfFav = (pptId) => {
    //   return favs.includes(pptId);
    // };

    const onClicked = (query) => {
        setParams((prev) => ({...prev, ...query}));
    };

    // const toggleFav = async (id, isFav) => {
    //   if (isFav) {
    //     await userAxios

    //       .delete(
    //         `http://localhost:8080/api/v1/customers/${user.id}/favorites/${id}`
    //       )

    //       .then(() => {
    //         const ids = favs.filter((fav) => fav !== id);

    //         console.log(ids);

    //         setFavs(ids);
    //       })

    //       .catch((err) => console.log(err));
    //   } else {
    //     await userAxios

    //       .post(`http://localhost:8080/api/v1/customers/${user.id}/favorites`, {
    //         customer_id: user.id,

    //         property_id: id,
    //       })

    //       .then(() => {
    //         const ids = [...favs, id];

    //         console.log(ids);

    //         setFavs(ids);
    //       });
    //   }
    // };

    const handlePageChange = (pageNumber) => {
        setParams((prevParams) => ({
            ...prevParams,

            page: pageNumber - 1,
        }));
    };

    return (
        <div className="m-3">
            <div className="flex justify-end mb-6 items-center">
                {/* <button
          onClick={fetchData}
          className="rounded-md px-5 py-1.5 bg-sky-700 p-1 text-white hover:text-white focus:outline-none"
        >
          Filter
        </button> */}


                <div className="mr-3">
                    <Dropdown
                        query={params}
                        value="propertyType"
                        title="Property Type"
                        items={propertyTypes}
                        onClicked={onClicked}
                    />
                </div>


                <div className="mr-3">
                    <Dropdown
                        query={params}
                        value="listingType"
                        title="Listing Type"
                        items={listingTypes}
                        onClicked={onClicked}
                        className="mr-1"
                    />
                </div>


                <button
                    onClick={() => {
                        setParams({});

                        setText("");
                    }}
                    className="rounded-md px-5 py-1.5 bg-sky-700 p-1 text-white hover:text-white focus:outline-none"
                >
                    Clear
                </button>
            </div>

            <div className="grid gap-8 grid-cols-5">
                {properties.map((pro) => (
                    <Property
                        key={pro.id}
                        data={pro}
                    />
                ))}
            </div>
            <button onClick={toggleDrawer}>Show</button>
            <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction='right'
                className='bla bla bla'
            >
                <div>Hello World</div>
            </Drawer>
        </div>
    );
}

export default Properties;
