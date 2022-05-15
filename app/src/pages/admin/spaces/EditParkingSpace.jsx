/* eslint react/prop-types: 0 */

import React, {useState, useCallback, useEffect} from 'react';
import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  VStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast, Select, Spinner,
} from '@chakra-ui/react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const EditParkingSpace = ({ parkingSpace, update }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [marker, setMarker] = useState({
    latitude: parkingSpace.gpsPoint.coordinates[1],
    longitude: parkingSpace.gpsPoint.coordinates[0],
  });
  const [formData, setFormData] = useState({
    spaceNo:parkingSpace.spaceNo,
    carParkId:parkingSpace.CarPark.carParkId,
    zoneId:parkingSpace.Zone.zoneId,
    latitude:parkingSpace.gpsPoint.coordinates[0],
    longitude:parkingSpace.gpsPoint.coordinates[1],

  });
  const [carparks, setCarParks] = useState(null);
  const [loading, setLoading] = useState(true);

  const toast = useToast({ status: 'error', isClosable: false });

  const updateFormData = (property, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [property]: value,
    }));
  };

  const fetchCarParks = () => {
    setLoading(true);
    fetch('/api/carparks/', {
      method: 'GET',
    }).then((response) => {
      response.json().then((json) => {
        console.log(json);
        setCarParks(json);
        setLoading(false);
      })
    });
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const { spaceNo, carParkId,zoneId, latitude, longitude } = formData;

    console.log()

    if (!spaceNo) {
      toast({ title: 'Please enter a space number for the parking space.' });
    } else if (!carParkId) {
      toast({ title: 'Please select a Car Park' });
    } else if (!longitude) {
      toast({
        title:
          'Please enter the longitude of the car park or select an appropriate pin location on the map.',
      });
    } else if (!latitude) {
      toast({
        title:
          'Please enter the latitude of the car park or select an appropriate pin location on the map.',
      });
    } else if (!zoneId) {
      toast({
        title:
            'Please enter the zoneId of the car park.',
      });
    }else {
      fetch(`/api/spaces/${parkingSpace.spaceId}`, {
        method: 'PUT',
        body: JSON.stringify({
          gpsPoint: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          spaceNo,
          carParkId,
          zoneId,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        if (response.status !== 200) {
          response.text().then((text) => {
            if (text === 'ERR_SPACE_EXISTS') {
              toast({ title: 'A SPACE with these parameters already exists.' });
            } else {
              toast({
                title:
                  'An unexpected error occurred whilst trying to modify the parkingspace.',
              });
            }
          });
        } else {
          onClose();
          update();
        }
      });
    }
  };

  const onMarkerDragEnd = useCallback((event) => {
    setMarker({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
    });

    updateFormData('longitude', event.lngLat.lng);
    updateFormData('latitude', event.lngLat.lat);
  }, []);

  useEffect(() => {
    fetchCarParks();
  }, [])

  return (
    <>
      <Button onClick={onOpen}>Edit</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {
            !carparks ? (
                <Spinner/>
            ) : (
                <form onSubmit={onSubmit}>
                  <ModalHeader>Edit Parking Space: {`${parkingSpace.spaceId}`}</ModalHeader>
                  <ModalCloseButton/>
                  <ModalBody>
                    <HStack>
                      <FormControl>
                        <FormLabel htmlFor="spaceNo">Space Number</FormLabel>
                        <Input
                            id="spaceNo"
                            autoComplete="off"
                            value={formData.spaceNo || ''}
                            onChange={(event) =>
                                updateFormData('spaceNo', event.target.value)
                            }
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel htmlFor='carPark'>Car Park</FormLabel>
                        <Select name="carPark" id="carPark" value={formData.carParkId} onChange={(event) => {
                          updateFormData("carParkId", event.target.value)
                        }}>
                          {carparks.map((carpark) => (
                              <option key={carpark.carParkId} value={carpark.carParkId} label={carpark.name}/>
                          ))}
                        </Select>
                      </FormControl>
                    </HStack>
                    <FormControl>
                      <FormLabel htmlFor='zone'>Zone</FormLabel>
                      <Select name="zone" id="zone" value={formData.zoneId} onChange={(event) => {
                        updateFormData("zoneId", event.target.value)
                      }}>
                        {carparks[formData.carParkId - 1].Zones.map((zone) => (
                            <option key={zone.zoneId} value={zone.zoneId} label={zone.name}/>
                        ))}
                      </Select>
                    </FormControl>
                    <HStack>
                      <FormControl>
                        <FormLabel htmlFor="latitude">Latitude</FormLabel>
                        <Input
                            id="latitude"
                            type="number"
                            autoComplete="off"
                            value={marker.latitude || ''}
                            onChange={(event) => {
                              updateFormData('latitude', event.target.value);
                              setMarker({
                                longitude: marker.longitude,
                                latitude: event.target.value
                              });
                            }}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel htmlFor="longitude">Longitude</FormLabel>
                        <Input
                            id="longitude"
                            type="number"
                            autoComplete="off"
                            value={marker.longitude || ''}
                            onChange={(event) => {
                              updateFormData('longitude', event.target.value);
                              setMarker({
                                longitude: event.target.value,
                                latitude: marker.latitude
                              });
                            }}
                        />
                      </FormControl>
                    </HStack>
                    <Flex height="30em" gap={4}>
                      <VStack
                          flex={1}
                          spacing={4}
                          borderWidth={1}
                          borderRadius="xl"
                          p={4}
                          align="start"
                      >
                        <Heading size="md">Space Map Location</Heading>
                        <Divider/>
                        <Map
                            mapboxAccessToken="pk.eyJ1IjoiYmVudG9tc2V0dCIsImEiOiJjazFxbDBpZTgwMmJkM21sZWZhY3VuZ2lkIn0.HxUAYfiWTsU-Abl0bm3aBg"
                            initialViewState={{
                              longitude: marker.longitude,
                              latitude: marker.latitude,
                              zoom: 14,
                            }}
                            style={{width: '100%', height: '100%'}}
                            mapStyle="mapbox://styles/mapbox/streets-v11"
                        >
                          <Marker
                              draggable="true"
                              longitude={marker.longitude}
                              latitude={marker.latitude}
                              onDragEnd={onMarkerDragEnd}
                          />
                        </Map>
                      </VStack>
                    </Flex>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} type="submit">
                      Update
                    </Button>
                  </ModalFooter>
                </form>
            )
          }
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditParkingSpace;
