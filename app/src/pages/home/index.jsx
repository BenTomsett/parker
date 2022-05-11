import React, { useContext } from 'react';
import { Flex, Heading, Text, VStack } from '@chakra-ui/react';
import useTitle from '../../hooks/useTitle';
import UserContext from '../../context/user';
import MapCard from './MapCard';
import BookingCard from './BookingCard';

const HomePage = () => {
  useTitle('Home');

  const user = useContext(UserContext);

  return (
    <VStack align="start" spacing={4} height="100%">
      <VStack align="start" spacing={0}>
        <Heading size="lg">Welcome back, {user.forename}.</Heading>
        <Text fontSize="xl">Here&apos;s your dashboard.</Text>
      </VStack>
      <Flex h="50%" w="100%" gap={4}>
        <MapCard />
        <BookingCard />
      </Flex>
    </VStack>
  );
};

export default HomePage;
