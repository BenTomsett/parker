
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Textarea, Stack,
  Heading,
  VStack,
  Text, useToast,
} from '@chakra-ui/react';

import React, {useContext, useState} from "react";
import UserContext from '../../context/user';
import useTitle from '../../hooks/useTitle';

const HelpPage = () => {

  useTitle('Help');

  const successToast = useToast({status: 'success', isClosable: false});
  const [formData, setFormData] = useState({});

  const updateFormData = (property, value) => {
    setFormData((prevState => ({
      ...prevState,
      [property]: value,
    })));
  };
  const { userId } = useContext(UserContext);
  const onSubmit = (event) => {

    event.preventDefault();
    fetch(`/api/users/email/`, {
      method: 'POST',
      body:JSON.stringify({
        text:formData.text,
        'userId': userId
      }),
      headers: {
        "Content-Type": "application/json",
      }
    }).then((response) => {
      if(response.status === 200){
        successToast({title:"Message Sent!"})
      }
    });

  }
  return (
    <VStack align='start' spacing={4} height='100%'>
      <Stack justifyContent='space-between' w='100%' align={{base: 'left', md: 'center'}} direction={{base: 'column', md: 'row'}}>
        <VStack align='start' spacing={0}>
          <Heading size='lg'>Help Page.</Heading>
          <Text fontSize='xl'>Use this form to contact Admins with any problems, or call 01603 123456</Text>
        </VStack>
      </Stack>

        <Box width={{base: '100%', md: "60%"}} align='center'>
          <form onSubmit={onSubmit}>

                <FormControl>
                  <FormLabel htmlFor='text'>Message to admin</FormLabel>
                  <Textarea id='textbox'
                         placeholder="Enter your message here:"
                         onChange={(event) => updateFormData('text',
                             event.target.value)} />
                </FormControl>


            <br />
            <Button w='100%' colorScheme='blue' mr={3} type='submit' onClick={onSubmit}>
               Send
            </Button>
          </form>
          <br />
        </Box>
    </VStack>
  )
};

export default HelpPage;
