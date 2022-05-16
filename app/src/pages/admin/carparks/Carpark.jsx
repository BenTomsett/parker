/* eslint react/prop-types: 0 */
/* eslint no-else-return: 0 */
import React from 'react';
import {HStack, Td, Tr} from '@chakra-ui/react';
import DeleteCarpark from "./DeleteCarpark";
import EditCarpark from "./EditCarpark";
// import CarparkStatus from './CarparkStatus';


const Carpark = ({carpark, update}) => (

    <Tr>
      <Td>{carpark.name}</Td>
      <Td>{carpark.spaces}</Td>

      <Td>
          <HStack>
            <EditCarpark carpark={carpark} update={update}/>
            <DeleteCarpark carpark={carpark} update={update}/>
            {/* <CarparkStatus carpark={carpark}/> */}
          </HStack>
      </Td>
    </Tr>
  );

export default Carpark;