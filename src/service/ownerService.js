
import { ApiHelper } from "./apiHelper";

const APP_URL = process.env.REACT_APP_URL;

const apiHelper = new ApiHelper();
export class OwnerService {
  getOwnerOffers = (id) =>{
    let url = `${APP_URL}/owners/${id}/offers`;
    return apiHelper.get(url);
  }
  approveOffer = (id,offerId) => {
    let url = `${APP_URL}/owners/${id}/offers/${offerId}/accept`;
    return apiHelper.put(url, {});
  }
  declineOffer = (id,offerId) => {
    let url = `${APP_URL}/owners/${id}/offers/${offerId}/decline`;
    return apiHelper.put(url, {});
  }
}