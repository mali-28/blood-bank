import { useState, useContext, useEffect  } from "react";
import { useParams, useHistory } from "react-router-dom"
import { loginContext } from "../context/context";
import { getLocalStorage, getlocation, setLocalStorage } from "../utils/utils";

const Donor = () => {
    const { id } = useParams();
    const history = useHistory();
    const { login, user, showData, setUserLocation } = useContext(loginContext);
    const [data, setData] = useState([]);

    useEffect(() => {

        if (showData) {
            const userData = Object.values(showData)?.filter((val) => {
                return val.userData.id === id
            })
            setData(userData[0]?.userData)
        }

    }, [showData])
const click = async () =>{
    const {latitude, longitude} = await getlocation();
    console.log("lati",latitude, "long", longitude, "datalat", data.latitude, "datalong", data.longitude)
    setLocalStorage("location",{lat1 : latitude, long1 : longitude, lat2 : data.latitude, long2: data.longitude})
    setUserLocation(getLocalStorage("location"));
    history.push("./../map")
}

const goBack = () =>{
    history.goBack()
}
    useEffect(() => {
        if (!login || !user) {
            history.replace("login")
        }
    }, [login, user])


    return <>
        <div style={{height : "90vh",display: "flex", justifyContent: "center", alignItems:"center", }}>
            {data ? <><div style={{display : "flex",justifyContent: "center", alignItems: "center",width: 500, minHeight: 300, borderRadius: 30, overflow : "hidden", padding: 20}}>
                 <div style={{textTransform : "capitalize"}}>
                     <table className="table table-b-red">
                         <tr className="">
                             <td>name</td>
                             <td>{data.name}</td>
                         </tr>
                         <tr>
                             <td>email</td>
                             <td>{data.email}</td>
                         </tr>
                         <tr>
                             <td>phone</td>
                             <td>{data.phone}</td>
                         </tr>
                         <tr>
                             <td>Blood-group</td>
                             <td>{data.bloodGroup}</td>
                         </tr>
                         <tr>
                             <td>longitude</td>
                             <td>{data.longitude}</td>
                         </tr>
                         <tr>
                             <td>latitude</td>
                             <td>{data.latitude}</td>
                         </tr>
                         <tr>
                         <td>
                             <button className="btn btn-info" onClick={()=>{goBack()}}>Go back</button>
                             </td>
                             <td>
                             <button className="btn btn-danger" onClick={()=>{click()}}>Go to map</button>
                             </td>
                         </tr>
                     </table>
                     
                 </div>
                 
                 <div>
                    
                 </div>
                </div></> : null}
        </div>
    </>
}

export default Donor