/* eslint react/prop-types: 0 */

import React from 'react';
import {Divider, HStack, Text, VStack} from '@chakra-ui/react';

const ProgressSteps = ({steps, active}) => {
  const mappedSteps = steps.map((step, index) => (
      <VStack key={step.key} flex="1" spacing={1} align="left">
        <Divider borderColor={active === index ? 'blue.500' : 'gray.200'}
                 opacity={active === index ? 1 : 0.5}
                 borderWidth={2}
                 borderRadius={5}
                 transition="border-color 0.1s ease-in-out"
        />
        <Text fontWeight="bold">{step.label}</Text>
      </VStack>
  ));

  return (
      <HStack spacing={6} justify="stretch" w="100%" align="start">
        {mappedSteps}
      </HStack>
  );
};

export default ProgressSteps;
