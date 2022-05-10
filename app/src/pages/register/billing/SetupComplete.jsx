/* eslint react/prop-types: 0 */

import React, { useEffect, useState } from 'react';
import { Button, Center,
  Heading, Spinner, Text, VStack,
} from '@chakra-ui/react';
import { Elements, useStripe } from '@stripe/react-stripe-js';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { loadStripe } from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';
import useTitle from '../../../hooks/useTitle';

const SetupComplete = () => {
  useTitle('Billing setup');

  const stripe = useStripe();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(undefined);

  useEffect(() => {
    if(stripe){
      const clientSecret = new URLSearchParams(window.location.search).get(
        'setup_intent_client_secret'
      );

      stripe
      .retrieveSetupIntent(clientSecret)
      .then(({setupIntent}) => {
        if(setupIntent.status === 'requires_payment_method'){
          setSuccess(false);
        }else if(setupIntent.status === 'succeeded'){

          fetch('/api/payments/storePaymentMethod', {
            method: "POST",
            body: JSON.stringify({
              paymentMethodId: setupIntent.payment_method
            }),
            headers: {
              "Content-Type": "application/json"
            }
          }).then((response) => {
            if(response.status === 200) {
              setSuccess(true);
            }else{
              setSuccess(false);
            }
            setLoading(false);
          })
        }
      });
    }
  }, [stripe])

  return (
    loading ? (
      <Center>
        <Spinner />
      </Center>
    ) : (
      <Center>
        {success ? (
          <VStack spacing={4}>
            <FiCheckCircle size='64px' color='green' />
            <Heading textAlign='center'>Success!</Heading>
            <Text textAlign='center'>Your payment method was added successfully
              - you are now ready to start using Parker.</Text>
            <Button variant='solid' colorScheme='blue' onClick={() => {
              navigate('/');
            }}>Start</Button>
          </VStack>
        ) : (
          <VStack spacing={4}>
            <FiXCircle size='64px' color='red' />
            <Heading textAlign='center'>Error</Heading>
            <Text textAlign='center'>We were unable to process your payment method. Please try again - if you get the same error again, try a different payment method.</Text>
            <Button variant='solid' colorScheme='blue' onClick={() => {
              navigate('/register/billing');
            }}>Try again</Button>
          </VStack>
        )}
      </Center>
    )
  );
};

const stripePromise = loadStripe(
  'pk_test_51KpD3VJco8WC89Kxw5WXEmDrCzwAI6J8xIYursnSBSMt7L0oaqrGlqQu3pQ2uo4AgTMgMtFI4xcGaPFFnbxexSgG00G9yHR2zH');

const SetupCompletePage = () => (
  <Elements stripe={stripePromise}>
    <SetupComplete />
  </Elements>
);

export default SetupCompletePage;
