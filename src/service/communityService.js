
import { ApiHelper } from "./apiHelper";

const APP_URL = process.env.REACT_APP_URL;

const apiHelper = new ApiHelper();
export class CommunityService {
  getAllCommunity = () =>{
    let url = `${APP_URL}/communities`;
    return apiHelper.get(url);
  }
  getCommunityById = (id) => {
    let url = `${APP_URL}/communities/${id}`;
    return apiHelper.get(url);
  }
  getAllPropertiesByCommunityId = (id) => {
    let url = `${APP_URL}/communities/${id}/properties`;
    return apiHelper.get(url);
  }
  addProperty(data){
    let url = `${APP_URL}/communities/${data.communityId}/properties`;
    return apiHelper.post(url, data);
  }
}
export default CommunityService;