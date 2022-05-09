/* eslint react/prop-types: 0 */

import React, { useState } from 'react';
import {
  Box,
  Button,
  Container, Divider, FormControl, FormLabel,
  Heading,
  HStack, Image, Input, Spinner,
  Stack,
  Text, useBreakpointValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import { ProgressSteps } from '../../components';

import logo from '../../parker.svg';
import { emailRegex, getAge, strongPassRegex } from '../../utils/auth';

const steps = [
  { key: 'account', label: '1. Create account' },
  { key: 'payment', label: '2. Set up billing' },
];

const RegisterPage = () => {
  useTitle('Register');

  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const updateFormData = (property, value) => {
    setFormData((prevState => ({
      ...prevState,
      [property]: value,
    })));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError(undefined);

    const {
      forename,
      surname,
      email,
      password,
      dob,
      addressLine1,
      addressLine2,
      city,
      postcode,
      country,
    } = formData;

    const dobParsed = new Date(Date.parse(dob));

    if(!forename || !surname){
      setError('Please enter your name.')
    } else if (!email || !emailRegex.test(email)){
      setError('Please enter a valid email address.')
    } else if(!password || !strongPassRegex.test(password)){
      setError('Please enter a valid password with 8 characters, and at least one capital letter, one symbol, and one number.');
    }else if(!dob){
      setError("Please enter your date of birth.");
    }else if(getAge(dobParsed) <= 16){
      setError("You must be at least 16 year of age to use Parker.");
    }else if(!addressLine1 || !addressLine2 || !city || !postcode || !country){
      setError('Please enter your address.');
    }else{
      setLoading(true);
      fetch('/api/users', {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        if(response.status !== 201){
          response.text().then((text) => {
            if(text === "ERR_USER_EXISTS"){
              setError("A user with that email address already exists - sign in to access your Parker account.")
            } else {
              setError("An unexpected error occurred whilst trying to create your account.")
            }
            setLoading(false);
          });
        }else{
          navigate('/register/billing')
        }
      })
    }
  };

  return (
    <Container maxW='xl' py={{ base: '12', md: '24' }}
               px={{ base: '0', sm: '8' }}>
      <Stack spacing='8'>
        <Stack spacing='6'>
          <Image src={logo} alt='Parker logo' h={35} />
          <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
            <Heading size='md'>
              Sign up
            </Heading>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
          borderRadius={{ base: 'none', sm: 'xl' }}
          borderWidth={1}
        >
          <form onSubmit={onSubmit}>
            <Stack spacing='4'>
              <ProgressSteps steps={steps} active={0} />

              <Divider />

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
              <HStack>
                <FormControl>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <Input id='email' type='email' autoComplete='email'
                         value={formData.email || ''}
                         onChange={(event) => updateFormData('email',
                           event.target.value)} />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <Input id='password' type='password'
                         autoComplete='current-password'
                         value={formData.password || ''}
                         onChange={(event) => updateFormData('password',
                           event.target.value)} />
                </FormControl>
              </HStack>
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

              <Text color="red">{error}</Text>

              <Button disabled={loading} variant='solid' colorScheme='blue' type='submit'>
                {
                  loading ? (
                    <Spinner />
                  ) : (
                    'Next'
                  )
                }
              </Button>
            </Stack>
          </form>
        </Box>
        <HStack spacing='1' justify='center'>
          <Text color='muted'>Already have an account?</Text>
          <Button
            variant='link'
            colorScheme='blue'
            onClick={() => {
              navigate('/login');
            }}>Sign in</Button>
        </HStack>
      </Stack>
    </Container>
  );
};

export default RegisterPage;
