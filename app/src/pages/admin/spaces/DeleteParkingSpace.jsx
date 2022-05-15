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

const Delete = async (parkingSpace) => {
  const path = 'api/spaces/'
  const fullPath = path.concat((parkingSpace.spaceId).toString())

  return fetch(fullPath, {
    method: 'DELETE',
    headers: {
    }
  })
}

const DeleteParkingSpace = ({parkingSpace, update}) =>{
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button colorScheme='red' onClick={onOpen}>Delete Space</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete space {parkingSpace.spaceNo} in {parkingSpace.CarPark.name} </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h2> Are you sure you want to Delete this space? This can not be reversed!</h2>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='red' mr={3} onClick={async ()=> {
              await Delete(parkingSpace);
              update();
            }}>
              Yes! Delete the space
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteParkingSpace;