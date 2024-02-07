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


    const propertyTypes = ["HOUSE", "APARTMENT", "CONDO", "TOWNHOUSE"];

    const [text, setText] = useState("");

    const listingTypes = ["RENT", "SALE"];

    const [params, setParams] = useState({});

    // const [favs, setFavs] = useState([]);

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
        console.log(params)
        propertiesService.getAllProperties().then((res) => {
            setProperties(res.data.content);
        }).catch(e => {
            console.log(e)
        })
    }

    const onClicked = (query) => {
        setParams((prev) => ({...prev, ...query}));
    };

    const handlePageChange = (pageNumber) => {
        setParams((prevParams) => ({
            ...prevParams,

            page: pageNumber - 1,
        }));
    };

    return (
        <div className="m-3">
            {/* <div className="flex justify-end mb-6 items-center">


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
            </div> */}

            <div className="grid gap-8 grid-cols-5">
                {properties.map((pro) => (
                    <Property
                        key={pro.id}
                        data={pro}
                    />
                ))}
            </div>
        </div>
    );
}

export default Properties;
