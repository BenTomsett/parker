import React, { useEffect, useState } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';
import {
  chakra,
  Center,
  Heading,
  Spinner,
  Text,
  VStack, HStack, Badge, Divider,
} from '@chakra-ui/react';
import { formatDuration, intervalToDuration } from 'date-fns';

const BookingRequestCard = () => {
  const [loading, setLoading] = useState(true);
  const [bookingRequests, setBookingRequests] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch('/api/bookingRequests').then((response) => {
      response.json().then((json) => {
        setBookingRequests(json);
        setLoading(false);
      });
    });
  }, []);

  const showBookingRequests = () => bookingRequests.length > 0 ? (
    bookingRequests.map((request, index) => {
      const start = new Date(request.startDate);
      const end = new Date(request.endDate);
      const duration = intervalToDuration({ start, end });

      return (
        <chakra.div key={request.bookingRequestId} w='100%' >
          <VStack w='100%' align='left'>
            <HStack justify='space-between'>
              <VStack align='left' spacing={0}>
                <Text fontWeight='bold'>{request.Building.name}</Text>
                <Text>Start: {start.toDateString()}, {start.toLocaleTimeString()}</Text>
                <Text>Duration: {formatDuration(duration)}</Text>
              </VStack>
              <Badge fontSize='mg' colorScheme='orange' p='lg'>PENDING</Badge>
            </HStack>
          </VStack>
          {index > bookingRequests.length && (
            <Divider />
          )}
        </chakra.div>
      );
    })
  ) : (
    <Text>No pending booking requests.</Text>
  );

  return (
    <VStack
      width="100%"
      spacing={4}
      borderWidth={1}
      borderRadius='xl'
      p={4}
      align='start'
    >
      <Heading size='md'>Pending booking requests</Heading>
      <Divider />
      {loading ? (
        <Center w='100%' h='100%'>
          <Spinner />
        </Center>
      ) : (
        showBookingRequests()
      )}
    </VStack>
  );
};

export default BookingRequestCard;
