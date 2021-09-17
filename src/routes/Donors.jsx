import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { getDatabase, ref, set } from "firebase/database";
import { loginContext } from "../context/context";
import InputField from '../components/InputField';
import {
    validateUserName,
} from "../utils/utils";
// import Loader from '../components/Loader';
const Userdonor = () => {
    const location =  () =>{
        return new Promise((resolve, reject) => {
            window.navigator.geolocation.getCurrentPosition((geoLocation) => {
                console.log(geoLocation)
                  resolve(geoLocation)
               },(error) => {
                   reject(error)
               });

        })
        
    }
    const { login, user } = useContext(loginContext);
    console.log("user", user)

    function writeUserData(userId, userName, email, imageUrl) {
        const db = getDatabase();
        set(ref(db, 'users/' + userId), {
          username: userName,
          email: email,
          profile_picture : imageUrl
        });
      }
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!login || !user) {
            history.replace("login")
        }
    }, [login, user])


    const history = useHistory();
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("");
    const [donorData, setDonorData] = useState({
        name: '',
        email: user.mail,
        phone: "",
        bloodGroup: 'O',
    });

    const [errorTypeName, setErrorTypeName] = useState("");

    const change = (event) => {
        setMessage("")
        event.preventDefault();
        const { name, value } = event.target;
        setDonorData((preVal) => {
            return { ...preVal, [name]: value }
        })

    }


    // Save this as fetch.js --------------------------------------------------------------------------

    const click = async() => {

        try{
        const nameError = validateUserName(donorData.name);
       
        if (nameError !== "") {
            setErrorTypeName(nameError)

        }else {

            setErrorTypeName("");
            const geo = await  location();
            console.log({geo})
            writeUserData(user.id,{name : donorData.name, phone : donorData.phone, bloodGroup : donorData.bloodGroup, location : geo }, user.mail, "")
            
              setDonorData({
                name: '',
                email: user.mail,
                phone: '',
                bloodGroup: 'O',
              });

        }
    }catch(err){
        console.log(err)
    }
    }

    return <>

        <div className="w-40 box-shadow-ccc b-1-c9 p-4 m-3-auto d-flex flex-direction-column align-items-center">

            <span className={`${color} f-014 mb-2`}>{message}</span>
            <InputField type="text" onChange={change} error={errorTypeName} name='name' placeholder="Name" value={donorData.name} />
            <InputField type="email"  placeholder="Email" value={user.mail} disabled/>
            <InputField  type="number" onChange={change}  name='phone' value={donorData.phone} placeholder="phone" />
            
            <div className="w-100per mt-1 d-flex flex-direction-row j-content-spacearound" onChange={change}>
                <label> Blood group : </label>
                <div>
                <input className="cursor-pointer mt-06 mr-02" type="radio" value="O" name="bloodGroup" checked /> O
                </div>
                <div>
                <input className="cursor-pointer mt-06 mr-02" type="radio" value="A" name="bloodGroup" /> A
                </div>
                <div>
                <input className="cursor-pointer mt-06 mr-02" type="radio" value="B" name="bloodGroup" /> B
                </div>
                <div>
                <input className="cursor-pointer mt-06 mr-02" type="radio" value="AB" name="bloodGroup" /> AB
                </div>
                
            </div>

            <button onClick={() => { click() }} className="f-bold f-family-monospace f-017 bg-white outline-none b-none green mb-2 mt-2 cursor-pointer"> Submit</button>


        </div>



    </>
}
export default Userdonor;