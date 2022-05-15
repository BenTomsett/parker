/* eslint react/prop-types: 0 */

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
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import Zone from './zones/Zone';

const CarparkStatus = ({ carpark }) => {
  const [carparkStatus, setCarparkStatus] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure()

  const fetchCarparkStatus = async () => {
    fetch(`/api/carparks/${carpark.carParkId}`, {
      method: 'GET',
    }).then((response) => {
      response.json().then((json) => {
        setCarparkStatus(json);
      });
    });
  };

  useEffect(() => {
    fetchCarparkStatus();
  });

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        View Status
      </Button>

      <Modal isOpen={isOpen} size="full" onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Carpark Status: {carpark.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="start" spacing={0} height="100%">
              {carparkStatus ? (
                <Box w="100%" borderWidth="1px">
                  <TableContainer>
                    <Table>
                      <Thead>
                        <Tr alignItems="center">
                          <Th>Name</Th>
                          <Th>Number of Spaces</Th>
                          <Th />
                        </Tr>
                      </Thead>

                      <Tbody>
                        {carparkStatus.Zones.map((zone) => (
                          <Zone
                            key={zone.zoneId}
                            zone={zone}
                            update={fetchCarparkStatus}
                          />
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Box>
              ) : (
                <p>Retrieving carpark information</p>
              )}
            </VStack>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};

export default CarparkStatus;
