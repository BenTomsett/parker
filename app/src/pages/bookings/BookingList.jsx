/* eslint react/prop-types: 0 */

import React, { useContext, useEffect, useState } from 'react';
import {
  Box, Spinner,
  Table,
  TableContainer,
  Tbody, Td, Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';

import { formatDuration, intervalToDuration } from 'date-fns';
import CancelBookingModal from './CancelBookingModal';
import EditBookingModal from './EditBookingModal';
import UserContext from '../../context/user';

const BookingList = ({updateCount}) => {
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useContext(UserContext);

  const fetchBookings = () => {
    setLoading(true);
    fetch('/api/bookings/', {
      method: 'GET',
    }).then((response) => {
      response.json().then((json) => {
        setBookings(json);
        updateCount('bookings', json.length)
        setLoading(false);
      });
    });
  };

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <VStack align='start' spacing={0} w="100%">
      {
        bookings && bookings.length > 0 ?
          (
            <Box borderWidth='1px' w='100%'>
              <TableContainer>
                <Table>
                  <Thead>
                    <Tr alignItems='center'>
                      <Th>Car park</Th>
                      <Th>Space</Th>
                      <Th>Start</Th>
                      <Th>End</Th>
                      <Th>Duration</Th>
                      <Th />
                    </Tr>
                  </Thead>
                  <Tbody>
                    {
                      bookings.map((booking) => {
                        const start = new Date(booking.startDate);
                        const end = new Date(booking.endDate);
                        const duration = intervalToDuration({ start, end });

                        return (
                          <Tr key={booking.bookingId}>
                            <Td
                              fontWeight='bold'>{booking.ParkingSpace.CarPark.name}</Td>
                            <Td>{booking.ParkingSpace.spaceNo}</Td>
                            <Td>{start.toDateString()}, {start.toLocaleTimeString()}</Td>
                            <Td>{end.toDateString()}, {end.toLocaleTimeString()}</Td>
                            <Td>{formatDuration(duration, {
                              format: [
                                'years',
                                'months',
                                'weeks',
                                'days',
                                'hours',
                                'minutes'],
                            })}</Td>
                            <Td>
                              <CancelBookingModal booking={booking} update={fetchBookings} />
                              {user.isAdmin && <EditBookingModal booking={booking} update={fetchBookings} />}
                            </Td>
                          </Tr>
                        )

                      })
                    }
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          ) : loading ? (
            <Spinner />
          ) : <Text>No upcoming bookings.</Text>
      }
    </VStack>
  );
};

export default BookingList;