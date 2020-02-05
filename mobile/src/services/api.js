import axios from "axios";
import { environment } from "../utils/environment";
environment
const api = axios.create({
    baseURL: environment.baseUrl
});

export default api;