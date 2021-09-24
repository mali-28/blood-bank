import { getDatabase, ref, child, get } from "firebase/database";
import React, { createContext, useEffect, useState } from "react";
import {getLocalStorage, } from "../utils/utils";

const loginContext = createContext({
    login: "",
    user: "",
    showData: "",
    userLocation : "",
    setLogin: () => { },
    setUser: () => { },
    setShowData: () => { },
    setUserLocation : () =>{},
});

const Context = (props) => {


    const [login, setLogin] = useState(getLocalStorage("Islogin"));
    const [user, setUser] = useState(getLocalStorage("__USER__") || {});
    const [userLocation, setUserLocation] = useState(getLocalStorage("location") || [])
    const [showData, setShowData] = useState({});


    useEffect(() => {

        const token = getLocalStorage("Islogin");

        setLogin(token);

    }, [])

useEffect(()=>{
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users`)).then((snapshot) => {
        if (snapshot.exists()) {
            // console.log("data" ,snapshot.val());
            setShowData(snapshot.val())
        } else {
            setShowData({})
            console.log("No data available");

        }
    }).catch((error) => {
        console.error(error);
    })
}, [])


return <>
    <loginContext.Provider value={{ login, setLogin, user, setUser, showData, setShowData,userLocation, setUserLocation }}>
        {props.children}
    </loginContext.Provider></>

}

export default Context;
export { loginContext };