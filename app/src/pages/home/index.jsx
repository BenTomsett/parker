import React from 'react';
import { Heading, Text, VStack } from '@chakra-ui/react';
import useTitle from '../../hooks/useTitle';

const HomePage = () => {
  useTitle('Home');

  return (
    <VStack align="start" spacing={0}>
      <Heading size="lg">Welcome back, Ben</Heading>
      <Text fontSize="xl">Here&apos;s your dashboard.</Text>
    </VStack>
  );
};

export default HomePage;