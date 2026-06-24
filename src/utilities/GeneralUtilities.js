import { jwtDecode } from "jwt-decode";

export const isExpired = (token) => {
    if(!token){
        return;
    }

    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now()/1000;
        if(currentTime > decoded.exp){
            return false;
        }
    } catch (error) {
        throw new Error("Error while decoding the token");
    }
}