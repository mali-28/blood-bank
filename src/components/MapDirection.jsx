import React, { Component } from "react";
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    DirectionsRenderer
} from "react-google-maps";

class MapDirection extends Component {
    state = {
        directions: null,


};


componentDidMount() {
    const directionsService = new window.google.maps.DirectionsService();

    const origin = { lat: 22.5244, lng:  3.3792 };
    const destination = { lat: 64.667, lng:  3.4500};

    directionsService.route(
        {
            origin: origin,
            destination: destination,
            travelMode: window.google.maps.TravelMode.DRIVING,
            waypoints: [
                {
                    location: new window.google.maps.LatLng(24.698,  66.852)
                },
                {
                    location: new window.google.maps.LatLng(23.018,3.3515)
                }
            ]
        },
        (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
                console.log(result)
                this.setState({
                    directions: result
                });
            } else {
                console.error(`error fetching directions ${result}`);
            }
        }
    );
}

render() {
    const GoogleMapExample = withGoogleMap(props => (
        <GoogleMap
            defaultCenter={{ lat: 6.5244, lng:  3.3792 }}
            defaultZoom={13}
        >
            <DirectionsRenderer
                directions={this.state.directions}
            />
        </GoogleMap>
    ));

    return (
        <div>
            <GoogleMapExample
                containerElement={<div style={{ height: `500px`, width: "500px" }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>


       );
    }
}

export default MapDirection;