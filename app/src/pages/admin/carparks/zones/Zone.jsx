/* eslint react/prop-types: 0 */
/* eslint no-else-return: 0 */
import React from 'react';
import {HStack, Td, Tr} from '@chakra-ui/react';

const Zone = ({zone, update}) => (

    <Tr>
      <Td>{zone.name}</Td>
      <Td>{zone.spaces}</Td>

      <Td>
          <HStack/>
      </Td>
    </Tr>
  );

export default Zone;