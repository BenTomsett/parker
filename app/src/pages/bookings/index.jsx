import {useNavigate} from "react-router-dom";
import React from 'react';
import {Button, Heading, Text} from '@chakra-ui/react';
import BookingList from '../../components/bookings/BookingList';
import useTitle from '../../hooks/useTitle';

const BookingsPage = () => {
  useTitle("Bookings");

  const navigate = useNavigate();

  return (
      <div>
        <Heading size="xl">Bookings</Heading>
        <br/>
        <Heading size="md">Welcome to your Bookings Page</Heading>
        <Text fontSize="md">Below you can see all of your bookings and useful details relating to them <br/> If you need to cancel any of these bookings either click the cancel button next to the appropriate booking. </Text>
        <br/>
        <Text fontSize="md">If you would like to create a new booking, you can <Button
          variant="link"
          colorScheme="blue"
          onClick={() => {
            navigate('/bookings/newBooking');
          }}>click here to create a new Booking!</Button>
        </Text>
        <br/>
        <br/>
        <BookingList />

      </div>
  )
};

export default BookingsPage;
