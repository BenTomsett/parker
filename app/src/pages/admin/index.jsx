import React from 'react';
import {
  Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack,
} from '@chakra-ui/react';
import useTitle from '../../hooks/useTitle';
import BookingRequestList from './bookingRequests/BookingRequestList';
import UserList from './users/UserList';
import CarparkList from './carparks/CarparkList';

const UsersPage = () => {
  useTitle('Admin Dashboard');

  return (

    <VStack align='start' spacing={4} height='100%'>
      <VStack align='start' spacing={0}>
        <Heading size='lg'>Admin</Heading>
        <Text fontSize='xl'>Manage car parks, booking requests and users</Text>
      </VStack>
      <Tabs w="100%">
        <TabList>
          <Tab>Car Parks</Tab>
          <Tab>Booking requests</Tab>
          <Tab>Users</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CarparkList />
          </TabPanel>
          <TabPanel>
            <BookingRequestList />
          </TabPanel>
          <TabPanel>
            <UserList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>

  );
};

export default UsersPage;
