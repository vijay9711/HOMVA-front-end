import React, {useContext, useState, useEffect} from "react"
import {Property} from "../component/Property";
import {useRoleContext} from "../context/roleContext";
import PropertiesService from "../service/propertiesService";
import 'react-modern-drawer/dist/index.css'
import CustomerService from "../service/customerService";

const propertiesService = new PropertiesService();
const customerService = new CustomerService();
function Properties() {
    const [properties, setProperties] = useState([]);
    const [params, setParams] = useState({});
    const {state, dispatch} = useRoleContext();
    const [myList, setMyList] = useState([]);
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleDrawer = () => {
        setIsOpen((prevState) => !prevState)
    }
    useEffect(() => {
        getProperties();
    }, [params]);

    const getProperties = () => {
        propertiesService.getAllProperties().then((res) => {
            if(state.id != null){
                getMyList(res.data.content);
            }
            setProperties(res.data.content);
        }).catch(e => {
            console.log(e)
        })
    }
    const getMyList = (pData) =>{
        customerService.myList(state.id).then(res=>{
            console.log(res);
            if(res.data && pData){
                let ids = [];
                res.data.map(item=>{
                    ids.push(item.id);
                })
                let newProps = [];
                pData.map(item => {
                    if(ids.indexOf(item.id) != -1){
                        item.isFav = true;
                    }else{
                        item.isFav = false;
                    }
                    newProps.push(item);
                });
                setProperties(newProps);
            }
        }).catch(e=>{console.log(e)});
    }
    return (
        <div className="m-3">
            <div className="grid gap-8 grid-cols-5">
                {properties.map((pro) => (
                    <Property
                        key={pro.id}
                        data={pro}
                        deleteProperty={getProperties}
                    />
                ))}
            </div>
        </div>
    );
}

export default Properties;
