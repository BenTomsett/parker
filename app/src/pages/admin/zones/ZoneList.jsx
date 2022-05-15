import React, {useEffect, useState} from 'react';
import {Box, Table, TableContainer, Tbody, Th, Thead, Tr, VStack} from '@chakra-ui/react';
import Zone from './Zone';



const ZoneList = () => {
  const [zones, setZones] = useState(null);

  const fetchZones = () => {
    fetch('/api/zones/', {
      method: 'GET',
    }).then((response) => {
      response.json().then((json) => {
        console.log(json);
        setZones(json);
      })
    });
  }

  useEffect(() => {
    fetchZones();
  }, []);

  return (
    <VStack align="start" spacing={0}>
      {
        zones ?
          (
            <Box w="100%" borderWidth="1px" >
            <TableContainer >
              <Table>
                <Thead>
                  <Tr alignItems='center'>
                    <Th>Zone ID</Th>
                    <Th>Name</Th>
                    <Th>CarPark</Th>
                    <Th>Number of spaces</Th>
                    <Th/>

                  </Tr>
                </Thead>


                <Tbody>
                  {
                    zones.map((zone) => (
                      <Zone key={zone.zoneId} zone={zone} update={fetchZones} />
                    ))
                  }
                </Tbody>
              </Table>
            </TableContainer>
            </Box>
          ) : (
            <p>No Zones Fetched</p>
          )
      }
    </VStack>
  );
};

export default ZoneList;