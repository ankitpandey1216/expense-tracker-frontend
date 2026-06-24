import axios from "axios";

export const registerUser = async (user) => {
    try {
        const response = await fetch("http://localhost:8080/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

        return await response.json();
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
}

export const loginUser = async (credentials) => {
    try {
        const response = await fetch("http://localhost:8080/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });
        console.log("response from register user : ", response);
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
}

export const userApi = axios.create({
    baseURL: "http://localhost:8080/users",
    timeout: 5000
})

userApi.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if(token){
        config.headers["Authorization"] = `Bearer ${token}`;
         return config;
    }
},(err) => Promise.reject(err))