import React, { useState } from 'react';
import {
  PaymentElement, useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { Button, Spinner, Stack, useToast } from '@chakra-ui/react';

const SetupForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const toast = useToast({status: 'error', isClosable: false});

  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();

    if (stripe && elements) {
      setLoading(true);
      const {error} = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: 'http://localhost:3000/register/billing/complete',
        }
      });

      if (error) {
        toast({ title: error.message })
        setLoading(false);
      }
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={4}>
        <PaymentElement />

        <Button disabled={loading} variant='solid' colorScheme='blue'
                type='submit'>
          {
            loading ? (
              <Spinner />
            ) : (
              'Submit'
            )
          }
        </Button>
      </Stack>
    </form>
  );
}

export default SetupForm;
