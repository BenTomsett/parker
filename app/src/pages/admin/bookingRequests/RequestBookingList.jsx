import React, {useEffect, useState} from 'react';
import {Box, Table, TableContainer, Tbody, Th, Thead, Tr, VStack} from '@chakra-ui/react';
import RequestedBookings from "./RequestedBookings";



const RequestBookingList = () => {
  const [requestedBookings, setRequestedBookings] = useState(null);

  const fetchBookingRequests = () => {
    fetch('/api/bookingRequests/', {
      method: 'GET',
    }).then((response) => {
      response.json().then((json) => {
        // console.log(json);
        setRequestedBookings(json);
      })
    });
  }

  useEffect(() => {
    fetchBookingRequests();
  }, []);

  return (
    <VStack align="start" spacing={0}>
      {
        requestedBookings ?
          (
            <Box w="100%" borderWidth="1px" >
              <TableContainer >
                <Table>
                  <Thead>
                    <Tr alignItems='center'>
                      <Th>RequestID</Th>
                      <Th>UserID</Th>
                      <Th>DestinationID</Th>
                      <Th>Start Date</Th>
                      <Th>Start Time</Th>
                      <Th>End Date</Th>
                      <Th>End Time</Th>
                      <Th/>

                    </Tr>
                  </Thead>

                  <Tbody>
                    {
                      requestedBookings.map((requestedBooking) => (
                        <RequestedBookings key={requestedBooking.bookingRequestId} requestedBooking={requestedBooking} update={fetchBookingRequests} />
                      ))
                    }
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          ) : (
            <p>No Requested bookings Fetched</p>
          )
      }
    </VStack>
  );
};

export default RequestBookingList;