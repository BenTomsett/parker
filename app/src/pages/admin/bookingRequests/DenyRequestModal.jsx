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
  ModalOverlay, Spinner,
  useDisclosure,
} from '@chakra-ui/react';

const DenyRequestModal = ({request, update}) =>{
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [submitting, setSubmitting] = useState(false);
  const denyRequest = async () => {
    setSubmitting(true);
    return fetch(`/api/bookingRequests/deny/${request.bookingRequestId}`, {
      method: 'DELETE',
    });
  }

  return (
    <>
      <Button colorScheme='red' onClick={onOpen}>Deny</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deny booking request</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h2>Are you sure you want to deny this booking request?</h2>
          </ModalBody>

          <ModalFooter>
            <HStack>
              <Button colorScheme='red' onClick={async ()=> {
                await denyRequest(request);
                update();
              }}>
                {submitting ? (
                  <Spinner />
                ) : "Deny request"}
              </Button>
              <Button onClick={onClose}>
                No
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DenyRequestModal;