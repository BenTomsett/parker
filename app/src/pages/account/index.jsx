import React from 'react';
import { Heading } from '@chakra-ui/react';
import useTitle from '../../hooks/useTitle';

const AccountPage = () => {
  useTitle("Account");

  return <Heading size="xl">Account</Heading>;
};

export default AccountPage;
