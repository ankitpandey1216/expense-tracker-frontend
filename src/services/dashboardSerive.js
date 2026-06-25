import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URL;

const dashboardService = axios.create({
    baseURL: `${BASE_URL}/dashboard`,
    timeout: 5000
})

dashboardService.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token){
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
},(err) => Promise.reject(err));


export const dashBoardApi = async () => {
    try {
        const response = await dashboardService.get();
        return response;
    } catch (error) {
        throw new Error(error);
    }
}