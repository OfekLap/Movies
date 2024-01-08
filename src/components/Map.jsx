import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import { useGeolocation } from "../hooks/useGeolocation";
import { useState } from "react";
import { useEffect } from "react";
import urlPosition from "../hooks/urlPosition";
import tvdb from "../hooks/tvdb";

function Map({ setArr }) {
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(
    function () {
      if (geolocationPosition) {
        setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
      }
    },
    [geolocationPosition]
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await urlPosition(mapPosition);
        const results = await tvdb(data.countryCode);
        setArr(results);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, [mapPosition]);

  function DetectClick() {
    useMapEvents({
      click: (e) => {
        setMapPosition([e.latlng.lat, e.latlng.lng]);
      },
    });
  }
  function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
  }
  return (
    <div className="relative">
      {!geolocationPosition && (
        <button
          onClick={() => {
            getPosition();
          }}
          className="text-stone-700 bg-green-500 rounded-md z-50
              p-1 shadow ml-80 mt-[450px] absolute"
        >
          {isLoadingPosition ? "LOADING..." : "USE YOUR POSITION"}
        </button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className=" h-[500px] w-[800px] relative z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

export default Map;
