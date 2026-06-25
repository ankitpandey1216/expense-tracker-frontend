import axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URL;

const expenseApi = axios.create({
    baseURL: `${BASE_URL}/groups`,
    timeout: 5000
})

expenseApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token){
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
})


export const addGroupExpense = async (groupId,expenseData) => {
    try {
        const response = await expenseApi.post(`/${groupId}/expense`,expenseData);
        return response;
    } catch (error) {
        throw new Error(error);
    }
}

export const getGroupBalance = async (groupId,userId) => {
    try {
        const response = expenseApi.get(`/${groupId}/expense/balance/${userId}`);
        return response;
    } catch (error) {
        throw new Error(error);
    }
}
