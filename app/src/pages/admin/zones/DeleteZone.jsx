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

const Delete = async (zone) => {
  const path = 'api/zones/'
  const fullPath = path.concat((zone.zoneId).toString()) /* This is working as expected somewhere else failing */

  return fetch(fullPath, {
    method: 'DELETE',
    headers: {
    }
  })
}

const DeleteZone = ({zone, update}) =>{
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button colorScheme='red' onClick={onOpen}>Delete Zone</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete zone with ID: {zone.zoneId}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h2> Are you sure you want to Delete this zone? This can not be reversed!</h2>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='red' mr={3} onClick={async ()=> {
              await Delete(zone);
              update();
            }}>
              Yes! Delete the zone
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteZone;