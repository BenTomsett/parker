/* import {emailRegex, getAge, strongPassRegex} from "../../../utils/auth"; */

import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl, FormLabel,
  Heading, Input, Select, Spinner,
  Stack, Text,
  useBreakpointValue, useToast, VStack,
} from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../../context/user';

// import Building from "../../../components/bookings/Building";
//  import CarPark from "../../../components/bookings/CarPark";

const NewBookingRequest = () => {
  const user = useContext(UserContext);
  const toast = useToast({ status: 'error', isClosable: false });
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [buildings, setBuildings] = useState(null);
  const [bookingCost, setBookingCost] = useState();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const updateFormData = (property, value) => {
    setFormData((prevState => ({
      ...prevState,
      [property]: value,
    })));
  };

  const fetchBuildings = () => {
    setLoading(true);
    fetch('/api/buildings/', {
      method: 'GET',
    }).then((response) => {
      response.json().then((json) => {
        setBuildings(json);
        setLoading(false);
      });
    });
  };

  const processData = (event) => {
    event.preventDefault();

    const startDate = new Date(
      Date.parse(`${formData.startDate}T${formData.startTime}`));
    const endDate = new Date(
      Date.parse(`${formData.endDate}T${formData.endTime}`));

    if (startDate > endDate || startDate.getTime() === endDate.getTime()) {
      toast({ title: 'The start date must be before the end date' });
    } else if (startDate < new Date()) {
      toast({ title: 'The start date must not be in the past' });
    } else if (!formData.startTime || !formData.startDate ||
      !formData.endTime ||
      !formData.endTime || !formData.buildingId) {
      toast({ title: 'Please fill out all fields' });
    } else {
      setSubmitting(true);
      fetch('/api/bookingRequests/', {
        method: 'PUT',
        body: JSON.stringify({
          userId: user.userId,
          buildingId: formData.buildingId,
          startDate,
          endDate,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        setSubmitting(false);
        if (response.status === 200) {
          navigate('/bookings');
        } else if (response.status === 409) {
          toast(
            { title: 'An identical booking request already exists - an admin must approve that request.' });
        } else {
          toast(
            { title: 'There was an error creating your booking request. Wait a few minutes and try again.' });
        }
      });
    }
  };

  useEffect(() => {
    fetchBuildings();
  }, []);

  useEffect(() => {
    if (formData.startDate
      && formData.startTime
      && formData.endDate
      && formData.endTime) {
      const startDate = new Date(
        Date.parse(`${formData.startDate}T${formData.startTime}`));
      const endDate = new Date(
        Date.parse(`${formData.endDate}T${formData.endTime}`));
      fetch('/api/bookings/cost', {
        method: 'POST',
        body: JSON.stringify({
          startDate,
          endDate,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        response.json().then((json) => {
          setBookingCost(json.cost)
        });
      });
    }
  }, [formData]);

  return (
    <VStack align='start' spacing={4} height='100%'>
      <Button
        size='sm'
        leftIcon={<FiArrowLeft />}
        onClick={() => {
          navigate(-1);
        }}>
        Back
      </Button>
      <Heading size='lg'>Request a new booking</Heading>
      <Box
        p={8}
        bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
        borderRadius={{ base: 'none', sm: 'xl' }}
        borderWidth={1}
        width={{ base: '100%', md: '50%' }}
      >
        {
          loading ? (
            <Spinner />
          ) : (
            <form onSubmit={processData}>
              <Stack spacing='4'>
                <FormControl>
                  <FormLabel htmlFor='BuildingName'>Destination
                    building</FormLabel>
                  <Select name='buildingName' id='buildingName'
                          value={formData.buildingId} defaultValue={-1}
                          onChange={(event) => {
                            updateFormData('buildingId', event.target.value);
                          }}>
                    <option disabled value={-1}>Choose a building</option>
                    {buildings.map((building) => (
                      <option key={building.buildingId}
                              value={building.buildingId}
                              label={building.name} />
                    ))}
                  </Select>
                </FormControl>

                <Stack align={{ base: 'left', md: 'center' }}
                       direction={{ base: 'column', md: 'row' }}>
                  <FormControl>
                    <FormLabel htmlFor='startDate'>Start date</FormLabel>
                    <Input id='startDate' type='date'
                           autoComplete='startDate'
                           value={formData.startDate || ''}
                           onChange={(event) => updateFormData('startDate',
                             event.target.value)}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor='startTime'>Start time</FormLabel>
                    <Select name='startTime' id='startTime'
                            value={formData.startTime}
                            defaultValue={-1}
                            onChange={(event) => updateFormData('startTime',
                              event.target.value)}>
                      <option disabled value={-1}>Choose start time</option>
                      {[...Array(24)].map((value, index) => {
                        const hour = index.toLocaleString('en-GB',
                          { minimumIntegerDigits: 2, useGrouping: false });
                        return (
                          <option key={hour}
                                  value={`${hour}:00`}>{`${hour}:00`}</option>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Stack>

                <Stack align={{ base: 'left', md: 'center' }}
                       direction={{ base: 'column', md: 'row' }}>
                  <FormControl>
                    <FormLabel htmlFor='endDate'>End date</FormLabel>
                    <Input id='endDate' type='date'
                           autoComplete='endDate'
                           value={formData.endDate || ''}
                           onChange={(event) => updateFormData('endDate',
                             event.target.value)} />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor='endTime'>End time</FormLabel>
                    <Select name='endTime' id='endTime'
                            value={formData.endTime}
                            defaultValue={-1}
                            onChange={(event) => updateFormData('endTime',
                              event.target.value)}>
                      <option disabled value={-1}>Choose end time</option>
                      {[...Array(24)].map((value, index) => {
                        const hour = index.toLocaleString('en-GB',
                          { minimumIntegerDigits: 2, useGrouping: false });
                        return (
                          <option key={hour}
                                  value={`${hour}:00`}>{`${hour}:00`}</option>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Stack>

                <Text>Estimated cost: £{
                  bookingCost || (
                    "--"
                  )
                }</Text>

                <Button disabled={submitting} variant='solid' colorScheme='blue'
                        type='submit'>
                  {submitting ? (
                    <Spinner />
                  ) : 'Submit'}
                </Button>
              </Stack>
            </form>
          )
        }
      </Box>
    </VStack>
  );
};

export default NewBookingRequest;