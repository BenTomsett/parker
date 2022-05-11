import React from 'react';
import Map, { Marker } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

const MapCard = () => {
  /*
  main (1.242931 52.623311)
  newsci (1.232728 52.622202)
  constable (1.235463 52.621316)
   */
  const main = {
    longitude: 1.242931,
    latitude: 52.623311,
  };
  const newSci = {
    longitude: 1.232728,
    latitude: 52.622202,
  };
  const constable = {
    longitude: 1.235463,
    latitude: 52.621316,
  }

  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoiYmVudG9tc2V0dCIsImEiOiJjazFxbDBpZTgwMmJkM21sZWZhY3VuZ2lkIn0.HxUAYfiWTsU-Abl0bm3aBg"
      initialViewState={{
        longitude: 1.2431,
        latitude: 52.6235,
        zoom: 14
      }}
      style={{width: 600, height: 400}}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      <Marker longitude={main.longitude} latitude={main.latitude}/>
      <Marker longitude={newSci.longitude} latitude={newSci.latitude}/>
      <Marker longitude={constable.longitude} latitude={constable.latitude}/>
    </Map>
  );
}

export default MapCard;
