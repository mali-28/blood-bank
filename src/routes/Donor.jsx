import { useState } from "react";
import { useContext,useEffect } from "react";
import { useParams, useHistory } from "react-router-dom"
import { loginContext } from "../context/context";

const Donor = () =>{
    const [data, setData] = useState([]);
    const {id}= useParams()
    const history = useHistory()
    const { login, user,showData } = useContext(loginContext);
    // let userData = Object.values(showData)
   let userData ;
   useEffect(()=>{ 
       setData(Object.values(showData)?.filter((val)=>{
           return val.userData.id === id
        }))},[])
    useEffect(() => {
        if (!login || !user) {
            history.replace("login")
        }
    }, [login, user])
    console.log("data", data)
    return <>
    <div>
        
    </div>
    </>
}

export default Donor