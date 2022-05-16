/* eslint react/prop-types: 0 */

import React, { useContext, useEffect, useState } from 'react';

import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';

import UserContext from '../../context/user';

const EditBookingModal = ({ booking, update }) => {
  function formatDate(date) {
    const day = date.getDate();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  const { userId } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [carParks, setCarParks] = useState();
  const [selectedCarPark, setSelectedCarPark] = useState();
  const [formData, setFormData] = useState({
    startDate: formatDate(new Date(booking.startDate)),
    startTime: new Date(booking.startDate).toLocaleTimeString('en', {
      timeStyle: 'short',
      hour12: false,
      timeZone: 'UTC',
    }),
    endDate: formatDate(new Date(booking.endDate)),
    endTime: new Date(booking.endDate).toLocaleTimeString('en', {
      timeStyle: 'short',
      hour12: false,
      timeZone: 'UTC',
    }),
    carParkId: booking.carParkId,
    spaceId: booking.spaceId,
  });

  const toast = useToast({ status: 'error', isClosable: false });

  const updateFormData = (property, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [property]: value,
    }));
  };

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
  const [selectedSpace, setSelectedSpace] = useState(booking.spaceId);
  const fetchSpaces = () => {
    fetch('/api/bookingRequests/findAllSpaces', {
      method: 'POST',
      body: JSON.stringify({
        startDate: formData.startDate,
        endDate: formData.endDate,
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

  const [submitting, setSubmitting] = useState(false);
  const EditBooking = (event) => {
    event.preventDefault();

    const startDate = new Date(
      Date.parse(`${formData.startDate}T${formData.startTime}`)
    );
    const endDate = new Date(
      Date.parse(`${formData.endDate}T${formData.endTime}`)
    );

    if (startDate > endDate || startDate.getTime() === endDate.getTime()) {
      toast({ title: 'The start date must be before the end date' });
    } else if (startDate < new Date()) {
      toast({ title: 'The start date must not be in the past' });
    } else if (
      !formData.startTime ||
      !formData.startDate ||
      !formData.endTime
    ) {
      toast({ title: 'Please fill out all fields' });
    } else {
      setSubmitting(true);
      fetch(`/api/bookings/${booking.bookingId}`, {
        method: 'PUT',
        body: JSON.stringify({
          userId,
          startDate,
          endDate,
          bookingType: 'RESTRICTION',
          spaceId: selectedSpace,
          approved: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(async () => {
        update();
        onClose();
        setSubmitting(false);
      });
    }
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
      <Button onClick={onOpen}>Edit</Button>

      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit booking</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Stack
                align={{ base: 'left', md: 'center' }}
                direction={{ base: 'column', md: 'row' }}
              >
                <FormControl>
                  <FormLabel htmlFor="startDate">Start date</FormLabel>
                  <Input
                    id="startDate"
                    type="date"
                    autoComplete="startDate"
                    value={formData.startDate || ''}
                    onChange={(event) =>
                      updateFormData('startDate', event.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="startTime">Start time</FormLabel>
                  <Select
                    name="startTime"
                    id="startTime"
                    value={formData.startTime}
                    defaultValue={-1}
                    onChange={(event) =>
                      updateFormData('startTime', event.target.value)
                    }
                  >
                    <option disabled value={-1}>
                      Choose start time
                    </option>
                    {[...Array(24)].map((value, index) => {
                      const hour = index.toLocaleString('en-GB', {
                        minimumIntegerDigits: 2,
                        useGrouping: false,
                      });
                      return (
                        <option
                          key={hour}
                          value={`${hour}:00`}
                        >{`${hour}:00`}</option>
                      );
                    })}
                  </Select>
                </FormControl>
              </Stack>

              <Stack
                align={{ base: 'left', md: 'center' }}
                direction={{ base: 'column', md: 'row' }}
              >
                <FormControl>
                  <FormLabel htmlFor="endDate">End date</FormLabel>
                  <Input
                    id="endDate"
                    type="date"
                    autoComplete="endDate"
                    value={formData.endDate || ''}
                    onChange={(event) =>
                      updateFormData('endDate', event.target.value)
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="endTime">End time</FormLabel>
                  <Select
                    name="endTime"
                    id="endTime"
                    value={formData.endTime}
                    defaultValue={-1}
                    onChange={(event) =>
                      updateFormData('endTime', event.target.value)
                    }
                  >
                    <option disabled value={-1}>
                      Choose end time
                    </option>
                    {[...Array(24)].map((value, index) => {
                      const hour = index.toLocaleString('en-GB', {
                        minimumIntegerDigits: 2,
                        useGrouping: false,
                      });
                      return (
                        <option
                          key={hour}
                          value={`${hour}:00`}
                        >{`${hour}:00`}</option>
                      );
                    })}
                  </Select>
                </FormControl>
              </Stack>

              <Stack>
                <FormControl>
                  <FormLabel htmlFor="carpark">Car park</FormLabel>
                  <Select
                    disabled={
                      !carParks ||
                      !formData.startDate ||
                      !formData.endDate ||
                      !formData.startTime ||
                      !formData.endTime
                    }
                    name="carpark"
                    id="carpark"
                    value={selectedCarPark}
                    onChange={(event) => {
                      setSelectedCarPark(event.target.value);
                    }}
                  >
                    {carParks &&
                      carParks.map((carPark) => (
                        <option
                          key={carPark.carParkId}
                          value={carPark.carParkId}
                          label={carPark.name}
                        />
                      ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor="space">Parking space</FormLabel>
                  <Select
                    disabled={!selectedCarPark || !spaces}
                    name="space"
                    id="space"
                    value={selectedSpace}
                    onChange={(event) => {
                      setSelectedSpace(event.target.value);
                    }}
                  >
                    {spaces &&
                      spaces.map((space) => (
                        <option
                          key={space.spaceId}
                          value={space.spaceId}
                          label={space.spaceNo}
                        />
                      ))}
                  </Select>
                </FormControl>
              </Stack>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <HStack justify="space-between" w="100%">
              <Button
                colorScheme="green"
                disabled={!selectedCarPark || !selectedSpace || submitting}
                onClick={EditBooking}
                w="100%"
              >
                {submitting ? <Spinner /> : 'Save'}
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditBookingModal;
