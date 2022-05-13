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

const cancelSingleBooking = async (booking) => {
  const path = 'api/bookings/'
  const fullPath = path.concat((booking.bookingId).toString()) /* This is working as expected somewhere else failing */

  return fetch(fullPath, {
    method: 'DELETE',
    headers: {
    }
  })
}

const CancelBookingModal = ({booking, update}) =>{
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);

  return (
    <>
      <Button colorScheme='red' onClick={onOpen}>Cancel</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cancel booking</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to cancel this booking for {booking.ParkingSpace.CarPark.name}?</Text>
            <br />
            <Text fontWeight="bold">You will have to request a new booking if you change your mind.</Text>
          </ModalBody>

          <ModalFooter>
            <HStack>
              <Button colorScheme='red' onClick={async ()=> {
                setLoading(true);
                await cancelSingleBooking(booking);
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
  )
}

export default CancelBookingModal;