import axios from "axios";

const dashboardService = axios.create({
    baseURL: "expense-tracker-backend-production-60cd.up.railway.app/dashboard",
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