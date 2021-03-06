// https://www.youtube.com/watch?v=WZcxJGmLbSo
// the above video was vital in creating this!! big credits to Leigh Halliday
import { useState, useCallback, useRef } from "react";
import axios from "axios";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
// highly recommend checking out https://snazzymaps.com/, this is where we styled our map
import mapStyles from "../../mapStyles";

// places are for autocompletion
const libraries = ["places"];
// bunch of different settings defined outside so that they never cause rerenders
const mapContainerStyle = {
  height: "100%",
  width: "100%",
};
const center = {
  lat: 43.653225,
  lng: -79.383186,
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = ({ showRestaurants, showResults }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBfwMS0eamgOLogYGDPaNVMk7ZivEWhWlA",
    libraries,
  });

  // some basic state
  const [marker, setMarker] = useState(null);
  const [yelpMarkers, setYelpMarkers] = useState([]);
  const [selected, setSelected] = useState(null);

  // the below function is to prevent unnecessary rerenders
  const onMapClick = useCallback((event) => {
    setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  }, []);

  // using these two we can reference the map without causing any rerenders
  // when using state it rerenders the component, BUT, if we're using useRef then we can still use state without having the component rerender
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // function to pan to a determined location with a certain amount of zoom
  const panTo = useCallback((lat, lng, zoom) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(zoom);
  }, []);

  // if map has issues
  if (loadError) return "Error";
  if (!isLoaded) return "Loading map...";

  // function to get data back from yelp and display on map & display results
  const callYelp = () => {
    if (!marker) {
      alert('Please select a location');
      return;
    }
    panTo(marker.lat, marker.lng, 14)
    if (marker) {
      const apiKey =
        "_ySZyzuihg1O-lyVqCt2-yZN4fuew1KxFLk_27F9XwOYREu5e5Q_mzxfbqBOsAWioxGNmcPeZfUsspraBGysxtP66PZ7KRsC62o6oElSq4iWivyUP4zpB4IizQnLX3Yx";
      axios({
        url:
          "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search",
        method: "GET",
        responseType: "json",
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
        params: {
          term: "food",
          latitude: marker.lat,
          longitude: marker.lng,
        },
      }).then((res) => {     
        showRestaurants(res.data.businesses);
        setYelpMarkers(res.data.businesses);
      });
    }
  };

  return (
    // showResults variable changes the position of the map so that it can fit the results on the side, it is a boolean passed from props
    <div className={`mapContainer ${showResults}`}>
      <h2 className="mapTitle">BF</h2>

      <Search panTo={panTo} setMarker={setMarker} />

      <GoogleMap
        className="googleMap"
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {marker && <Marker position={{ lat: marker.lat, lng: marker.lng }} />}
        {/* display markers once user selects location */}
        {yelpMarkers !== []
          ? yelpMarkers.map((business) => {
              return (
                <Marker
                  key={business.id}
                  position={{
                    lat: business.coordinates.latitude,
                    lng: business.coordinates.longitude,
                  }}
                  // icon has some weird stuff on it, just used to position it perfectly on the location
                  icon={{
                    url: "./restaurant.svg",
                    scaledSize: new window.google.maps.Size(30, 30),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(15, 15),
                  }}
                  // selected state is the InfoWindow seen a couple lines below
                  onClick={() => {
                    setSelected(business);
                  }}
                />
              );
            })
          : null}
        {selected ? (
          <InfoWindow
            position={{
              lat: selected.coordinates.latitude,
              lng: selected.coordinates.longitude,
            }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div className="infoWindow">
              <h3>{selected.name}</h3>
              <p>{selected.phone}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
      <button className="buttons dark" onClick={callYelp}>Get Restaurants</button>
    </div>
  );
};

export default Map;

// search functionality
const Search = ({ panTo, setMarker }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: {
        lat: () => 43.653225,
        lng: () => -79.383186,
      },
      radius: 100 * 1000,
    },
  });

  return (
    <div className="search">
      {/* combobox that holds the user's input and the drop down for possible location matches */}
      <Combobox
        onSelect={async (address) => {
          // second argument is a function called shouldFetchData, we don't need it because we already know what the user has selected
          setValue(address, false);
          clearSuggestions();

          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo(lat, lng , 12);
            setMarker({
              lat: lat,
              lng: lng,
            });
          } catch (error) {
            console.log("error!", error);
          }
        }}
      >
        <ComboboxInput
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Enter an address"
          className="comboInput"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => {
                return <ComboboxOption key={id} value={description} />;
              })}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};
