
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
  editOffer = (id,offerId,data) => {
    let url = `${APP_URL}/customers/${id}/offers/${offerId}`;
    return apiHelper.put(url,data);
  }
  deleteOffer = (id,offerId) => {
    let url = `${APP_URL}/customers/${id}/offers/${offerId}`;
    return apiHelper.delete(url);
  }
  myList = (id) => {
    let url = `${APP_URL}/customers/${id}/favorites`;
    return apiHelper.get(url);
  }
  bookmarkProperty = (id,data) => {
    let url = `${APP_URL}/customers/${id}/favorites`;
    return apiHelper.post(url,data);
  }
  removeBookmark= (id, pid) => {
    let url = `${APP_URL}/customers/${id}/favorites/${pid}`;
    return apiHelper.delete(url);
  }
}
export default CustomerService;