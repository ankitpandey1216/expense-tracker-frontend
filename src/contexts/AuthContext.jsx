import { createContext, useEffect, useState } from "react";
import { isExpired } from "../utilities/GeneralUtilities";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const [userId, setUserId] = useState(null);
    const [token, setToken] = useState(null);


    useEffect(() => {
        const storedUserId = localStorage.getItem("userId");
        const storedToken = localStorage.getItem("token");

        if (
            storedToken &&
            storedUserId &&
            !isExpired(storedToken)
        ) {
            setToken(storedToken);
            setUserId(storedUserId);
        } else {
            logout();
        }
    }, []);

    const login = (userId, token) => {
        localStorage.setItem("userId", userId);
        localStorage.setItem("token", token);
        setUserId(userId);
        setToken(token);
    }

    const logout = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        setUserId(null);
        setToken(null);

    }

    useEffect(() => {
        if (!token) {
            return;
        }
        if (token && isExpired(token)) {
            logout();
        }
    }, [token]);

    const value = {
        userId,
        token,
        login,
        logout,
        isAuthenticated: !!token && !isExpired(token)
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
