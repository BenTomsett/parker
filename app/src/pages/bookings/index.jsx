import React from 'react';
import {Heading, Text} from '@chakra-ui/react';
import BookingList from '../../components/bookings/BookingList';
import useTitle from '../../hooks/useTitle';

const BookingsPage = () => {
  useTitle("Bookings");

  return (
      <div>
        <Heading size="xl">Bookings</Heading>,
        <Heading size="md">Welcome to your Bookings Page</Heading>
        <Text fontSize="xl">Here are your bookings.</Text>
        <BookingList />
      </div>
  )
};

export default BookingsPage;
