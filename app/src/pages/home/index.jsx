import React, { useContext } from 'react';
import {
  Button,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import useTitle from '../../hooks/useTitle';
import UserContext from '../../context/user';
import MapCard from './MapCard';
import BookingCard from './BookingCard';
import BookingRequestCard from './BookingRequestCard';
import CheckinCard from './CheckinCard';

const HomePage = () => {
  useTitle('Home');

  const user = useContext(UserContext);

  const navigate = useNavigate();

  return (
    <VStack align='start' spacing={4} height='100%'>
      <Stack justifyContent='space-between' w='100%' align={{base: 'left', md: 'center'}} direction={{base: 'column', md: 'row'}}>
        <VStack align='start' spacing={0}>
          <Heading size='lg'>Welcome back, {user.forename}.</Heading>
          <Text fontSize='xl'>Here&apos;s your dashboard.</Text>
        </VStack>
        <Button
          colorScheme="blue"
          leftIcon={<FiPlus />}
          onClick={() => {
            navigate('/bookings/request');
          }}>
          Request booking
        </Button>
      </Stack>
      <CheckinCard />
      <Stack height={{base: 'unset', md: '100%'}} w='100%' direction={{base: 'column-reverse', md: 'row'}}>
        <MapCard />
        <VStack flex={1}>
          <BookingCard />
          <BookingRequestCard />
        </VStack>
      </Stack>
    </VStack>
  );
};

export default HomePage;
