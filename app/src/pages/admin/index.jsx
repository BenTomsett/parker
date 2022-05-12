import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs,
} from '@chakra-ui/react';
import useTitle from '../../hooks/useTitle';
import RequestBookingList from './bookingRequests/RequestBookingList';
import UserList from './users/UserList';

const UsersPage = () => {
  useTitle('Admin Dashboard');

  return (
    <Tabs>
      <TabList>
        <Tab>Booking requests</Tab>
        <Tab>Users</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <RequestBookingList />
        </TabPanel>
        <TabPanel>
          <UserList />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default UsersPage;
