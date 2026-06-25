import axios from "axios";

export const groupMemberApi = axios.create({
    baseURL: "https://expense-tracker-backend-production-60cd.up.railway.app/group",
    timeout: 5000
});

groupMemberApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token){
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
    }

},(err) => Promise.reject(err));