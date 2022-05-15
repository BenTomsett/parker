/* eslint react/prop-types: 0 */

import React, { useEffect, useState } from 'react';
import {
  Button, FormControl, FormLabel, HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, Select, Spinner, Stack, useDisclosure,
} from '@chakra-ui/react';

const ApproveRequestModal = ({ request, update }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [carParks, setCarParks] = useState();
  const [selectedCarPark, setSelectedCarPark] = useState();
  const fetchCarParks = () => {
    fetch('/api/carparks/', {
      method: 'GET',
    }).then((response) => {
      response.json().then((json) => {
        setCarParks(json);
      });
    });
  };

  const [spaces, setSpaces] = useState();
  const [selectedSpace, setSelectedSpace] = useState();
  const fetchSpaces = () => {
    fetch('/api/bookingRequests/findAllSpaces', {
      method: 'POST',
      body: JSON.stringify({
        startDate: request.startDate,
        endDate: request.endDate,
        carParkId: selectedCarPark,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      response.json().then((json) => {
        setSpaces(json);
      });
    });
  };

  const autoAssign = () => {
    fetch('/api/bookingRequests/autoAssign', {
      method: 'POST',
      body: JSON.stringify({
        startDate: request.startDate,
        endDate: request.endDate,
        carParkId: selectedCarPark,
        lng: request.Building.gpsPoint.coordinates[0],
        lat: request.Building.gpsPoint.coordinates[1],
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      response.json().then((json) => {
        setSelectedCarPark(json.carParkId);
        setSelectedSpace(json.spaceId);
      });
    });
  };

  const deleteRequest = async () => fetch(`/api/bookingRequests/${request.bookingRequestId}`, {
      method: 'DELETE',
    })

  const [submitting, setSubmitting] = useState(false);
  const approve = () => {
    setSubmitting(true);
    fetch('/api/bookings', {
      method: 'PUT',
      body: JSON.stringify({
        userId: request.userId,
        startDate: request.startDate,
        endDate: request.endDate,
        bookingType: 'USER',
        spaceId: selectedSpace,
        approved: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (response) => {
      await deleteRequest();
      update();
      setSubmitting(false);
    });
  };

  useEffect(() => {
    if (isOpen) {
      fetchCarParks();
    }
  }, [isOpen]);

  useEffect(() => {
    if (selectedCarPark) {
      setSpaces(undefined);
      fetchSpaces();
    }
  }, [selectedCarPark]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Button colorScheme='blue' onClick={onOpen}>Approve</Button>

      <Modal size='xl' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Approve booking request</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <FormControl>
                <FormLabel htmlFor='carpark'>Car park</FormLabel>
                <Select disabled={!carParks} name='carpark' id='carpark'
                        value={selectedCarPark}
                        defaultValue={-1} onChange={(event) => {
                  setSelectedCarPark(event.target.value);
                }}>
                  <option disabled value={-1}>Choose a car park</option>

                  {carParks && carParks.map((carPark) => (
                    <option key={carPark.carParkId} value={carPark.carParkId}
                            label={carPark.name} />
                  ))}

                </Select>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='space'>Parking space</FormLabel>
                <Select disabled={!selectedCarPark || !spaces} name='space'
                        id='space' value={selectedSpace}
                        defaultValue={-1} onChange={(event) => {
                  setSelectedSpace(event.target.value);
                }}>
                  <option disabled value={-1}>Choose a parking space</option>

                  {spaces && spaces.map((space) => (
                    <option key={space.spaceId} value={space.spaceId}
                            label={space.spaceNo} />
                  ))}

                </Select>
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <HStack justify='space-between' w='100%'>
              <Button onClick={autoAssign}>Auto assign</Button>
              <Button colorScheme='green'
                      disabled={!selectedCarPark || !selectedSpace || submitting}
                      onClick={approve}>
                {
                  submitting ? (
                    <Spinner />
                  ) : "Approve"
                }
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ApproveRequestModal;