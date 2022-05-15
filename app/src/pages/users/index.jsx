import React from 'react';
import {Heading} from '@chakra-ui/react';
import UserList from '../../components/users/Zonelist';
import useTitle from '../../hooks/useTitle';

const UsersPage = () => {
  useTitle("Users");

  return (
      <div>
        <Heading size="xl">Users</Heading>
        <Heading size="md">Here is a list of all Parker users</Heading>
        <UserList />
      </div>
  )
};

export default UsersPage;
