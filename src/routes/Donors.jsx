import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { loginContext } from "../context/context";
import InputField from '../components/InputField';
import {
    validateEmail,
    validateUserName,
    validatePassword,
} from "../utils/utils";
// import Loader from '../components/Loader';
const UserSignUp = () => {
    const { login, user } = useContext(loginContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!login || !user) {
            history.replace("login")
        }
    }, [login, user])


    const history = useHistory();
    const [message, setMessage] = useState("");
    const [color, setColor] = useState("");
    const [signUpData, setSignUpData] = useState({
        name: '',
        email: user,
        password: '',
        gender: 'male',
    });

    const [errorTypeName, setErrorTypeName] = useState("");
    const [errorTypeMail, setErrorTypeMail] = useState("");
    const [errorTypePass, setErrorTypePass] = useState("");

    const change = (event) => {
        setMessage("")
        event.preventDefault();
        const { name, value } = event.target;
        setSignUpData((preVal) => {
            return { ...preVal, [name]: value }
        })

    }


    // Save this as fetch.js --------------------------------------------------------------------------

    const click = () => {
        const nameError = validateUserName(signUpData.name);
        const emailError = validateEmail(signUpData.email);
        const passError = validatePassword(signUpData.password);
        // console.log("error", error)
        if (nameError !== "") {
            setErrorTypeName(nameError)
            setErrorTypeMail("");
            setErrorTypePass("");

        } else if (emailError !== "") {
            setErrorTypeMail(emailError)
            setErrorTypeName("");
            setErrorTypePass("");

        } else if (passError !== "") {
            setErrorTypePass(passError);
            setErrorTypeName("");
            setErrorTypeMail("");


        } else {
            setLoading((pre) => !pre);

            setErrorTypeName("");
            setErrorTypeMail("");
            setErrorTypePass("");

            //   const url = 'https://bookofpositivity.herokuapp.com/auth/signup';
            //   fetch(url, {
            //     method: 'POST',
            //     body: JSON.stringify(signUpData),
            //     headers: {
            //       'Content-Type': 'application/json'
            //     }
            //   }).then(res => res.json())
            //     .then(response => setMessage(response.message))
            //     .catch(error => setMessage("someThing went wrong"), setColor("red"))
            //     .finally(()=>{
            //       setLoading((pre)=> !pre);

            //       setColor("success")
              setSignUpData({
                name: '',
                email: user,
                password: '',
                gender: 'male',
              });
            //   })


        }
    }

    return <>

        <div className="w-40 box-shadow-ccc b-1-c9 p-4 m-3-auto d-flex flex-direction-column align-items-center">

            <span className={`${color} f-014 mb-2`}>{message}</span>
            <InputField type="text" onChange={change} error={errorTypeName} name='name' placeholder="Name" value={signUpData.name} />
            <InputField type="email" onChange={change} error={errorTypeMail} name='email' placeholder="Email" value={user} disabled/>
            <InputField  type="password" onChange={change} error={errorTypePass} name='password' value={signUpData.password} placeholder="Password" />
            
            <div className="w-100per d-flex flex-direction-row j-content-spacearound" onChange={change}>
                <div>
                <input className="cursor-pointer mt-06 mr-02" type="radio" value="male" name="gender" checked/> Male
                </div>
                <div>
                <input className="cursor-pointer mt-06 mr-02" type="radio" value="female" name="gender" /> Female
                </div>
                <div>
                <input className="cursor-pointer mt-06 mr-02" type="radio" value="other" name="gender" /> Other
                </div>
            </div>

            <button onClick={() => { click() }} className="f-bold f-family-monospace f-017 bg-white outline-none b-none green mb-2 mt-2 cursor-pointer"> Submit</button>


        </div>



    </>
}
export default UserSignUp;