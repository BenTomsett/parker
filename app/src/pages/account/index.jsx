import React from 'react';
import {
  Heading, Tab, TabList, TabPanel, TabPanels, Tabs, Text,
} from '@chakra-ui/react';

import useTitle from '../../hooks/useTitle';
import UpdateDetails from "./UpdateDetails";


const AccountPage = () => {
  useTitle("Account");

  return (
    <div>
    <Heading size="xl">Account</Heading>
    <br/>
    <Heading size="md">Welcome to your account page</Heading>
    <Text>On this page you can and modify all of your personal details held by the Parker system.
    <br/>You can also view and edit your payment details under the Billing Details Section of the page.<br/></Text>


    <br/>

      <Tabs>
        <TabList>
          <Tab>Personal Details</Tab>
          <Tab>Billing Details</Tab>
        </TabList>
        <TabPanels>
          <TabPanel align="center">
            <UpdateDetails/>
          </TabPanel>
          <TabPanel align="center">
            <Heading size="md">Billing Details:</Heading>
            <br/>
          </TabPanel>
        </TabPanels>
      </Tabs>

    </div>

  )
};

export default AccountPage;
