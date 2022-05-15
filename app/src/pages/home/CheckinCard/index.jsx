import React, { useEffect, useState } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';
import {
  chakra,
  Heading,
  VStack, Text, Button, Stack, useToast,
} from '@chakra-ui/react';
import { FiLogOut, FiMapPin } from 'react-icons/fi';

const CheckinCard = () => {

  const successToast = useToast({ status: 'success', isClosable: false });
  const errorToast = useToast({ status: 'error', isClosable: false });

  const [booking, setBooking] = useState();

  useEffect(() => {
    fetch('/api/bookings').then((response) => {
      response.json().then((json) => {
        const now = new Date();

        setBooking(json.find((b) => {
          const start = new Date(Date.parse(b.startDate));
          const end = new Date(Date.parse(b.endDate));
          return start < now && end > now && !b.checkedOut;
        }));
      });
    });
  }, []);


  const checkIn = () => {
    if (!('geolocation' in navigator)) {
      errorToast(
        { title: 'It looks like your device or browser doesn\'t support accessing your current location. You may need to enable this in settings.' });
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetch(`/api/bookings/checkin`, {
            method: 'PUT',
            body: JSON.stringify({
              bookingId: booking.bookingId,
              userGpsLat: position.coords.latitude,
              userGpsLong: position.coords.longitude
            }),
            headers: {
              "Content-Type": "application/json"
            }
          }).then((response) => {
            response.json().then((json) => {
              setBooking(json[1]);
            })
            if (response.status === 200){
              successToast({title: 'Checked in successfully!'})
            }else if(response.status === 401) {
              errorToast({title: 'It doesn\'t look like you\'re at the right space - check the space you\'re in and try checking in again.'})
            }
          })
        },
        (error) => {
          if (error.code === 'PERMISSION_DENIED') {
            errorToast(
              { title: 'Parker needs to be able to access your location in order to check you in.' });
          } else {
            errorToast(
              { title: 'We weren\'t able to locate you. Check your connection and try again.' });
          }
        },
      );
    }
  };

  const checkOut = () => {
    fetch(`/api/bookings/checkout`, {
      method: 'PUT',
      body: JSON.stringify({
        bookingId: booking.bookingId,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      setBooking(undefined);
      if (response.status === 200){
        successToast({title: 'Checked out successfully!'})
      }else {
        errorToast({title: 'There was en error checking out this booking - check your connection and try again.'})
      }
    });
  }

  return (
    booking ? (
      <VStack
        width='100%'
        spacing={4}
        borderWidth={1}
        borderRadius='xl'
        p={4}
        align='start'
      >
        <Stack justify='space-between' w='100%'
               align={{ base: 'stretch', md: 'center' }}
               direction={{ base: 'column', md: 'row' }}>
          {booking.checkedIn ? (
              <>
                <VStack align='left'>
                  <Heading size='md'>Check out</Heading>
                  <Text>Make sure to press the checkout button when you leave.</Text>
                </VStack>
                <Button colorScheme='blue' leftIcon={<FiLogOut />} onClick={checkOut}>
                  Check Out
                </Button>
              </>
          ) : (
            <>
              <VStack align='left'>
                <Heading size='md'>Check in</Heading>
                <Text>When you&apos;ve arrived at <chakra.span
                  fontWeight='bold'>{booking.ParkingSpace.CarPark.name}</chakra.span>, click
                  the Check In button.</Text>
              </VStack>
              <Button colorScheme='blue' leftIcon={<FiMapPin />} onClick={checkIn}>
                Check In
              </Button>
            </>
            )}
        </Stack>
      </VStack>
    ) : null
  );
};

export default CheckinCard;
