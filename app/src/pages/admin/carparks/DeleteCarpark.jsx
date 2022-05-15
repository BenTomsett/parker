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

const Delete = async (carpark) => {
  const path = 'api/carparks/'
  const fullPath = path.concat((carpark.carParkId).toString());

  return fetch(fullPath, {
    method: 'DELETE',
    headers: {
    }
  })
}

const DeleteCarpark = ({carpark, update}) =>{
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button colorScheme='red' onClick={onOpen}>Delete Carpark</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Carpark with ID: {carpark.carParkId}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h2> Are you sure you want to Delete this carpark? This can not be reversed!</h2>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='red' mr={3} onClick={async ()=> {
              await Delete(carpark);
              update();
            }}>
              Yes! Delete the Carpark
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteCarpark