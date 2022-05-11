/* eslint react/prop-types: 0 */

import React from 'react';
import {
  Button,
  FormLabel, Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

const EditUser = ({user}) =>{
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Edit</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User: {`${user.forename} ${user.surname}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <formControl>
              <FormLabel>Forename</FormLabel>
              <Input id='forename' placeholder={user.forename} />
              <FormLabel>Surname</FormLabel>
              <Input id='surname' placeholder={user.surname} />
              <FormLabel>Date of Birth</FormLabel>
              <Input id='dob' placeholder={user.dob} type="date" />
              <FormLabel>Email</FormLabel>
              <Input id='email' placeholder={user.email} />
              <FormLabel>New Password</FormLabel>
              <Input id='password' type="password" />
              <FormLabel>Address Line 1</FormLabel>
              <Input id='addressLine1' placeholder={user.addressLine1}/>
              <FormLabel>Address Line 2</FormLabel>
              <Input id='addressLine2' placeholder={user.addressLine2}/>
              <FormLabel>City</FormLabel>
              <Input id='city' placeholder={user.city}/>
              <FormLabel>Postcode</FormLabel>
              <Input id='postcode' placeholder={user.postcode}/>
              <FormLabel>Country</FormLabel>
              <Input id='country' placeholder={user.country}/>
            </formControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditUser;