/* eslint react/prop-types: 0 */

import React, { useState, useCallback } from 'react';
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
  useToast,
} from '@chakra-ui/react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const EditCarpark = ({ carpark, update }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [marker, setMarker] = useState({
    latitude: carpark.gpsPoint.coordinates[1],
    longitude: carpark.gpsPoint.coordinates[0],
  });
  const [formData, setFormData] = useState({
    name: carpark.name,
    numOfSpaces: carpark.numOfSpaces,
    latitude: carpark.gpsPoint.coordinates[1],
    longitude: carpark.gpsPoint.coordinates[0],
  });

  const toast = useToast({ status: 'error', isClosable: false });

  const updateFormData = (property, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [property]: value,
    }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const { name, numOfSpaces, latitude, longitude } = formData;

    if (!name) {
      toast({ title: 'Please enter a name for the carpark.' });
    } else if (!numOfSpaces) {
      toast({ title: 'Please enter the amount of spaces the car park has.' });
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
    } else {
      fetch(`/api/carparks/${carpark.carParkId}`, {
        method: 'PUT',
        body: JSON.stringify({
          gpsPoint: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
          name,
          numOfSpaces,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        if (response.status !== 200) {
          response.text().then((text) => {
            if (text === 'ERR_CARPARK_EXISTS') {
              toast({ title: 'A carpark with that name already exists.' });
            } else {
              toast({
                title:
                  'An unexpected error occurred whilst trying to modify the carpark.',
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

  return (
    <>
      <Button onClick={onOpen}>Edit</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>Edit Carpark: {`${carpark.name}`}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <HStack>
                <FormControl>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    id="name"
                    autoComplete="off"
                    value={formData.name || ''}
                    onChange={(event) =>
                      updateFormData('name', event.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="numOfSpaces">Number of Spaces</FormLabel>
                  <Input
                    id="numOfSpaces"
                    type="number"
                    autoComplete="off"
                    value={formData.numOfSpaces || ''}
                    onChange={(event) =>
                      updateFormData('numOfSpaces', event.target.value)
                    }
                  />
                </FormControl>
              </HStack>
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
                  <Heading size="md">Carpark Map Location</Heading>
                  <Divider />
                  <Map
                    mapboxAccessToken="pk.eyJ1IjoiYmVudG9tc2V0dCIsImEiOiJjazFxbDBpZTgwMmJkM21sZWZhY3VuZ2lkIn0.HxUAYfiWTsU-Abl0bm3aBg"
                    initialViewState={{
                      longitude: marker.longitude,
                      latitude: marker.latitude,
                      zoom: 14,
                    }}
                    style={{ width: '100%', height: '100%' }}
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
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditCarpark;
