import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { loginContext } from "../context/context";
import InputField from '../components/InputField';
import {
  getLocalStorage,
  setLocalStorage,
  validateEmail,
  validatePassword,
} from "../utils/utils";
import Loader from '../components/Loader';
const UserSignUp = () => {
  const { login, setLogin, user,setUser } = useContext(loginContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (login && user) {
      history.replace("/")
    }
  }, [login, user])


  const history = useHistory();
  const [message, setMessage] = useState("");
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
  });

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
    const emailError = validateEmail(signUpData.email);
    const passError = validatePassword(signUpData.password);

    if (emailError !== "") {
      setErrorTypeMail(emailError);
      setErrorTypePass("");

    } else if (passError !== "") {
      setErrorTypePass(passError);
      setErrorTypeMail("");


    } else {
      setLoading((pre) => !pre);

      setErrorTypeMail("");
      setErrorTypePass("");

      const auth = getAuth();
      createUserWithEmailAndPassword(auth, signUpData.email, signUpData.password)
        .then((res) => {
          // Signed in 
          if (res?.user) {
            setLocalStorage("__USER__", {mail : res.user.email, id : res.user.uid})
            setUser(getLocalStorage("__USER__"))
            setLocalStorage('Islogin', res.user.accessToken);
            setLogin(getLocalStorage("Islogin"))
            setSignUpData({
                email: '',
                password: '',
            })
            
            history.push('/')

          }
        })
        .catch((error) => {
          const errorCode = error.code;
          setMessage(errorCode);
        })
        .finally(() => {
          setLoading((pre) => !pre);

        })

    }
  }
  function back() {
    history.goBack()
  }


  return <>

    <div className="w-40 box-shadow-ccc b-1-c9  p-4 m-3-auto d-flex flex-direction-column align-items-center">

      {loading ? <Loader /> : <><span className="red f-014 mb-2">{message}</span>
        <InputField type="email" onChange={change} error={errorTypeMail} name='email' placeholder="Email" value={signUpData.email} />
        <InputField type="password" onChange={change} error={errorTypePass} name='password' value={signUpData.password} placeholder="Password" />

        <button
          onClick={() => { click() }}
          className="f-bold f-family-monospace f-017 bg-white outline-none b-none green mb-2 mt-2 cursor-pointer"> Submit</button>
        <button onClick={() => back()} className="f-bold f-family-monospace f-017 bg-white  b-none brown cursor-pointer"> Back To Login </button></>}


    </div>



  </>
}
export default UserSignUp;