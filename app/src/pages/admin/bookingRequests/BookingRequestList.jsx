import React, { useEffect, useState } from 'react';
import {
  Box, HStack, Spinner,
  Table,
  TableContainer,
  Tbody, Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { formatDuration, intervalToDuration } from 'date-fns';
import DenyRequestModal from './DenyRequestModal';
import ApproveRequestModal from './ApproveRequestModal';

const BookingRequestList = () => {
  const [requests, setRequests] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRequests = () => {
    setLoading(true);
    fetch('/api/bookingRequests/', {
      method: 'GET',
    }).then((response) => {
      response.json().then((json) => {
        setRequests(json);
        setLoading(false);
      });
    });
  };

  useEffect(() => {
    fetchRequests();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <VStack align='start' spacing={0} w='100%'>
      {
        requests && requests.length > 0 ?
          (
            <Box borderWidth='1px' w='100%'>
                <TableContainer>
                  <Table>
                    <Thead>
                      <Tr alignItems='center'>
                        <Th>Building</Th>
                        <Th>User</Th>
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
                              <Td>{request.User.forename} {request.User.surname}</Td>
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
                                <HStack>
                                  <ApproveRequestModal request={request} update={fetchRequests}/>
                                  <DenyRequestModal request={request} update={fetchRequests}/>
                                </HStack>
                              </Td>
                            </Tr>
                          );
                        })
                      }
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
          ) : loading ? (
            <Spinner />
          ) : <Text>No pending booking requests.</Text>
      }
    </VStack>
  );
};

export default BookingRequestList;