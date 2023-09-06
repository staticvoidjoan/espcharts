import React, {createContext, useContext, useState, useEffect} from "react";
import {getToken} from "./GetToken";

const AuthConext = createContext();

export function useAuth() {
    return useContext(AuthConext);
}

export function AuthProvider({children}) {
    const [token, setToken] = useState("");

    useEffect(() => {
        async function fetchAndSetToken() {
            const userToken = await getToken();
            if (userToken) {
                setToken(userToken);
            }
        }
    },[]);

    return (
        <AuthConext.Provider value={{token}}>
            {children}
        </AuthConext.Provider>
    )
}