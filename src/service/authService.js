
import { ApiHelper } from "./apiHelper";

const APP_URL = process.env.REACT_APP_URL;

const apiHelper = new ApiHelper();
export class AuthService {
  login = (data) =>{
    let url = `${APP_URL}/auth/login`;
    return apiHelper.loginPost(url, data);
  }
  signup = (data) => {
    let url = `${APP_URL}/auth/signup`;
    return apiHelper.loginPost(url, data);
  }
  // getAllPropertiesByCommunityId = (id) => {
  //   let url = `${APP_URL}/communities/${id}/properties`;
  //   return apiHelper.get(url);
  // }
  // addProperty(data){
  //   let url = `${APP_URL}/communities/${data.communityId}/properties`;
  //   return apiHelper.post(url, data);
  // }
}
export default AuthService;