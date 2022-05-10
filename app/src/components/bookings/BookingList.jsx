import React, {useEffect, useState} from 'react';
import {Box, Table, TableContainer, Tbody, Th, Thead, Tr, VStack} from '@chakra-ui/react';
import Booking from './Booking';



const BookingList = () => {
  const [bookings, setBookings] = useState(null);
  const [update, setUpdate] = useState(false);

  const fetchBookings = () => {
    fetch('/api/bookings/', {
      method: 'GET',
    }).then((response) => {
      response.json().then((json) => {
        console.log(json);
        setBookings(json);
      })
    });
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  /* const bookingItems = bookings.map((booking) => (
    <p key={booking.id}>{JSON.stringify(booking)}</p>
  )); */

  return (
    <VStack align="start" spacing={0}>
      {
        bookings ?
          (
            <Box w="100%" borderWidth="1px" >
            <TableContainer >
              <Table>
                <Thead>
                  <Tr alignItems='center'>
                    <Th>Booking ID</Th>
                    <Th>Car park</Th>
                    <Th>Space</Th>
                    <Th>Start Date</Th>
                    <Th>Start Time</Th>
                    <Th>End Date</Th>
                    <Th>End Time</Th>
                    <Th/>
                  </Tr>
                </Thead>


                <Tbody>
                  {
                    bookings.map((booking) => (
                      <Booking key={booking.bookingId} booking={booking} update={fetchBookings} />
                    ))
                  }
                </Tbody>
              </Table>
            </TableContainer>
            </Box>
          ) : (
            <p>No bookings Fetched</p>
          )
      }
    </VStack>
  );
};

export default BookingList;