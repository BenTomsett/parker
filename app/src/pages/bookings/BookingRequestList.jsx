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

const BookingRequestList = ({updateCount}) => {
  const [requests, setRequests] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBookings = () => {
    setLoading(true);
    fetch('/api/bookingRequests/', {
      method: 'GET',
    }).then((response) => {
      response.json().then((json) => {
        setRequests(json);
        updateCount('requests', json.length)
        setLoading(false);
      });
    });
  };

  useEffect(() => {
    fetchBookings();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <VStack align='start' spacing={0} w="100%">
      {
        requests && requests.length > 0 ?
          (
            <>
              <Text>These booking requests have not yet been approved yet. Once they are approved, you&apos;ll receive a confirmation email and your saved payment method will be charged.</Text>
              <br/>
              <Box borderWidth='1px' w='100%'>
                <TableContainer>
                  <Table>
                    <Thead>
                      <Tr alignItems='center'>
                        <Th>Building</Th>
                        <Th>Start</Th>
                        <Th>End</Th>
                        <Th>Duration</Th>
                        <Th />
                      </Tr>
                    </Thead>
                    <Tbody>
                      {
                        requests.map((request) => {
                          const start = new Date(request.startDate);
                          const end = new Date(request.endDate);
                          const duration = intervalToDuration({ start, end });

                          return (
                            <Tr key={request.bookingRequestId}>
                              <Td
                                fontWeight='bold'>{request.Building.name}</Td>
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
                            </Tr>
                          )

                        })
                      }
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </>
          ) : loading ? (
            <Spinner />
          ) : <Text>No upcoming bookings.</Text>
      }
    </VStack>
  );
};

export default BookingRequestList;