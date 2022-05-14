import React from 'react';
import {
  Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack,
} from '@chakra-ui/react';

import useTitle from '../../hooks/useTitle';
import PersonalDetails from "./PersonalDetails";
import ChangePassword from './ChangePassword';
import PaymentInformation from './PaymentInformation';


const AccountPage = () => {
  useTitle("Account");

  return (
    <VStack align='start' spacing={4} height='100%'>
      <VStack align='start' spacing={0}>
        <Heading size='lg'>Account</Heading>
        <Text fontSize='xl'>Edit your data and payment methods</Text>
      </VStack>
      <Tabs w="100%">
        <TabList>
          <Tab>
            Personal details
          </Tab>
          <Tab>
            Change password
          </Tab>
          <Tab>
            Payment information
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <PersonalDetails/>
          </TabPanel>
          <TabPanel>
            <ChangePassword />
          </TabPanel>
          <TabPanel>
            <PaymentInformation />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  )
};

export default AccountPage;
