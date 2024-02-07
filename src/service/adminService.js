
import { ApiHelper } from "./apiHelper";

const APP_URL = process.env.REACT_APP_URL;

const apiHelper = new ApiHelper();
export class AdminService {
  getCustomers = () =>{
    let url = `${APP_URL}/admin/customers`;
    return apiHelper.get(url);
  }
  getOwners = () => {
    let url = `${APP_URL}/admin/owners`;
    return apiHelper.get(url);
  }
  activateOwner = (id) => {
    let url = `${APP_URL}/admin/owners/${id}/activated-owner`;
    return apiHelper.put(url,{});
  }

  deactivateOwner = (id) => {
    let url = `${APP_URL}/admin/owners/${id}/deactivated-owner`;
    return apiHelper.put(url,{});
  }
}
export default AdminService;