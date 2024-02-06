
import { ApiHelper } from "./apiHelper";

const APP_URL = process.env.REACT_APP_URL;

const apiHelper = new ApiHelper();
export class CustomerService {
  getCustomerOffers = (id) =>{
    let url = `${APP_URL}/customers/${id}/offers`;
    return apiHelper.get(url);
  }
  deleteOfferByCustomerId = (id, offerId) => {
    let url = `${APP_URL}/customers/${id}/offers/${offerId}`;
    return apiHelper.delete(url);
  }
  editOfferByCustomerId = (id,offerId,data) => {
    let url = `${APP_URL}/customers/${id}/offers/${offerId}`;
    return apiHelper.put(url,data);
  }
}
export default CustomerService;