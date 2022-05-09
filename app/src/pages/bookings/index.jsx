import React from 'react';
import { Heading } from '@chakra-ui/react';
import BookingList from '../../components/bookings/BookingList';
import useTitle from '../../hooks/useTitle';

const BookingsPage = () => {
  useTitle("Bookings");

  return (
      <div>
        <Heading size="xl">Bookings</Heading>,
        <BookingList />
      </div>
  )
};

export default BookingsPage;
