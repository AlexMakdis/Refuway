import { useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
export default function Map({longitude, latitude}) {
    const long= JSON.parse(longitude)
    const lat = JSON.parse(latitude)
  const [viewport, setViewport] = useState({
  width: "100%",
  height: "20rem",
  // The latitude and longitude of the center of London
  latitude: lat,
  longitude: long,
  zoom: 12
});
return <ReactMapGL
  mapStyle="mapbox://styles/mapbox/streets-v11"
  mapboxApiAccessToken="pk.eyJ1IjoiYWxleG1ha2RpcyIsImEiOiJjazNzb3F1N2QwNzNhM3BtY2ptbGJjOW92In0.znT94yBzAPQxiPHhy1LrFw"
  {...viewport}
  onViewportChange={(nextViewport) => setViewport(nextViewport)}
  >
      <Marker
      latitude={JSON.parse(latitude)}
      longitude={JSON.parse(longitude)}
      offsetLeft={-20}
      offsetTop={-10}>
        <span role="img" aria-label="push-pin">📌</span>
      </Marker>
</ReactMapGL>
}