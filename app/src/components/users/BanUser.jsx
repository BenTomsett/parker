/* eslint react/prop-types: 0 */
/* eslint no-else-return: 0 */

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

const toggleBanUser = async (user) => {
  const path = 'api/users/'
  const pathWithID = path.concat((user.userId).toString()) /* This is working as expected somewhere else failing */
  const fullPathBan = pathWithID.concat('/ban')
  const fullPathUnban = pathWithID.concat('/unban')

if(user.isBanned === false){
  return fetch(fullPathBan, {
    method: 'PUT',
    headers: {
    }
  })
}else{
  return fetch(fullPathUnban, {
    method: 'PUT',
    headers: {
    }
  })
}
}

const BanUser = ({user, update}) =>{
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button colorScheme='orange' onClick={onOpen}>Ban/Unban User</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ban: {user.forename.concat(' ',user.surname,'?')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <h2> Are you sure you want to ban this User?</h2>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              No
            </Button>
            <Button colorScheme='red' mr={3} onClick={async ()=> {
              await toggleBanUser(user);
              update();
            }}>
              Yes! Ban This User
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default BanUser;