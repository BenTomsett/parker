/* import {emailRegex, getAge, strongPassRegex} from "../../../utils/auth"; */

import React, {useEffect, useState} from 'react';
import {
  Box,
  Button, Container,
  Divider,
  FormControl, FormLabel,
  Heading,
  HStack, Input, Select,
  Stack,
  useBreakpointValue, useToast
} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';

import Building from "../../../components/bookings/Building";
//  import CarPark from "../../../components/bookings/CarPark";

const NewBooking = () => {

  const navigate = useNavigate();

  const toast = useToast({status: 'error', isClosable: false});

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const [buildings, setBuildings] = useState(null);
  const [carParkingSpaces, setCarParkingSpace] = useState(null);


  const updateFormData = (property, value) => {
    setFormData((prevState => ({
      ...prevState,
      [property]: value,
    })));
  };

  const fetchBuildings = () => {
    fetch('/api/buildings/', {
      method: 'GET',
    }).then((response) => {
      response.json().then((json) => {
        console.log(json);
        setBuildings(json);
      })
    });
  }


  const processData = (event) => {
    event.preventDefault();

    const startDatetime = new Date(Date.parse(`${formData.startDate}T${formData.startTime}`));
    const endDatetime = new Date(Date.parse(`${formData.endDate}T${formData.endTime}`));

    if(startDatetime > endDatetime){
      toast({title: "The start date must be before the end date"});
    }


    /*

    fetch('/api/bookingrequests/', {
      method: 'PUT',
    }).then((response) => {
      response.json().then((json) => {
        // console.log(json);
        setBuildings(json);
      })
    });


     */

  }

  useEffect(() => {
    fetchBuildings();
  }, [])

  return (
    <div>
      <Heading size="xl">Request a new Booking</Heading>
      <br/>

      <Heading size="md">Fill out the below to request a new booking </Heading>
      <br/>

      <Container maxW='xl' py={{base: '12', md: '24'}}
                 px={{base: '0', sm: '8'}}>
        <Stack spacing='8' w='100%'>
          <Stack spacing='6'>
            <Stack spacing={{base: '2', md: '3'}} textAlign='center'>
              <Heading size='md'>
                Request New Booking
              </Heading>
            </Stack>
          </Stack>
          <Box
            py={{base: '0', sm: '8'}}
            px={{base: '4', sm: '10'}}
            bg={useBreakpointValue({base: 'transparent', sm: 'bg-surface'})}
            borderRadius={{base: 'none', sm: 'xl'}}
            borderWidth={1}
          >
            <form onSubmit={processData}>
              <Stack spacing='4'>
                <Divider/>
                <FormControl>
                  <FormLabel htmlFor='Car Park'>Destination Building</FormLabel>
                  {
                    buildings ?
                      (
                        <Select name="carParkName" id="carParkName" value={formData.startTime || ''}
                                onChange={(event) => updateFormData('carParkName', event.target.value)}>
                          {
                            buildings.map((building) => (
                              <Building key={building.buildingId} building={building}/>
                            ))
                          }
                        </Select>
                      ) : (<p>Buildings found</p>)
                  }
                </FormControl>

                <HStack>
                  <FormControl>
                    <FormLabel htmlFor='startDate'>Start Date</FormLabel>
                    <Input id='startDate' type='date'
                           autoComplete='startDate'
                           value={formData.startDate || ''}
                           onChange={(event) => updateFormData('startDate',
                             event.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor='startTime'>Start Time</FormLabel>
                    <Select name="startTime" id="startTime" value={formData.startTime || ''}
                            onChange={(event) => updateFormData('startTime', event.target.value)}>
                      <option value="00:00">00:00</option>
                      <option value="01:00">01:00</option>
                      <option value="02:00">02:00</option>
                      <option value="03:00">03:00</option>
                      <option value="04:00">04:00</option>
                      <option value="05:00">05:00</option>
                      <option value="06:00">06:00</option>
                      <option value="07:00">07:00</option>
                      <option value="08:00">08:00</option>
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="12:00">12:00</option>
                      <option value="13:00">13:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                      <option value="17:00">17:00</option>
                      <option value="18:00">18:00</option>
                      <option value="19:00">19:00</option>
                      <option value="20:00">20:00</option>
                      <option value="21:00">21:00</option>
                      <option value="22:00">22:00</option>
                      <option value="23:00">23:00</option>
                    </Select>
                  </FormControl>
                </HStack>

                <HStack>
                  <FormControl>
                    <FormLabel htmlFor='endDate'>End Date</FormLabel>
                    <Input id='endDate' type='date'
                           autoComplete='endDate'
                           value={formData.endDate || ''}
                           onChange={(event) => updateFormData('endDate',
                             event.target.value)}/>
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor='endTime'>End Time</FormLabel>
                    <Select name="endTime" id="endTime" value={formData.endTime || ''}
                            onChange={(event) => updateFormData('endTime', event.target.value)}>
                      <option value="00:00">00:00</option>
                      <option value="01:00">01:00</option>
                      <option value="02:00">02:00</option>
                      <option value="03:00">03:00</option>
                      <option value="04:00">04:00</option>
                      <option value="05:00">05:00</option>
                      <option value="06:00">06:00</option>
                      <option value="07:00">07:00</option>
                      <option value="08:00">08:00</option>
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="12:00">12:00</option>
                      <option value="13:00">13:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                      <option value="17:00">17:00</option>
                      <option value="18:00">18:00</option>
                      <option value="19:00">19:00</option>
                      <option value="20:00">20:00</option>
                      <option value="21:00">21:00</option>
                      <option value="22:00">22:00</option>
                      <option value="23:00">23:00</option>
                    </Select>
                  </FormControl>
                </HStack>

                { /* console.log(formData.startDateTime) */}
                { /*  console.log(formData.endDateTime) */}

                <Button variant='solid' colorScheme='blue' type="submit">
                  Create Booking
                </Button>

              </Stack>
            </form>
          </Box>
        </Stack>
      </Container>

    </div>
  );
}

export default NewBooking;