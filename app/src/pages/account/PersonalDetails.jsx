import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input, Spinner, Stack,
  useToast,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../../context/user';
import { emailRegex, checkAge } from '../../utils/auth';
import useTitle from '../../hooks/useTitle';
import DeleteUser from "./DeleteUser";

const PersonalDetails = () => {
  useTitle('Personal details - Account');

  const [formData, setFormData] = useState(undefined);
  const { userId } = useContext(UserContext);

  const [submitting, setSubmitting] = useState(false);

  const successToast = useToast({status: 'success', isClosable: false});
  const errorToast = useToast({status: 'error', isClosable: false});

  const fetchUser = () => {
    fetch(`/api/users/${userId}`, {
      method: 'GET',
    }).then((response) => {
      response.json().then((json) => {
        setFormData(json);
      });
    });
  };

  useEffect(() => {
    fetchUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      errorToast({ title: 'Please enter your name.' });
    } else if (!email || !emailRegex.test(email)) {
      errorToast({ title: 'Please enter a valid email address.' });
    } else if (!dob) {
      errorToast({ title: 'Please enter your date of birth.' });
    } else if (dobParsed > new Date() || !checkAge(dobParsed)) {
      errorToast({ title: 'You must be at least 16 year of age to use Parker.' });
    } else if (!addressLine1 || !addressLine2 || !city || !postcode ||
      !country) {
      errorToast({ title: 'You must be at least 16 year of age to use Parker.' });
    } else {
      setSubmitting(true);
      fetch(`/api/users/${userId}`, {
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
              errorToast({ title: 'A user with that email address already exists.' });
            } else {
              errorToast(
                { title: 'An unexpected error occurred whilst trying to update your account.' });
            }
          });
        } else {
          successToast({title: 'Changes saved successfully!'})
        }
        setSubmitting(false);
      });
    }
  };

  return (
    formData ? (
      <Box width={{base: '100%', md: "60%"}} align='center'>
        <form onSubmit={onSubmit}>
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

          <br />
          <Button w='100%' colorScheme='blue' mr={3} type='submit'>
            {submitting ? (
              <Spinner />
            ) : "Update"}
          </Button>
        </form>
        <br />
        <DeleteUser />
      </Box>
    ) : (
      <Spinner />
    )
  )
};

export default PersonalDetails;