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
  const [nextSpace, setNextSpace] = useState(null);
  const [autoCarPark, setAutoCarPark] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [manualSpaceId, setManualSpace] = useState(null);
  const [autoSpaceId, setAutoSpace] = useState(null);

  const updateFormData = (property, value) => {
    setFormData((prevState => ({
      ...prevState,
      [property]: value,
    })));
  };


  const fetchCarParks = () => {
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

  const deleteApprovedRequest = () => {
    fetch(`/api/bookingRequests/${requestedBooking.bookingRequestId}`, {
      method: 'DELETE',
    }).then((response) => {
  console.log(response)
}).catch((err) => {
  console.log(err)
});
  }

  const getAvailableSpaces = (formCarParkId) => {
    setLoading2(true);
    fetch('api/bookingRequests/findAllSpaces', {
      method: 'POST',
      body:JSON.stringify({startDate:requestedBooking.startDate,endDate:requestedBooking.endDate,carParkId:formCarParkId}),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      response.json().then((json) => {
        setSpaces(json);
        console.log(json)
        setLoading2(false);
      })
    });
  }

  function getNearestAvailableSpace(carParkId){
    fetch('/api/bookingRequests/findNextSpace',{
      method: 'POST',
      body:JSON.stringify({'startDate':requestedBooking.startDate,'endDate':requestedBooking.endDate,'carParkId':carParkId}),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      response.json().then((json) => {
       setNextSpace(json[0].spaceNo)
        setAutoSpace (json[0].spaceId)
        console.log(json[0])
      })
    });
  }

  //  Automatically Assign space
  const autoAssignParkingSpace = () =>{
    fetch('/api/carparks/findcarpark', {
      method: 'POST',
      body:JSON.stringify({'lng':requestedBooking.Building.gpsPoint.coordinates[0],'lat':requestedBooking.Building.gpsPoint.coordinates[1]}),
      headers:{
        "Content-Type": "application/json"
      }
    }).then((response) => {
      response.json().then((json) => {
        console.log(json)
        setAutoCarPark(json[0].name)
        getNearestAvailableSpace(json[0].carParkId)
      })
    });
  }

  const approveSpace = (spaceId) =>{
    fetch('/api/bookings', {
      method: 'PUT',
      body:JSON.stringify({
        userId:requestedBooking.userId,
        startDate:requestedBooking.startDate,
        endDate:requestedBooking.endDate,
        bookingType:'USER',
        'spaceId':spaceId,
        approved:true,
      }),
      headers:{
        "Content-Type": "application/json"
      }
    }).then((response) => {
      console.log(response)
      deleteApprovedRequest()

    }).catch((err) => {
      console.log(err)
    });
  }


  useEffect(() => {
    fetchCarParks();
  }, [])

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
                                <FormLabel htmlFor='carparkId'>Car Park</FormLabel>
                                <Select name="carparkId" id="carparkId" value={formData.carParkId} defaultValue={-1} onChange={(event) => {
                                  updateFormData('carparkId', event.target.value);
                                  getAvailableSpaces(event.target.value);
                                }}>
                                  <option disabled value={-1}>Choose a car park</option>
                                  {carparks.map((carpark) => (
                                    <option key={carpark.carParkId} value={carpark.carParkId} label={carpark.name} />
                                  ))}
                                </Select>
                              </FormControl>
                            </Stack>
                          </form>
                      )
                    }
                    {
                      loading2 ? (
                        <p> </p>
                      ) : (
                        <form onSubmit={processData}>
                          <Stack spacing='4'>
                            <FormControl>
                              <FormLabel htmlFor='spaceId'>Parking Space</FormLabel>
                              <Select name="spaceId" id="spaceId" value={formData.spaceId} onChange={(event) => {
                                setManualSpace(event.target.value)
                                updateFormData('spaceId', event.target.value)
                              }}>
                                <option disabled value={-1}>Choose a space</option>
                                {spaces.map((parkingSpace) => (
                                  <option key={parkingSpace.spaceNo} value={parkingSpace.spaceId} label={parkingSpace.spaceNo} />
                                ))}
                              </Select>
                            </FormControl>
                          </Stack>
                        </form>
                      )
                    }
                    </HStack>
                    <br/>
                    <Button w="100%" id="manualApprove" colorScheme='blue' mr={3} type="submit" onClick={() =>{
                      if(manualSpaceId=== null){
                        toast({title: "Please select a car park and spaceId"})
                      }else{
                        approveSpace(manualSpaceId)
                        onClose()
                      }
                    }}>
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
                          <Button  colorScheme="green" w="100%" onClick={() =>{autoAssignParkingSpace()}}>Assign Car Park and Space</Button>
                          <Text>The allocated car park is {autoCarPark} </Text>
                          <Text>The Allocated parking space is {nextSpace} </Text>
                        </VStack>
                      }
                    </HStack>
                    <br/>
                    <Button w="100%" id="autoApprove" colorScheme='blue' mr={3} type="submit" onClick={() => {
                      if(autoSpaceId=== null){
                        toast({title: "Please click assign car park and space first"})
                      }else{
                        approveSpace(autoSpaceId)
                        onClose()
                      }

                    }
                    }>
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