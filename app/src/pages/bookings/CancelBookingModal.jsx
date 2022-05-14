/* eslint react/prop-types: 0 */

import React, { useState } from 'react';
import {
  Button, HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, Spinner, Text,
  useDisclosure,
} from '@chakra-ui/react';

const CancelBookingModal = ({ booking, update }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);

  const cancelBooking = async () => fetch(`/api/bookings/${booking.bookingId}`,
    {
      method: 'DELETE',
    });

  return (
    <>
      <Button colorScheme='red' onClick={onOpen}>Cancel</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cancel booking</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to cancel this booking
              for {booking.ParkingSpace.CarPark.name}?</Text>
            <br />
            <Text fontWeight='bold'>You will have to request a new booking if
              you change your mind.</Text>
          </ModalBody>

          <ModalFooter>
            <HStack>
              <Button colorScheme='red' onClick={async () => {
                setLoading(true);
                await cancelBooking(booking);
                update();
              }}>
                {loading ? (
                  <Spinner />
                ) : 'Cancel booking'}
              </Button>
              <Button onClick={onClose}>
                Back
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CancelBookingModal;