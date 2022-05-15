/* eslint react/prop-types: 0 */

import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Th,
  Td,
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
  Text,
  HStack
} from '@chakra-ui/react';

const CarparkStatus = ({ carpark }) => {
  const [carparkStatus, setCarparkStatus] = useState(null);
  const [availableSpaces, setAvailableSpaces] = useState(null);
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

  const fetchCarparkAvailableSpaces = async () => {
    fetch(`/api/spaces/carpark/availableSpaces/${carpark.carParkId}`, {
      method: 'GET',
    }).then((response) => {
      response.json().then((json) => {
        console.log(json);
        setAvailableSpaces(json);
      });
    });
  };

  useEffect(() => {
    fetchCarparkStatus();
    fetchCarparkAvailableSpaces();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
            <HStack><p>The amount of Available Spaces: {availableSpaces.availableSpaces}</p></HStack>  
            <VStack align="start" spacing={0} height="100%">
              {carparkStatus ? (
                carparkStatus.Zones.map((zone) => (
                    <>
                      <Text>{zone.name}</Text>
                      <Box w="100%" borderWidth="1px">
                        <TableContainer>
                          <Table>
                            <Thead>
                              <Tr alignItems="center">
                                <Th>Space Number</Th>
                                <Th>Status</Th>
                                <Th />
                              </Tr>
                            </Thead>

                            <Tbody>
                              {zone.ParkingSpaces.map((space) => (
                                <Tr>
                                  <Td>{space.spaceNo}</Td>
                                  <Td>{space.status}</Td>
                                </Tr>
                              ))}
                            </Tbody>
                          </Table>
                        </TableContainer>
                      </Box>
                    </>
                  ))
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
