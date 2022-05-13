import React, { useEffect, useState } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';
import {
  chakra,
  Center,
  Heading,
  Spinner,
  Text,
  VStack, HStack, Badge, Button, Divider,
} from '@chakra-ui/react';
import { formatDuration, intervalToDuration } from 'date-fns';

const BookingCard = () => {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch('/api/bookings').then((response) => {
      response.json().then((json) => {
        setBookings(json);
        setLoading(false);
      });
    });
  }, []);

  const showBookings = () => bookings.length > 0 ? (
    bookings.map((booking, index) => {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);
      const duration = intervalToDuration({ start, end });

      const flatRate = 3.50;
      const hours = Math.abs(end - start) / 36e5; // Calculates duration in hour
      const cost = (hours * flatRate).toFixed(2);

      return (
        <chakra.div key={booking.bookingId} w='100%'>
          <VStack key={booking.bookingId} w='100%' align='left'>
            <HStack justify='space-between'>
              <VStack align='left' spacing={0}>
                <chakra.span
                  fontWeight='bold'>{booking.ParkingSpace.CarPark.name}</chakra.span>
                - Space {booking.ParkingSpace.spaceNo}
                <Text>Start: {start.toDateString()}, {start.toLocaleTimeString()}</Text>
                <Text>Duration: {formatDuration(duration, {
                  format: [
                    'years',
                    'months',
                    'weeks',
                    'days',
                    'hours',
                    'minutes'],
                })}</Text>
              </VStack>
              <Badge fontSize='mg' colorScheme='green' p='lg'>£{cost}</Badge>
            </HStack>
          </VStack>
          {index > bookings.length && (
            <Divider />
          )}
        </chakra.div>
      );
    })
  ) : (
    <Text>No upcoming bookings.</Text>
  );

  return (
    <VStack
      width="100%"
      spacing={4}
      borderWidth={1}
      borderRadius='xl'
      p={4}
      align='start'
    >
      <HStack align='center' justifyContent='space-between' w="100%">
        <Heading size='md'>Upcoming bookings</Heading>
        <Button variant='link'>View all</Button>
      </HStack>
      <Divider />
      {loading ? (
        <Center w='100%' h='100%'>
          <Spinner />
        </Center>
      ) : (
        showBookings()
      )}
    </VStack>
  );
};

export default BookingCard;
