import React, {useContext, useState} from 'react';
import {
  Button, FormControl, FormLabel,
  Heading, HStack, Input, Text, toast, useDisclosure,
} from '@chakra-ui/react';
import useTitle from '../../hooks/useTitle';
import {emailRegex, getAge, strongPassRegex} from "../../utils/auth";
import UserContext from "../../context/user";



const AccountPage = () => {
  useTitle("Account");

  const {isOpen, onOpen, onClose} = useDisclosure()
  const user = useContext(UserContext);
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
      password,
      dob,
      addressLine1,
      addressLine2,
      city,
      postcode,
      country,
    } = formData;

    const dobParsed = new Date(Date.parse(dob));

    if (!forename || !surname) {
      toast({title: 'Please enter your name.'})
    } else if (!email || !emailRegex.test(email)) {
      toast({title: 'Please enter a valid email address.'})
    } else if (password && !strongPassRegex.test(password)) {
      toast({title: 'Please enter a valid password with 8 characters, and at least one capital letter, one symbol, and one number.'})
    } else if (!dob) {
      toast({title: "Please enter your date of birth."})
    } else if (getAge(dobParsed) <= 16) {
      toast({title: "You must be at least 16 year of age to use Parker."})
    } else if (!addressLine1 || !addressLine2 || !city || !postcode || !country) {
      toast({title: "You must be at least 16 year of age to use Parker."})
    } else {

      fetch(`/api/users/${user.userId}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => {
        if (response.status !== 200) {
          response.text().then((text) => {
            if (text === "ERR_USER_EXISTS") {
              toast({title: "A user with that email address already exists."})
            } else {
              toast({title: "An unexpected error occurred whilst trying to create your account."})
            }

          });
        }else{
          onClose();
        }
      })
    }
  };

  return (

    <div>
      <Heading size="xl">Account</Heading>
      <br/>
      <Heading size="md">Welcome to your account page</Heading>
      <Text>On this page you can and modify all of your personal details held by the Parker system.
        <br/>You can also view and edit your payment details under the Billing Details Section of the page.<br/></Text>

      <box w="60%">
          <form onSubmit={onSubmit}>
              <HStack>
                <FormControl>
                  <FormLabel htmlFor='forename'>First name</FormLabel>
                  <Input id='forename' autoComplete='given-name'
                         value={formData.forename || ''}
                         onChange={(event) => updateFormData('forename',
                           event.target.value)}/>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='surname'>Last name</FormLabel>
                  <Input id='surname' autoComplete='family-name'
                         value={formData.surname || ''}
                         onChange={(event) => updateFormData('surname',
                           event.target.value)}/>
                </FormControl>
              </HStack>
              <HStack>
                <FormControl>
                  <FormLabel htmlFor='email'>Email</FormLabel>
                  <Input id='email' type='email' autoComplete='email'
                         value={formData.email || ''}
                         onChange={(event) => updateFormData('email',
                           event.target.value)}/>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='password'>Password</FormLabel>
                  <Input id='password' type='password'
                         autoComplete='current-password'
                         value={formData.password || ''}
                         onChange={(event) => updateFormData('password',
                           event.target.value)}/>
                </FormControl>
              </HStack>
              <FormControl>
                <FormLabel htmlFor='dob'>Date of birth</FormLabel>
                <Input id='dob' type='date'
                       autoComplete='bday'
                       value={formData.dob || ''}
                       onChange={(event) => updateFormData('dob',
                         event.target.value)}/>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='addressLine1'>Address line 1</FormLabel>
                <Input id='addressLine1' autoComplete='address-line1'
                       value={formData.addressLine1 || ''}
                       onChange={(event) => updateFormData('addressLine1',
                         event.target.value)}/>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor='addressLine2'>Address line 2</FormLabel>
                <Input id='addressLine2' autoComplete='address-line2'
                       value={formData.addressLine2 || ''}
                       onChange={(event) => updateFormData('addressLine2',
                         event.target.value)}/>
              </FormControl>
              <HStack>
                <FormControl>
                  <FormLabel htmlFor='city'>City</FormLabel>
                  <Input id='city' autoComplete='address-level2'
                         value={formData.city || ''}
                         onChange={(event) => updateFormData('city',
                           event.target.value)}/>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor='postcode'>Postcode</FormLabel>
                  <Input id='postcode' autoComplete='postal-code'
                         value={formData.postcode || ''}
                         onChange={(event) => updateFormData('postcode',
                           event.target.value)}/>
                </FormControl>
              </HStack>
              <FormControl>
                <FormLabel htmlFor='country'>Country</FormLabel>
                <Input id='country' autoComplete='country-name'
                       value={formData.country || ''}
                       onChange={(event) => updateFormData('country',
                         event.target.value)}/>
              </FormControl>


              <Button colorScheme='blue' mr={3} type="submit">
                Update
              </Button>

          </form>
      </box>

    </div>
  )
};

export default AccountPage;
