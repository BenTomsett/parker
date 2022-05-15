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

const DeleteUser = ({ user, update }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteUser = async () => fetch(`api/users/${user.userId}`, {
    method: 'DELETE',
  });

  return (
    <>
      <Button colorScheme='red' onClick={onOpen}>Delete User</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete user</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h2> Are you sure you want to delete this user?</h2>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={async () => {
              await deleteUser();
              update();
            }}>
              Delete user
            </Button>
            <Button mr={3} onClick={onClose}>
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteUser;