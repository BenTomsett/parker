/* eslint react/prop-types: 0 */

import React, {useContext, useEffect, useState} from 'react';
import {
  Box,
  Button, Container, FormControl, FormLabel, Heading, HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, Select, Spinner, Stack, Text, useBreakpointValue, useDisclosure,
  useToast, VStack,
} from '@chakra-ui/react';
import UserContext from '../../../context/user';


const ApproveRequestedBooking = ({requestedBooking,update}) => {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const user = useContext(UserContext);
  const toast = useToast({status: 'error', isClosable: false});

  const [formData, setFormData] = useState({});
  const [carparks, setCarparks] = useState(null);
  const [spaces, setSpaces] = useState(null);


  const updateFormData = (property, value) => {
    setFormData((prevState => ({
      ...prevState,
      [property]: value,
    })));
  };

  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  const fetchCarPark = () => {
    setLoading(true);
    fetch('/api/carparks/', {
      method: 'GET',
    }).then((response) => {
      response.json().then((json) => {
        setCarparks(json);
        setLoading(false);
      })
    });
  }

  const fetchAvailableSpaces = () => {
    setLoading(true);
    fetch('/api/spaces/', {
      method: 'GET',
    }).then((response) => {
      response.json().then((json) => {
        setSpaces(json);
        console.log(json)
        setLoading2(false);
      })
    });
  }

  const [submitting, setSubmitting] = useState(false);

  const processData = (event) => {
    event.preventDefault();

    const {buildingId} = formData;
    const startDate = new Date(Date.parse(`${formData.startDate}T${formData.startTime}`));
    const endDate = new Date(Date.parse(`${formData.endDate}T${formData.endTime}`));

    if (startDate > endDate) {
      toast({title: "The start date must be before the end date"});
    }

    setSubmitting(true);
    fetch('/api/bookingRequests/', {
      method: 'PUT',
      body: JSON.stringify({
        userId: user.userId,
        buildingId,
        startDate,
        endDate,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      setSubmitting(false);
    }).catch((err) => {
      setSubmitting(false);
    });
  }

  useEffect(() => {
    fetchCarPark();
    fetchAvailableSpaces();
  }, [])

  return (
    <>
      <Button colorScheme='blue' onClick={onOpen}>Approve</Button>

      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>Approve Booking for with ID: {requestedBooking.bookingRequestId}</ModalHeader>
            <ModalCloseButton/>
            <ModalBody>

              <Container>
                <Stack>
                      <Heading size='md'>
                        Manually Approve booking
                      </Heading>
                  <Box
                    py={{base: '0', sm: '8'}}
                    px={{base: '4', sm: '10'}}
                    bg={useBreakpointValue({base: 'transparent', sm: 'bg-surface'})}
                    borderRadius={{base: 'none', sm: 'xl'}}
                    borderWidth={1}
                  >


                    <HStack>
                    {
                      // THIS IS FOR THE MANUAL BOOKING

                      loading ? (
                        <Spinner />
                        ) : (
                          <form onSubmit={processData}>
                            <Stack spacing='4'>
                              <FormControl>
                                <FormLabel htmlFor='carparkId'>Destination Building</FormLabel>
                                <Select name="carparkId" id="carparkId" value={formData.carParkId} onChange={(event) => {
                                  updateFormData('carparkId', event.target.value)
                                }}>
                                  {carparks.map((carpark) => (
                                    <option key={carpark.carParkId} value={carpark.name} label={carpark.name} />
                                  ))}
                                </Select>
                              </FormControl>
                            </Stack>
                          </form>
                          )
                    }
                    {
                      loading2 ? (
                        <Spinner />
                      ) : (
                        <form onSubmit={processData}>
                          <Stack spacing='4'>
                            <FormControl>
                              <FormLabel htmlFor='spaceId'>Parking Space</FormLabel>
                              <Select name="spaceId" id="spaceId" value={formData.spaceId} onChange={(event) => {
                                updateFormData('spaceId', event.target.value)
                              }}>
                                {spaces.map((parkingSpace) => (
                                  <option key={parkingSpace.spaceId} value={parkingSpace.spaceNo} label={parkingSpace.spaceNo} />
                                ))}
                              </Select>
                            </FormControl>
                          </Stack>
                        </form>
                      )
                    }
                    </HStack>
                    <br/>
                    <Button w="100%" colorScheme='blue' mr={3} type="submit">
                      {submitting ? (
                        <Spinner />
                      ) : "Approve Booking"}
                    </Button>

                  </Box>
                </Stack>
              </Container>

              <Container>
                <Stack>
                  <Heading size='md'>
                    Automatically Approve booking and assign a Parking Space
                  </Heading>
                  <Box
                    py={{base: '0', sm: '8'}}
                    px={{base: '4', sm: '10'}}
                    bg={useBreakpointValue({base: 'transparent', sm: 'bg-surface'})}
                    borderRadius={{base: 'none', sm: 'xl'}}
                    borderWidth={1}
                  >
                    <HStack>
                      {
                        // THIS IS FOR THE Automatic BOOKING
                        <VStack w="100%" align="left">
                          <Button colorScheme="green" w="100%">Assign Car Park and Space</Button>
                          <Text>The allocated car park is ENTER HERE </Text>
                          <Text>The Allocated parking space is </Text>
                        </VStack>
                      }
                    </HStack>
                    <br/>
                    <Button w="100%" colorScheme='blue' mr={3} type="submit">
                      {submitting ? (
                        <Spinner />
                      ) : "Approve Booking"}
                    </Button>

                  </Box>
                </Stack>
              </Container>

            </ModalBody>

            <ModalFooter>
              <br/>
            </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ApproveRequestedBooking;