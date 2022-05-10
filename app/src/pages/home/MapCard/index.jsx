import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Stack,
} from '@chakra-ui/react';
import mapbox from 'mapbox-gl';

const MapCard = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35)
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    mapbox.accessToken = "pk.eyJ1IjoiYmVudG9tc2V0dCIsImEiOiJjazFxbDBpZTgwMmJkM21sZWZhY3VuZ2lkIn0.HxUAYfiWTsU-Abl0bm3aBg";

    if(!map.current){
      map.current = new mapbox.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom
      })
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box
      py={4}
      px={4}
      bg="bg-surface"
      borderRadius="xl"
      borderWidth={1}
    >
      <Stack spacing='4'>
        <div ref={mapContainer} className="map-container" />
      </Stack>
    </Box>
  );
}

export default MapCard;
