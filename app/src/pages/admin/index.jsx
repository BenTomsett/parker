import React from 'react';
import { Tab, TabList, TabPanel, TabPanels, Tabs,
} from '@chakra-ui/react';
import useTitle from '../../hooks/useTitle';
import UserList from '../../components/users/UserList';
import RequestBookingList from '../../components/users/RequestBookingList';

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
