/* eslint react/prop-types: 0 */

import React from 'react';
import {
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

const cancelSingleBooking = async (booking) => {
  const path = 'api/bookings/'
  const fullPath = path.concat((booking.bookingId).toString()) /* This is working as expected somewhere else failing */

  return fetch(fullPath, {
    method: 'DELETE',
    headers: {
    }
  })
}

const CancelBooking = ({booking, update}) =>{
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button colorScheme='red' onClick={onOpen}>Cancel</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cancel Booking with ID: {booking.bookingId}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h2> Are you sure you want to cancel this booking? All data related to this booking will be lost!</h2>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='red' mr={3} onClick={async ()=> {
              await cancelSingleBooking(booking);
              update();
            }}>
              Yes! Cancel this booking
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CancelBooking;