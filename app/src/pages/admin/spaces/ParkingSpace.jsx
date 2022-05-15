/* eslint react/prop-types: 0 */
/* eslint no-else-return: 0 */
import React from 'react';
import {HStack, Td, Tr} from '@chakra-ui/react';
import EditParkingSpace from "./EditParkingSpace";
import DeleteParkingSpace from "./DeleteParkingSpace";

const ParkingSpace = ({space, update}) => (

    <Tr>
        <Td>{space.spaceNo}</Td>
        <Td>{space.CarPark.name}</Td>
        <Td>{space.Zone.name}</Td>
        <Td>
            <HStack>
                <EditParkingSpace parkingSpace={space} update={update}/>
                <DeleteParkingSpace parkingSpace={space} update={update}/>
            </HStack>
        </Td>
    </Tr>
);

export default ParkingSpace;