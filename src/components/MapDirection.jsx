import React, { useEffect } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';
import { useContext } from "react";
import { useHistory} from "react-router-dom";
import { loginContext } from "../context/context";

 
export const MapContainer = (props)=>{

    const {login, user, userLocation } = useContext(loginContext);
    const history = useHistory();
    
    useEffect(() => {
      if (!login || !user) {
          history.replace("login")
      }
  }, [login, user])
    return (
      <>
      <button onClick={()=>{history.goBack()}} className="btn btn-info">Go Back</button>
        <Map google={props.google}
        style={{width: '100%', height: '100%', position: 'relative'}}
        className={'map'}
        initialCenter={{
            lat: userLocation.lat1,
            lng: userLocation.long1
          }}
        zoom={18}>
      <Marker
        title={'Your Location'}
        position={{lat: userLocation.lat1, lng: userLocation.long1}} />
      <Marker
      title={"Destination"}
        position={{lat: userLocation.lat2, lng: userLocation.long2}} 
        />
    </Map>
    </>
    );
  
}
 
export default GoogleApiWrapper({
  apiKey: "AIzaSyCXAeItiCHU5NHOzgn9GyO4fRHiqK7tnUs"
})(MapContainer)