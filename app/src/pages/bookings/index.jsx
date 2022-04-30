import React from 'react';
import { Heading } from '@chakra-ui/react';
import useTitle from '../../hooks/useTitle';

const BookingsPage = () => {
  useTitle("Bookings");

  return <Heading size="xl">Bookings</Heading>;
};

export default BookingsPage;
