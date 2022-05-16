/* eslint react/prop-types: 0 */

import React, { useState } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, Stack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { emailRegex, checkAge } from '../../../utils/auth';

const EditUser = ({ user, update }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast({ status: 'error', isClosable: false });

  const [formData, setFormData] = useState(user);

  const updateFormData = (property, value) => {
    setFormData((prevState => ({
      ...prevState,
      [property]: value,
    })));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const {
      forename,
      surname,
      email,
      dob,
      addressLine1,
      addressLine2,
      city,
      postcode,
      country,
    } = formData;

    const dobParsed = new Date(Date.parse(dob));

    if (!forename || !surname) {
      toast({ title: 'Please enter your name.' });
    } else if (!email || !emailRegex.test(email)) {
      toast({ title: 'Please enter a valid email address.' });
    } else if (!dob) {
      toast({ title: 'Please enter your date of birth.' });
    } else if (dobParsed > new Date() || !checkAge(dobParsed)) {
      toast({ title: 'You must be at least 16 year of age to use Parker.' });
    } else if (!addressLine1 || !addressLine2 || !city || !postcode ||
      !country) {
      toast({ title: 'You must be at least 16 year of age to use Parker.' });
    } else {
      fetch(`/api/users/${user.userId}`, {
        method: 'PUT',
        body: JSON.stringify({
          forename,
          surname,
          email,
          dob,
          addressLine1,
          addressLine2,
          city,
          postcode,
          country,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        if (response.status !== 200) {
          response.text().then((text) => {
            if (text === 'ERR_USER_EXISTS') {
              toast({ title: 'A user with that email address already exists.' });
            } else {
              toast(
                { title: 'An unexpected error occurred whilst trying to update this account.' });
            }
          });
        }else{
          update();
          onClose();
        }
      });
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Edit</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={onSubmit}>
            <ModalHeader>Edit user</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={4}>
                <HStack>
                  <FormControl>
                    <FormLabel htmlFor='forename'>First name</FormLabel>
                    <Input id='forename' autoComplete='given-name'
                           value={formData.forename || ''}
                           onChange={(event) => updateFormData('forename',
                             event.target.value)} />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor='surname'>Last name</FormLabel>
                    <Input id='surname' autoComplete='family-name'
                           value={formData.surname || ''}
                           onChange={(event) => updateFormData('surname',
                             event.target.value)} />
                  </FormControl>
                </HStack>
                <FormControl>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <Input id='email' type='email' autoComplete='email'
                         value={formData.email || ''}
                         onChange={(event) => updateFormData('email',
                           event.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='dob'>Date of birth</FormLabel>
                  <Input id='dob' type='date'
                         autoComplete='bday'
                         value={formData.dob || ''}
                         onChange={(event) => updateFormData('dob',
                           event.target.value)} />
                </FormControl>

                <FormControl>
                  <FormLabel htmlFor='addressLine1'>Address line 1</FormLabel>
                  <Input id='addressLine1' autoComplete='address-line1'
                         value={formData.addressLine1 || ''}
                         onChange={(event) => updateFormData('addressLine1',
                           event.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='addressLine2'>Address line 2</FormLabel>
                  <Input id='addressLine2' autoComplete='address-line2'
                         value={formData.addressLine2 || ''}
                         onChange={(event) => updateFormData('addressLine2',
                           event.target.value)} />
                </FormControl>
                <HStack>
                  <FormControl>
                    <FormLabel htmlFor='city'>City</FormLabel>
                    <Input id='city' autoComplete='address-level2'
                           value={formData.city || ''}
                           onChange={(event) => updateFormData('city',
                             event.target.value)} />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor='postcode'>Postcode</FormLabel>
                    <Input id='postcode' autoComplete='postal-code'
                           value={formData.postcode || ''}
                           onChange={(event) => updateFormData('postcode',
                             event.target.value)} />
                  </FormControl>
                </HStack>
                <FormControl>
                  <FormLabel htmlFor='country'>Country</FormLabel>
                  <Input id='country' autoComplete='country-name'
                         value={formData.country || ''}
                         onChange={(event) => updateFormData('country',
                           event.target.value)} />
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} type='submit'>
                Update
              </Button>
            </ModalFooter>

          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditUser;