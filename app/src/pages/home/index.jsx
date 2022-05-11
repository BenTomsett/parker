import React, { useContext } from 'react';
import { Heading, Text, VStack } from '@chakra-ui/react';
import useTitle from '../../hooks/useTitle';
import UserContext from '../../context/user';
import MapCard from './MapCard';

const HomePage = () => {
  useTitle('Home');

  const user = useContext(UserContext);

  return (
    <VStack align="start" spacing={0}>
      <Heading size="lg">Welcome back, {user.forename}.</Heading>
      <Text fontSize="xl">Here&apos;s your dashboard.</Text>
      <MapCard />
    </VStack>
  );
};

export default HomePage;
