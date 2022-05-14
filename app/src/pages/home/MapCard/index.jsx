import React from 'react';
import Map, { Marker } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import { Divider, Heading, VStack } from '@chakra-ui/react';

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
    <VStack
      flex={1}
      spacing={4}
      borderWidth={1}
      borderRadius="xl"
      p={4}
      align="start"
    >
      <Heading size="md">Nearby car parks</Heading>
      <Divider />
      <Map
        mapboxAccessToken="pk.eyJ1IjoiYmVudG9tc2V0dCIsImEiOiJjazFxbDBpZTgwMmJkM21sZWZhY3VuZ2lkIn0.HxUAYfiWTsU-Abl0bm3aBg"
        initialViewState={{
          longitude: 1.2431,
          latitude: 52.6235,
          zoom: 14
        }}
        style={{width: "100%", height: "100%"}}
        mapStyle="mapbox://styles/mapbox/streets-v11"

      >
        <Marker longitude={main.longitude} latitude={main.latitude}/>
        <Marker longitude={newSci.longitude} latitude={newSci.latitude}/>
        <Marker longitude={constable.longitude} latitude={constable.latitude}/>
      </Map>
    </VStack>
  );
}

export default MapCard;
