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
import Carpark from './Carpark';
import CreateCarpark from './CreateCarpark';

const CarparkList = () => {
  const [carparks, setCarparks] = useState(null);

  const fetchCarparks = () => {
    fetch('/api/carparks/', {
      method: 'GET',
    }).then((response) => {
      response.json().then((json) => {
        setCarparks(json);
      });
    });
  };

  useEffect(() => {
    fetchCarparks();
  }, []);

  return (
    <VStack align="start" spacing={0} height="100%">
      <CreateCarpark />
      {carparks ? (
        <Box w="100%" borderWidth="1px">
          <TableContainer>
            <Table>
              <Thead>
                <Tr alignItems="center">
                  <Th>Carpark Name</Th>
                  <Th>Number of Spaces</Th>
                  <Th />
                </Tr>
              </Thead>

              <Tbody>
                {carparks.map((carpark) => (
                  <Carpark
                    key={carpark.carParkId}
                    carpark={carpark}
                    update={fetchCarparks}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <p>No Carparks have been created!</p>
      )}
    </VStack>
  );
};

export default CarparkList;
