import React from 'react';
import { Heading } from '@chakra-ui/react';
import useTitle from '../../hooks/useTitle';

const HomePage = () => {
  useTitle('Home');

  return <Heading size="xl">Home</Heading>;
};

export default HomePage;
