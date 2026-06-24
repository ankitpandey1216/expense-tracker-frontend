import axios from "axios";

const groupApi = axios.create({
    baseURL: "http://localhost:8080/groups",
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