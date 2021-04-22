import axios from "axios";
import { NOCOCID_API } from "../constant/api_link_constant";
import authHeader from "../author_service/authService";

const NOCID_API_PROJECTTYPE = NOCOCID_API + "ProjectTypes";

class ProjectTypeService {
    getAllProjectTypes(){
        return axios.get(NOCID_API_PROJECTTYPE,{headers:authHeader()});
    }
}

export default new ProjectTypeService();
