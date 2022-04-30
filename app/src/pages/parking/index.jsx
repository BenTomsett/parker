import React from 'react';
import { Heading } from '@chakra-ui/react';
import useTitle from '../../hooks/useTitle';

const ParkingPage = () => {
  useTitle("Parking");

  return <Heading size="xl">Parking</Heading>;
};

export default ParkingPage;
