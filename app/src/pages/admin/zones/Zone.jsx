/* eslint react/prop-types: 0 */
/* eslint no-else-return: 0 */
import React from 'react';
import {HStack, Td, Tr} from '@chakra-ui/react';

import EditZone from "./EditZone";
import DeleteZone from "./DeleteZone";



const Zone = ({zone, update}) => (

    <Tr>
      <Td>{zone.zoneId}</Td>
        <Td>{zone.name}</Td>
        <Td>{zone.CarPark.name}</Td>
        <Td>{zone.spaces}</Td>
      <Td>
          <HStack>
           <EditZone zone={zone} update={update}/>
            <DeleteZone zone={zone} update={update}/>
          </HStack>
      </Td>
    </Tr>
  );

export default Zone;