import React, { useState, useEffect, useContext } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { getDatabase, ref, set } from "firebase/database";
import { loginContext } from "../context/context";
import InputField from '../components/InputField';
import DialogBox from "../components/DialogBox";

import {
    getLocalStorage,
    getlocation,
    validateUserName,
} from "../utils/utils";
// import Loader from '../components/Loader';
const Userdonor = () => {
    const { login, user, showData , removeItem,isDonor, setIsDonor} = useContext(loginContext);
    const {id} = getLocalStorage("__USER__")
    const history = useHistory();
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("");
    const [donorData, setDonorData] = useState({
        name: '',
        email: user.mail,
        phone: "",
        bloodGroup: 'O',
    });
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = React.useState(false);

    const handleDialog = () => {
        setOpen((prev)=> !prev);
      };

    console.log("inputfield", showData[id] || {}, "id",id)
    function writeUserData(userId, data) {
        const db = getDatabase();
        set(ref(db, 'users/' + userId), {
            userData: data,
        });
    }

    useEffect(() => {
        if (!login || !user) {
            history.replace("login")
        }
    }, [login, user])
    useEffect(()=>{
        if(showData[id]) {
            setIsDonor(true)
        }
    },[showData[id]])

    useEffect(() => {
        if (showData[id] && isDonor ) {
            const user = showData[id].userData;
            console.log("grouo",user.bloodGroup)
            setDonorData((pre)=>{
               return {...pre, name : user.name, phone : user.phone, bloodGroup : user.bloodGroup}
            })
        }else{
            setDonorData((pre)=>{
                return {...pre, name : "", phone : "", bloodGroup : "O"}
             })

        }
    }, [showData[id], removeItem])



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

    const click = async () => {

        try {
            const nameError = validateUserName(donorData.name);

            if (nameError !== "") {
                setErrorTypeName(nameError)

            } else {

                setErrorTypeName("");
                const { latitude, longitude } = await getlocation();
                writeUserData(user.id, { id: user.id, name: donorData.name, email: user.mail, phone: donorData.phone, bloodGroup: donorData.bloodGroup, longitude, latitude })

                

            }
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        console.log("objectshowData",[Object.values(showData)].length, Object.values(showData))
    }, showData)
    return <>

        <div className="w-40 box-shadow-ccc b-1-c9 p-4 m-3-auto d-flex flex-direction-column align-items-center">

            <span className={`${color} f-014 mb-2`}>{message}</span>
            <InputField type="text" onChange={change} error={errorTypeName} name='name' placeholder="Name" value={donorData.name} />
            <InputField type="email" placeholder="Email" value={user.mail} disabled />
            <InputField type="number" onChange={change} name='phone' value={donorData.phone} placeholder="phone" />

            <div className="w-100per mt-1 d-flex flex-direction-row j-content-spacearound" onChange={change}>
                <label> Blood group : </label>
                <div>
                    <label>
                    <input className="cursor-pointer mt-06 mr-02" type="radio" value="O" name="bloodGroup" checked={donorData.bloodGroup === "O"}/> O
                    </label>
                </div>
                <div>
                    <label>
                    <input className="cursor-pointer mt-06 mr-02" type="radio" value="A" name="bloodGroup" checked={donorData.bloodGroup === "A"}/> A
                    </label>
                </div>
                <div>
                    <label>
                    <input className="cursor-pointer mt-06 mr-02" type="radio" value="B" name="bloodGroup" checked={donorData.bloodGroup === "B"} /> B
                    </label>
                </div>
                <div>
                    <label>
                    <input className="cursor-pointer mt-06 mr-02" type="radio" value="AB" name="bloodGroup" checked={donorData.bloodGroup === "AB"} /> AB
                    </label>
                </div>

            </div>

            <button style={{outline: "none"}} onClick={() => {click()}} className="f-bold f-family-monospace f-017 bg-white outline-none b-none green mb-2 mt-2 cursor-pointer"> {isDonor ? "Update" : "New"}</button>


        </div>

        <div>
            {showData ? <div className="container scroll"> <table className="table table-b-ccc">
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
                        return <>
                            <tr key={val.userData.id}>
                                {(val.userData.id === id)? 
                                <td>{val.userData.name} (you)</td>:
                                <td>{val.userData.name}</td>}
                                
                                <td> {val.userData.email}</td>
                                <td>{val.userData.bloodGroup}</td>
                                <td>{val.userData.latitude}</td>
                                <td>{val.userData.longitude}</td>
                                {(val.userData.id === id)? 
                                <td><button onClick={()=>{handleDialog();
                                    //  removeItem(id)
                                    }} className="btn btn-info">Delete</button></td> :
                                <td><NavLink to={`/donor/${val.userData.id}`}><button className="btn btn-danger">Donor </button></NavLink></td>
                            }

                            </tr>
                        </>
                    })
                    }
                </tbody>
            </table> </div>: <p>No blood donor at this time</p>}</div>

            <DialogBox onClose={handleDialog} open={open} id={id}/>



    </>
}
export default Userdonor;