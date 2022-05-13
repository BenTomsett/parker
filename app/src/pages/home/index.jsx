import React, { useContext } from 'react';
import { Button, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import useTitle from '../../hooks/useTitle';
import UserContext from '../../context/user';
import MapCard from './MapCard';
import BookingCard from './BookingCard';
import BookingRequestCard from './BookingRequestCard';

const HomePage = () => {
  useTitle('Home');

  const user = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <VStack align='start' spacing={4} height='100%'>
      <HStack justifyContent='space-between' w='100%' align='center'>
        <VStack align='start' spacing={0}>
          <Heading size='lg'>Welcome back, {user.forename}.</Heading>
          <Text fontSize='xl'>Here&apos;s your dashboard.</Text>
        </VStack>
        <Button
          colorScheme="blue"
          leftIcon={<FiPlus />}
          onClick={() => {
            navigate('/bookings/newBooking');
          }}>
          Request booking
        </Button>
      </HStack>
      <Flex h='100%' w='100%' gap={4}>
        <MapCard />
        <VStack flex={1}>
          <BookingCard />
          <BookingRequestCard />
        </VStack>
      </Flex>
    </VStack>
  );
};

export default HomePage;
