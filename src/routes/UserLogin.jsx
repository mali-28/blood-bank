import React, { useState, useContext, useEffect } from "react";
import { NavLink,useHistory  } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getLocalStorage, setLocalStorage } from "../utils/utils";
import Loader from "../components/Loader";
import { loginContext } from "../context/context";

const UserLogin = () => {
    const [loading, setLoading] = useState(false);
    const { login, setLogin,user, setUser } = useContext(loginContext);

    const [message, setMessage] = useState("");
    const history = useHistory();

    let [inputData, setInputData] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (login && user) {
            history.replace("/")
        }
    }, [login,user])

    const change = (event) => {
        setMessage("")
        event.preventDefault();
        let { name, value } = event.target;
        setInputData((preVal) => {
            return { ...preVal, [name]: value }
        })

    }

    const click = () => {
        setLoading((pre) => !pre);

        // firebase api fetching

        const auth = getAuth();
        signInWithEmailAndPassword(auth, inputData.email, inputData.password)
            .then((res) => {
                if (res?.user) {
                    setLocalStorage("__USER__", {mail : res.user.email, id : res.user.uid})
                    setUser(getLocalStorage("__USER__"))
                    setLocalStorage('Islogin', res.user.accessToken);
                    setLogin(getLocalStorage("Islogin"))
                    setInputData({
                        email: '',
                        password: '',
                    })
                    history.push('/')

                }
            })
            .catch((error) => {
                const errorCode = error.code;
                setMessage(errorCode)

            })
            .finally(() => {
                setLoading(pre => !pre)
            })   
    }

    return <>


        <div className="w-40 box-shadow-ccc b-1-c9 p-4 m-3-auto d-flex flex-direction-column align-items-center">

            {loading ?
                <Loader /> : <><span className="f-014 mb-2 red">{message}</span>
                    <input type="email" onChange={change} name='email' className="input f-014 mb-2  f-family-monospace" value={inputData.email} placeholder="E-mail-Address" />
                    <input type='password' onChange={change} name='password' className="input f-014 mb-2 f-family-monospace" value={inputData.password} placeholder="Password" />
                    <button
                        style={{ cursor: (!inputData.email || !inputData.password) ? "not-allowed" : "pointer" }}
                        onClick={() => { click() }}
                        className="f-bold f-family-monospace f-017 bg-white outline-none b-none green mb-2 " disabled={!inputData.email || !inputData.password}> Submit</button>
                    <NavLink to='/signup' className="f-bold f-family-monospace nav-link  bg-white outline-none b-none brown"> Register</NavLink></>}

        </div>


    </>
}
export default UserLogin;