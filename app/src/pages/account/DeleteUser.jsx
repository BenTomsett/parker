/* eslint react/prop-types: 0 */

import React, {useContext} from 'react';
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

import {useNavigate} from "react-router-dom";
import UserContext from '../../context/user';

const DeleteUser = () => {
  const { userId } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const deleteUser = async () => fetch(`api/users/${userId}`, {
    method: 'DELETE',
  });

  return (
    <>
      <Button colorScheme='red' w="100%" onClick={onOpen}>Close your parker account</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Close your parker account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h2> Are you sure you want to delete your account?</h2>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={async () => {
              await deleteUser();
              navigate('/login')
            }}>
              Yes
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