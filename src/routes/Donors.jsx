import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { getDatabase, ref, set,child, get } from "firebase/database";
import { loginContext } from "../context/context";
import InputField from '../components/InputField';
import {
    validateUserName,
} from "../utils/utils";
// import Loader from '../components/Loader';
const Userdonor = () => {
    const getlocation =  () =>{
        return new Promise((resolve, reject) => {
            window.navigator.geolocation.getCurrentPosition((geoLocation) => {
                console.log("geo",geoLocation.coords.latitude)
                  resolve({latitude : geoLocation.coords.latitude, longitude : geoLocation.coords.longitude})
               },(error) => {
                   reject(error)
               });

        })
        
    }
    const { login, user,showData,setShowData } = useContext(loginContext);
    console.log("user", user)

    function writeUserData(userId, data) {
        const db = getDatabase();
        console.log("db",db)
        set(ref(db, 'users/' + userId), {
          userData: data,
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

useEffect(()=>{
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users`)).then((snapshot) => {
      if (snapshot.exists()) {
        setShowData(snapshot.val())
        console.log("data" ,snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
},[])
    // Save this as fetch.js --------------------------------------------------------------------------

    const click = async() => {

        try{
        const nameError = validateUserName(donorData.name);
       
        if (nameError !== "") {
            setErrorTypeName(nameError)

        }else {

            setErrorTypeName("");
            const {latitude, longitude} = await getlocation();
            // console.log({geo})
            writeUserData(user.id,{id: user.id, name : donorData.name, email :  user.mail, phone : donorData.phone, bloodGroup : donorData.bloodGroup, longitude, latitude})
            
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

        <div>
            <table className="table">
                <thead>
                    <tr className="text-danger">
                        <td>name</td>
                        <td>email</td>
                        <td>BloodGroup</td>
                        <td>Latitude</td>
                        <td>Longitude</td>
                        <td>profile</td>
                    </tr>
                </thead>
                <tbody className="text-secondary">
                    {Object.values(showData)?.map(val => {
            console.log("val",val.userData.bloodGroup)
        return<>
            <tr key={val.userData.id}>
                <td>{val.userData.name}</td>
                <td> {val.userData.email}</td>
                <td>{val.userData.bloodGroup}</td>
                <td>{val.userData.latitude}</td>
                <td>{val.userData.longitude}</td>
                <td><NavLink to={`/donor/${val.userData.id}`}><button className="btn btn-danger">Donor </button></NavLink></td>

            </tr>
        </>
        })
         }
         </tbody>
         </table></div>



    </>
}
export default Userdonor;