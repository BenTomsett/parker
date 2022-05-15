/* eslint react/prop-types: 0 */

import React, { useEffect, useState } from 'react';
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
import CreateBlockedSpace from "./CreateBlockedSpace";
import CancelBlockedSpace from "./CancelBlockedSpace";
import EditBlockedSpace from "./EditBlockedSpace";

const BlockedSpaceList = ({updateRestrictedCount}) => {
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBookings = () => {
    setLoading(true);
    fetch('/api/bookings/restricted', {
      method: 'GET',
    }).then((response) => {
      response.json().then((json) => {
        setBookings(json);
        updateRestrictedCount('bookings', json.length)
        console.log(json)
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
      <CreateBlockedSpace update={fetchBookings}/>
      {
        bookings ?
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
                            <Td> <EditBlockedSpace booking={booking} update={fetchBookings}/>
                             <CancelBlockedSpace booking={booking} update={fetchBookings}/> </Td>
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

export default BlockedSpaceList;