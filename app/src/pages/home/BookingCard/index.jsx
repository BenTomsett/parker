import React, { useContext, useEffect, useState } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';
import {
  Button,
  Center,
  Divider,
  Heading, Spacer,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import UserContext from '../../../context/user';

const BookingCard = () => {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  const user = useContext(UserContext);

  useEffect(() => {
    setLoading(true);
    fetch('/api/bookings').then((response) => {
      response.json().then((json) => {
        setBookings(json);
        setLoading(false);
      })
    })
  }, []);

  const showBookings = () => bookings.length > 0 ? (
    bookings.map((booking) => (
      <VStack w="100%" align="left">
        <Text>{booking.bookingId}</Text>
        <Divider />
      </VStack>
    ))
  ) : (
    <Text>No upcoming booking.</Text>
  )

  return (
    <VStack
      flex={1}
      spacing={4}
      borderWidth={1}
      borderRadius="xl"
      p={4}
      align="start"
    >
      <Heading size="md" align>{user.isAdmin ? 'All' : 'Your'} upcoming bookings</Heading>
      {loading ? (
        <Center w="100%" h="100%">
          <Spinner/>
        </Center>
      ) : (
        showBookings()
      )}
      <Spacer />
      <Button alignSelf="end">Request booking</Button>
    </VStack>
  );
}

export default BookingCard;
