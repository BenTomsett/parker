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

const CancelRequestModal = ({request, update}) =>{
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);

  const cancelRequest = async () => fetch(`/api/bookingRequests/${request.bookingRequestId}`,
    {
      method: 'DELETE',
    });

  return (
    <>
      <Button colorScheme='red' onClick={onOpen}>Cancel</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cancel booking request</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to cancel this booking request?</Text>
          </ModalBody>

          <ModalFooter>
            <HStack>
              <Button colorScheme='red' onClick={async ()=> {
                setLoading(true);
                await cancelRequest(request);
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

export default CancelRequestModal;