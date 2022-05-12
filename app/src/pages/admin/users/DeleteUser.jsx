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

const Delete = async (user) => {
  const path = 'api/users/'
  const fullPath = path.concat((user.userId).toString()) /* This is working as expected somewhere else failing */

  return fetch(fullPath, {
    method: 'DELETE',
    headers: {
    }
  })
}

const DeleteUser = ({user, update}) =>{
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button colorScheme='red' onClick={onOpen}>Delete User</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete User with ID: {user.userId}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h2> Are you sure you want to Delete this user? This can not be reversed!</h2>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='red' mr={3} onClick={async ()=> {
              await Delete(user);
              update();
            }}>
              Yes! Delete the user
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default DeleteUser;