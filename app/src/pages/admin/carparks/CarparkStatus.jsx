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
} from '@chakra-ui/react';

const CarparkStatus = ({ carpark }) => {
  const [carparkStatus, setCarparkStatus] = useState(null);
  const [availableSpaces, setAvailableSpaces] = useState(null);
  const [occupiedSpaces, setOccupiedSpaces] = useState(null);
  const [reservedSpaces, setReservedSpaces] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
        setAvailableSpaces(json);
      });
    });
  };

  const fetchCarparkOccupiedSpaces = async () => {
    fetch(`/api/spaces/carpark/occupiedSpaces/${carpark.carParkId}`, {
      method: 'GET',
    }).then((response) => {
      response.json().then((json) => {
        setOccupiedSpaces(json);
      });
    });
  };

  const fetchCarparkReservedSpaces = async () => {
    fetch(`/api/spaces/carpark/reservedSpaces/${carpark.carParkId}`, {
      method: 'GET',
    }).then((response) => {
      response.json().then((json) => {
        setReservedSpaces(json);
      });
    });
  };

  useEffect(() => {
    fetchCarparkStatus();
    fetchCarparkAvailableSpaces();
    fetchCarparkOccupiedSpaces();
    fetchCarparkReservedSpaces();
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
            <VStack>
              <Box w="100%" borderWidth="1px">
                <TableContainer>
                  <Table>
                    <Thead>
                      <Tr alignItems="center">
                        <Th>Available Spaces</Th>
                        <Th>Occupied Spaces</Th>
                        <Th>Reserved Spaces</Th>
                        <Th />
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        {availableSpaces ? (
                          <Td>{availableSpaces.availableSpaces}</Td>
                        ) : (
                            <Td>Retrieving carpark information</Td>
                        )}
                        {occupiedSpaces ? (
                          <Td>{occupiedSpaces.occupiedSpaces}</Td>
                        ) : (
                            <Td>Retrieving carpark information</Td>
                        )}
                        {reservedSpaces ? (
                          <Td>{reservedSpaces.reservedSpaces}</Td>
                        ) : (
                          <Td>Retrieving carpark information</Td>
                        )}
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>
            </VStack>
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
