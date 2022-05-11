/* eslint react/prop-types: 0 */

import React from 'react';
import {
  Button,
  FormLabel,
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
      <Button onClick={onOpen}>View</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Details of Booking with Booking ID: {booking.bookingId}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>Below you can see the details for your booking: </p>
            <formControl>
              <FormLabel>Car Park</FormLabel><input id='carParkID' readOnly placeholder='INSERT CAR PARK ID' />
              <FormLabel>Parking Space</FormLabel><input id='spaceId' readOnly placeholder={booking.spaceId} />
              <FormLabel>Time and Date of Arrival</FormLabel>
              <input id='startTime' readOnly placeholder={booking.startDate.toLocaleString().slice(0,10).concat(' ').concat(booking.startDate.toLocaleString().slice(12,19))}/>
              <FormLabel>Departure Time and Date</FormLabel>
              <input id='endTime' readOnly placeholder={booking.endDate.toLocaleString().slice(0,10).concat(' ').concat(booking.endDate.toLocaleString().slice(12,19))} />
            </formControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>Close </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ManageBooking;