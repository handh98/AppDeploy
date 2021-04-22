import axios from "axios";
import { NOCOCID_API } from "../constant/api_link_constant";
import authHeader from "../author_service/authService";

const NOCOCID_API_PROJECT = NOCOCID_API + "Projects";

class ProjectService {
  
  getAllProject() {
    return axios.get(NOCOCID_API_PROJECT, {
      headers: authHeader(),
    });
  }

  create(projectRequest) {
    return axios.post(NOCOCID_API_PROJECT + "/create", projectRequest, {
      headers: authHeader(),
    });
  }
}

export default new ProjectService();
