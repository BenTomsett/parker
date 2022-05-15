/* eslint react/prop-types: 0 */

import React, { useEffect, useState } from 'react';
import {
  Box,
  Container, Divider,
  Heading, Image, Spinner,
  Stack, useBreakpointValue, useToast,
} from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import useTitle from '../../../hooks/useTitle';
import { ProgressSteps } from '../../../components';

import logo from '../../../parker.svg';

const steps = [
  { key: 'account', label: '1. Create account' },
  { key: 'payment', label: '2. Set up billing' },
];

const stripePromise = loadStripe('pk_test_51KpD3VJco8WC89Kxw5WXEmDrCzwAI6J8xIYursnSBSMt7L0oaqrGlqQu3pQ2uo4AgTMgMtFI4xcGaPFFnbxexSgG00G9yHR2zH');

const BillingSetupPage = () => {
  useTitle('Billing setup');

  const toast = useToast({status: 'error', isClosable: false});

  const [clientSecret, setClientSecret] = useState(undefined);

  useEffect(() => {
    const paramsClientsecret = new URLSearchParams(window.location.search).get(
      'setup_intent_client_secret'
    );

    if(!paramsClientsecret){
      fetch('/api/payments/createSetupIntent', {
        method: 'POST',
      }).then((response) => {
        if (response.status === 201) {
          response.json().then((json) => {
            setClientSecret(json.client_secret);
          });
        } else {
          toast({
            title: 'An unexpected error occurred when trying to set up billing.',
          })
        }
      });
    }else{
      setClientSecret(paramsClientsecret)
    }
  }, [toast]);

  return (
    <Container maxW='xl' py={{ base: '12', md: '24' }}
               px={8}>
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
          p={8}
          bg={useBreakpointValue({ base: 'transparent', sm: 'bg-surface' })}
          borderRadius={{ base: 'none', sm: 'xl' }}
          borderWidth={1}
        >
          <Stack spacing='4'>
            <ProgressSteps steps={steps} active={1} />

            <Divider />

            {clientSecret ? (
              <Elements stripe={stripePromise} options={{clientSecret}}>
                <Outlet />
              </Elements>
            ) : (
              <Spinner />
            )}
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default BillingSetupPage;
