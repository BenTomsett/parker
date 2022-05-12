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

const Delete = async (requestedBooking) => {
  const path = 'api/bookingRequests/'
  const fullPath = path.concat((requestedBooking.bookingRequestId).toString()) /* This is working as expected somewhere else failing */

  return fetch(fullPath, {
    method: 'DELETE',
    headers: {
    }
  })
}

const DeleteRequestedBooking = ({requestedBooking, update}) =>{
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button colorScheme='red' onClick={onOpen}>Delete</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Booking Request with ID: {requestedBooking.bookingRequestId}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h2> Are you sure you want to Delete this booking request? This can not be reversed!</h2>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='red' mr={3} onClick={async ()=> {
              await Delete(requestedBooking);
              update();
            }}>
              Yes! Delete the Request
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteRequestedBooking;