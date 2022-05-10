/* eslint react/prop-types: 0 */

import React from 'react';
import {
  Button,
  FormLabel, Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

const ManageBooking = ({booking}) =>{
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Manage</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Manage Booking with Booking ID: {booking.bookingId}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <formControl>
              <FormLabel>Car Park</FormLabel>
              <Input id='carParkID' placeholder='INSERT CAR PARK ID' />
              <FormLabel>Space</FormLabel>
              <Input id='spaceId' placeholder={booking.spaceId} />
              <FormLabel>Start Time</FormLabel>
              <Input id='startTime' placeholder={booking.startDate.toLocaleString().slice(0,10).concat(' ').concat(booking.startDate.toLocaleString().slice(12,19))} />
              <FormLabel>End Time</FormLabel>
              <Input id='endTime' placeholder={booking.endDate.toLocaleString().slice(0,10).concat(' ').concat(booking.endDate.toLocaleString().slice(12,19))} />
            </formControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ManageBooking;