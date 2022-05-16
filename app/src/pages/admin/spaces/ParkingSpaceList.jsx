import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import ParkingSpace from "./ParkingSpace";
import CreateParkingSpace from "./CreateParkingSpace";

const ParkingSpaceList = () => {
  const [spaces, setSpaces] = useState(null);

  const fetchSpaces = () => {
    fetch('/api/spaces/', {
      method: 'GET',
    }).then((response) => {
      response.json().then((json) => {
        setSpaces(json);
      });
    });
  };

  useEffect(() => {
    fetchSpaces();
  }, []);

  return (
    <VStack align="end" height="100%">
      <CreateParkingSpace update={fetchSpaces}/>
      {spaces ? (
        <Box w="100%" borderWidth="1px">

          <TableContainer>
            <Table>
              <Thead>
                <Tr alignItems="center">
                  <Th>Space No</Th>
                  <Th>Car Park</Th>
                  <Th>Zone</Th>
                  <Th />
                </Tr>
              </Thead>

              <Tbody>
                {spaces.map((space) => (
                  <ParkingSpace
                    key={space.spaceId}
                    space={space}
                    update={fetchSpaces}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <p>No Parking Spaces have been created!</p>
      )}
    </VStack>
  );
};

export default ParkingSpaceList;
