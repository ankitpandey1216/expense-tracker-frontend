import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URL;

const groupApi = axios.create({
    baseURL: `${BASE_URL}/groups`,
    timeout: 5000
})

groupApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token){
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
    }

},(err) => Promise.reject(err));

export default groupApi;