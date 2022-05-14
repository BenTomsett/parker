import {
  Box,
  Button,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ReplaceCardModal from './ReplaceCardModal';
import useTitle from '../../hooks/useTitle';

const stripePromise = loadStripe('pk_test_51KpD3VJco8WC89Kxw5WXEmDrCzwAI6J8xIYursnSBSMt7L0oaqrGlqQu3pQ2uo4AgTMgMtFI4xcGaPFFnbxexSgG00G9yHR2zH');

const PaymentInformation = () => {
  useTitle('Payment information - Account');

  const [paymentMethod, setPaymentMethod] = useState(undefined);
  const [clientSecret, setClientSecret] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const toast = useToast({ status: 'error', isClosable: false });

  const fetchPaymentMethod = () => {
    fetch('/api/payments/paymentMethod', {
      method: 'GET',
    }).then((response) => {
      response.json().then((json) => {
        setPaymentMethod({
          brand: json.card.brand[0].toUpperCase() +
            json.card.brand.substring(1),
          expiry: `${json.card.exp_month}/${json.card.exp_year}`,
          last4: json.card.last4,
        });
      });
    });
  };

  useEffect(() => {
    fetchPaymentMethod();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const updateCard = () => {
    setLoading(true);
    fetch('/api/payments/createSetupIntent', {
      method: 'POST',
    }).then((response) => {
      if (response.status === 201) {
        response.json().then((json) => {
          setClientSecret(json.client_secret);
          onOpen();
        });
      } else {
        toast({
          title: 'An unexpected error occurred when trying to set up billing.',
        });
      }
    });
  };

  return (
    paymentMethod ? (
      <Box borderWidth='1px' w='100%'>

        {clientSecret && (
          <Elements stripe={stripePromise} options={{clientSecret}}>
            <ReplaceCardModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
          </Elements>
        )}

        <TableContainer>
          <Table>
            <Thead>
              <Tr alignItems='center'>
                <Th>Type</Th>
                <Th>Last 4 digits</Th>
                <Th>Expiry date</Th>
                <Th />
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>{paymentMethod.brand}</Td>
                <Td>•••• {paymentMethod.last4}</Td>
                <Td>{paymentMethod.expiry}</Td>
                <Td>
                  <Button colorScheme='orange' onClick={updateCard}>{
                    loading ? (
                      <Spinner />
                    ) : (
                      'Update card'
                    )
                  }
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    ) : (
      <Spinner />
    )
  );
};

export default PaymentInformation;