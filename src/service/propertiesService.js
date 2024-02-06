
import { ApiHelper } from "./apiHelper";

const APP_URL = process.env.REACT_APP_URL;

const apiHelper = new ApiHelper();
export class PropertiesService {
  getAllProperties = () =>{
    let url = `${APP_URL}/properties`;
    return apiHelper.get(url);
  }
  getPropertyById = (id) => {
    let url = `${APP_URL}/properties/${id}`;
    return apiHelper.get(url);
  }
  getPropertiesByOwnerId = (id) => {
    let url = `${APP_URL}/owners/${id}/properties`;
    return apiHelper.get(url);
  }
  createProperty = (body, id) => {
    console.log(body);
    console.log(id);
    let url = `${APP_URL}/owners/${id}/properties`;
    return apiHelper.post(url, body);
  }

}
export default PropertiesService;