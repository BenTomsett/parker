import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input, Spinner, Stack,
  useToast,
} from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import UserContext from '../../context/user';
import { strongPassRegex } from '../../utils/auth';
import useTitle from '../../hooks/useTitle';

const ChangePassword = () => {
  useTitle('Change password - ');

  const [formData, setFormData] = useState({});
  const { userId } = useContext(UserContext);

  const [submitting, setSubmitting] = useState(false);

  const successToast = useToast({status: 'success', isClosable: false});
  const errorToast = useToast({status: 'error', isClosable: false});

  const updateFormData = (property, value) => {
    setFormData((prevState => ({
      ...prevState,
      [property]: value,
    })));
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const {
      password,
      confirmPassword,
    } = formData;

    if (!password) {
      errorToast({ title: 'You must enter a new password' });
    } else if (!confirmPassword) {
      errorToast({ title: 'Please confirm your password.' });
    } else if (password !== confirmPassword) {
      errorToast({ title: 'Those passwords don\'t match' });
    } else if (!strongPassRegex.test(password)) {
      errorToast({ title: 'Please enter a valid password with 8 characters, and at least one capital letter, one symbol, and one number.' });
    } else {
      setSubmitting(true);
      fetch(`/api/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        if (response.status !== 200) {
          response.text().then((text) => {
            if (text === 'ERR_PASSWORD_WEAK') {
              errorToast({ title: 'Please enter a valid password with 8 characters, and at least one capital letter, one symbol, and one number.' });
            } else {
              errorToast(
                { title: 'An unexpected error occurred whilst trying to update your password.' });
            }
          });
        } else {
          successToast({title: 'New password saved successfully!'})
        }
        setSubmitting(false);
      });
    }
  };

  return (
    <Box w='60%' align='center'>
      <form onSubmit={onSubmit}>
        <Stack spacing={4}>
          <HStack>
            <FormControl>
              <FormLabel htmlFor='password'>New password</FormLabel>
              <Input id='password' autoComplete='new-password'
                     type="password" value={formData.password || ''}
                     onChange={(event) => updateFormData('password',
                       event.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor='confirmPassword'>Confirm</FormLabel>
              <Input id='confirmPassword' autoComplete='new-password'
                     type="password" value={formData.confirmPassword || ''}
                     onChange={(event) => updateFormData('confirmPassword',
                       event.target.value)} />
            </FormControl>
          </HStack>
        </Stack>

        <br />
        <Button w='100%' colorScheme='blue' mr={3} type='submit'>
          {submitting ? (
            <Spinner />
          ) : "Update"}
        </Button>
      </form>
    </Box>
  )
};

export default ChangePassword;