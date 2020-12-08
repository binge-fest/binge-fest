import { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api";

import mapStyles from '../../mapStyles';

const libraries = ["places"];
const mapContainerStyle = {
  height: "100%",
  width: "100%"
}
const center = {
  lat: 43.653225,
  lng: -79.383186
}
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true
}

const Map = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBfwMS0eamgOLogYGDPaNVMk7ZivEWhWlA",
    libraries
  })

  const [marker, setMarker] = useState(null);
  const [yelpMarkers, setYelpMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

  // the below function is to prevent rerenders
  const onMapClick = useCallback((event) => {
    setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    })
  }, [])

  // using these two we can reference the map without causing any rerenders
  // when using state it rerenders the component, BUT, if we're using useRef then we can still use state without having the component rerender
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, [])

  if (loadError) return "Error";
  if (!isLoaded) return "Loading map...";

  const handleClick = () => {
    console.log(marker);
    if (marker) {
      const apiKey = "_ySZyzuihg1O-lyVqCt2-yZN4fuew1KxFLk_27F9XwOYREu5e5Q_mzxfbqBOsAWioxGNmcPeZfUsspraBGysxtP66PZ7KRsC62o6oElSq4iWivyUP4zpB4IizQnLX3Yx";
      axios({
        url: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search',
        method: 'GET',
        responseType: 'json',
        headers: {
          Authorization: `Bearer ${apiKey}`
        },
        params: {
          term: 'food',
          latitude: marker.lat,
          longitude: marker.lng
        }
      }).then(res => {
        console.log(res);
        setYelpMarkers(res.data.businesses)
      })
    }
  }

  return (
    <div className="mapContainer">
      <h2 class="mapTitle">Binge Fest</h2>
      <GoogleMap
        className="googleMap"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {marker &&
          <Marker
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        }
        {yelpMarkers !== []
          ? yelpMarkers.map(business => {
            console.log(business.coordinates.latitude, business.coordinates.longitude);
            return (
            <Marker 
              key={business.id}
              position={{ lat: business.coordinates.latitude, lng: business.coordinates.longitude }}
              icon={{
                url: "./food.png",
                scaledSize: new window.google.maps.Size(30, 30),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15)
              }}  
              onClick={() => {
                setSelected(business);
              }}
            />)
          })
          : null
        }
        {selected ? (
          <InfoWindow 
            position={{ lat: selected.coordinates.latitude, lng: selected.coordinates.longitude }} 
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div className="infoWindow">
              <h2>{selected.name}</h2>
              <p>{selected.phone}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      <button onClick={handleClick}>Get Restaurants</button>
    </div>
  );
}

export default Map;