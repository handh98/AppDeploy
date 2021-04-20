import axios from "axios";
import { NOCOCID_API } from "../constant/api_link_constant";
import authHeader from "./authService";

const NOCOCID_API_ACCOUNT = NOCOCID_API + "Auth";

class LoginService {
  async login(loginRequest) {
    const response = await axios.post(
      NOCOCID_API_ACCOUNT + "/login",
      loginRequest
    );
    if (response.data.jwt) {
      localStorage.setItem("jwt", response.data.jwt);
    }
    return response.data;
  }

  logout() {
    return axios.post(
      NOCOCID_API_ACCOUNT + "/logout",
      {},
      { headers: authHeader() }
    );
  }

  register(signupRequest) {
    return axios.post(NOCOCID_API_ACCOUNT + "/register", signupRequest);
  }
}

export default new LoginService();
