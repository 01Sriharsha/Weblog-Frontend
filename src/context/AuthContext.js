import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { controller, login } from "../api/apiService";

const Context = createContext();

export const CustomContext = () => useContext(Context);

export default function AuthContext({ children }) {
    const navigate = useNavigate();

    const location = useLocation();

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [user, setUser] = useState(undefined);


    useEffect(() => {
        console.log("use effect called");
        onRefresh();
    }, [])

    function onRefresh() {
        if (!localStorage.getItem("data")) {
            localStorage.clear();
            setUser(undefined);
            setIsAuthenticated(false)
            navigate("/")
        }
        else {
            const userdata = JSON.parse(localStorage.getItem("data")).user;
            setUser(userdata);
            setIsAuthenticated(true)
            navigate(location.pathname)
        }
    }

    async function doLogin(loginInfo) {
        const response = await login(loginInfo);
        if (response.status === 200 || response.status === 201) {
            setIsAuthenticated(true);
            console.log(response.data.token);
            localStorage.setItem("data", JSON.stringify(response.data));
            if (!localStorage.getItem("data")) {
                setUser(undefined);
                navigate("/login")
                return;
            }
            //set user
            const userdata = JSON.parse(localStorage.getItem("data")).user;
            setUser(userdata);
            return true;
        } else {
            doLogout();
            return false;
        }

    }

    async function doLogout() {
        window.location.reload();
        localStorage.clear();
        console.log("Logged Out!!");
        setIsAuthenticated(false);
        setUser(undefined);
        // window.location.href("/")
    }

    return (
        <Context.Provider value={{ isAuthenticated, user, doLogin, doLogout }}>
            {children}
        </Context.Provider>
    );
}

// export const doLogin = (data, callback) => {
//     localStorage.setItem("data", JSON.stringify(data));
//     callback();
// }

// export const isLoggedIn = () => {
//     const data = localStorage.getItem("data");
//     if (data === null) {
//         return false;
//     }
//     else {
//         return true;
//     }
// }

// export const doLogout = (callback) => {
//     localStorage.removeItem("data")
//     callback();
// }

// export const getCurrentUserDetail = () => {
//     if (isLoggedIn()) {
//         return JSON.parse(localStorage.getItem("data")).user;
//     }
//     else {
//         return undefined;
//     }
// }
