import React from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';
import {
  chakra,
  Heading,
  VStack, Text, Button, Stack,
} from '@chakra-ui/react';
import { FiMapPin } from 'react-icons/fi';

const CheckinCard = () => (
    <VStack
      width="100%"
      spacing={4}
      borderWidth={1}
      borderRadius='xl'
      p={4}
      align='start'
    >
      <Stack justify="space-between" w="100%" direction={{base: 'column', md: 'row'}}>
        <VStack align='left'>
          <Heading size='md'>Check in</Heading>
          <Text>When you&apos;ve arrived at <chakra.span fontWeight="bold">Constable Terrace Car Park</chakra.span>, click the Check In button.</Text>
        </VStack>
        <Button colorScheme='blue' leftIcon={<FiMapPin />}>
          Check In
        </Button>
      </Stack>
    </VStack>
  );

export default CheckinCard;
