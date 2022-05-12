import React from 'react';
import {Heading} from '@chakra-ui/react';
import UserList from '../../components/users/UserList';
import RequestBookingList from '../../components/users/RequestBookingList';
import useTitle from '../../hooks/useTitle';

const UsersPage = () => {
  useTitle("Admin Dashboard");

  return (
      <div>
        <Heading size="xl">Users</Heading>
        <Heading size="md">Here is a list of all Parker users</Heading>
        <br/>
        <UserList />

        <br/>

        <Heading size="xl">Bookings Requiring Approval</Heading>
        <Heading size="md">Here is a list of all booking requests currently requiring action.</Heading>
        <br/>
        <RequestBookingList />
        <br/>
      </div>
  )
};

export default UsersPage;
