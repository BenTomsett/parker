import React, {useState} from 'react';
import {
  Box,
  Button,
  Container, FormControl, FormLabel,
  Heading,
  HStack, Image, Input, Spinner,
  Stack,
  Text, useBreakpointValue,
} from '@chakra-ui/react';
import {useNavigate} from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import logo from '../../parker.svg';

const LoginPage = () => {
  useTitle('Login');

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(undefined);

  const [loading, setLoading] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if(response.status === 200){
        navigate('/');
      }else if(response.status === 401) {
        setError('Incorrect username or password');
      }
      setLoading(false);
    });
  };

  return (
      <Container maxW="lg" py={{base: '12', md: '24'}}
                 px={{base: '0', sm: '8'}}>
        <Stack spacing="8">
          <Stack spacing="6">
            <Image src={logo} alt="Parker logo" h={35}/>
            <Stack spacing={{base: '2', md: '3'}} textAlign="center">
              <Heading size="md">
                Log in to your account
              </Heading>
            </Stack>
          </Stack>
          <Box
              py={{base: '0', sm: '8'}}
              px={{base: '4', sm: '10'}}
              bg={useBreakpointValue({base: 'transparent', sm: 'bg-surface'})}
              borderRadius={{base: 'none', sm: 'xl'}}
              borderWidth={1}
          >
            <form onSubmit={onSubmit}>
              <Stack spacing="4">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input id="email" type="email" autoComplete="email"
                         value={email}
                         onChange={(event) => setEmail(event.target.value)}/>
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input id="password" type="password"
                         autoComplete="current-password" value={password}
                         onChange={(event) => setPassword(event.target.value)}/>
                </FormControl>

                {error !== undefined &&
                    <Text color="red">{error}</Text>
                }

                <Button variant="solid" colorScheme="blue"
                        type="submit">
                  {
                    loading ? (
                        <Spinner />
                    ) : (
                        "Sign in"
                    )
                  }
                </Button>
              </Stack>
            </form>
          </Box>
          <HStack spacing="1" justify="center">
            <Text color="muted">Don&apos;t have an account?</Text>
            <Button
                variant="link"
                colorScheme="blue"
                onClick={() => {
                  navigate('/register');
                }}>Sign up</Button>
          </HStack>
        </Stack>
      </Container>
  );
};

export default LoginPage;
