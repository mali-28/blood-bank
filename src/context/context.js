import React, { createContext,useEffect,useState } from "react";
import { getLocalStorage } from "../utils/utils";

const loginContext = createContext(false);

const Context = (props) =>{
    
    
    const [login, setLogin] = useState(getLocalStorage("Islogin"));
    const [user, setUser] = useState(getLocalStorage("__USER__") || {});
    

    useEffect(()=>{
        
        const token = getLocalStorage("Islogin");
        
        setLogin(token);
        
    },)


return<>
<loginContext.Provider value={{login,setLogin,user, setUser}}>
    {props.children}
</loginContext.Provider></>

}

export default Context;
export {loginContext};