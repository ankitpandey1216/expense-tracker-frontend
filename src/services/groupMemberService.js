import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URL;

export const groupMemberApi = axios.create({
    baseURL: `${BASE_URL}/group`,
    timeout: 5000
});

groupMemberApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token){
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
    }

},(err) => Promise.reject(err));