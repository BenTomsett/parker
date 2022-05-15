import React, { useState } from 'react';
import {
  Badge,
  Heading, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack,
} from '@chakra-ui/react';
import useTitle from '../../hooks/useTitle';
import BookingRequestList from './bookingRequests/BookingRequestList';
import UserList from './users/UserList';
import ZoneList from './zones/ZoneList';
import CarparkList from './carparks/CarparkList';

const UsersPage = () => {
  useTitle('Admin');

  const [itemCount, setItemCount] = useState({});

  const updateCount = (property, value) => {
    setItemCount((prevState => ({
      ...prevState,
      [property]: value,
    })));
  };

  return (

    <VStack align='start' spacing={4} height='100%'>
      <VStack align='start' spacing={0}>
        <Heading size='lg'>Admin</Heading>
        <Text fontSize='xl'>Manage car parks, booking requests and users</Text>
      </VStack>
      <Tabs w="100%">
        <TabList>
          <Tab>Car Parks</Tab>
          <Tab>
            <HStack>
              <Text>Booking requests</Text>
              <Badge>{itemCount.requests}</Badge>
            </HStack>
          </Tab>
          <Tab>Users</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CarparkList />
          </TabPanel>
            <TabPanel>
                <ZoneList />
            </TabPanel>
          <TabPanel>
            <BookingRequestList updateCount={updateCount} />
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
