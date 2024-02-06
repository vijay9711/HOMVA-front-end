import React, {useEffect, useState} from 'react'
import Drawer from "react-modern-drawer";

import AddProperty from "./AddProperty";
import {Property} from "../../component/Property";
import PropertiesService from "../../service/propertiesService";
import {useRoleContext} from "../../context/roleContext";

const propertiesService = new PropertiesService();

const MyProperty =() => {

    const [params, setParams] = useState({});
    const [isOpen, setIsOpen] = React.useState(false);
    const [properties, setProperties] = useState([]);
    const { state, dispatch } = useRoleContext();

    useEffect(() => {
        // fetchData();
        getProperties();

    }, [params]);

    const getProperties = () => {
        propertiesService.getPropertiesByOwnerId(state.id)
            .then((res)=>{
            setProperties(res.data);
        }).catch(e=>{console.log(e)})
    }

    const addPropertyToggleDrawer = () => {
        setIsOpen((prevState) => !prevState);
    };

    return (
        <div className="m-3">
            <div className="flex justify-end mb-6 items-center">
                <button className="rounded-md px-5 py-1.5 bg-sky-700 p-1 text-white hover:text-white focus:outline-none"
                    onClick={() => addPropertyToggleDrawer()}
                >Add Property</button>

                <Drawer
                    open={isOpen}
                    onClose={addPropertyToggleDrawer}
                    direction='right'
                    className='absolute transition-all duration-900 right-36 group-hover:right-0 overflow-y-auto'
                    size={700}

                >
                    <AddProperty />
                </Drawer>
            </div>

                <div className="grid gap-8 grid-cols-5">
                    {properties.map((pro) => (
                        <Property
                            key={pro.id}
                            data={pro}
                        />
                    ))}
                </div>


        </div>
    )
}

export default MyProperty
