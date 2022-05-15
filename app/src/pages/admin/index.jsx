import React from 'react';
import {
    Button,Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text,
} from '@chakra-ui/react';
import useTitle from '../../hooks/useTitle';
import RequestBookingList from './bookingRequests/RequestBookingList';
import UserList from './users/UserList';
import ZoneList from './zones/ZoneList';

const UsersPage = () => {
  useTitle('Admin Dashboard');

  return (

    <div>
      <Heading size="xl">Admin Dashboard</Heading>
      <br/>
      <Heading size="md">Welcome to your Admin Dashboard</Heading>
      <Text> Use this page to approve bookings, modify current accounts and see an overview of the car parks currently on the system. </Text>
      <Tabs>
        <TabList>
          <Tab>Car Parks</Tab>
          <Tab>Zones</Tab>
          <Tab>Booking requests</Tab>
          <Tab>Users</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Heading>PLACEHOLDER ADD INFORMATION HERE:</Heading>
          </TabPanel>
            <TabPanel>
                <Button colorScheme='blue' mr={3}>Add Zone</Button>
                <ZoneList />
            </TabPanel>
          <TabPanel>
            <RequestBookingList />
          </TabPanel>
          <TabPanel>
            <UserList />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default UsersPage;
