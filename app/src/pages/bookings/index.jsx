import {useNavigate} from "react-router-dom";
import React, { useState } from 'react';
import {
  Badge,
  Button,
  Heading,
  HStack, Tab,
  TabList, TabPanel, TabPanels, Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import BookingList from './BookingList';
import useTitle from '../../hooks/useTitle';
import BookingRequestList from './BookingRequestList';

const BookingsPage = () => {
  useTitle("Bookings");

  const [itemCount, setItemCount] = useState({});

  const updateCount = (property, value) => {
    setItemCount((prevState => ({
      ...prevState,
      [property]: value,
    })));
  };

  const navigate = useNavigate();

  return (
    <VStack align='start' spacing={4} height='100%'>
      <HStack justifyContent='space-between' w='100%' align='center'>
        <VStack align='start' spacing={0}>
          <Heading size='lg'>Bookings</Heading>
          <Text fontSize='xl'>View and manage upcoming bookings and booking requests</Text>
        </VStack>
        <Button
          colorScheme="blue"
          leftIcon={<FiPlus />}
          onClick={() => {
            navigate('/bookings/newBooking');
          }}>
          Request booking
        </Button>
      </HStack>
      <Tabs w="100%">
        <TabList>
          <Tab>
            <HStack>
              <Text>Bookings</Text>
              <Badge>{itemCount.bookings}</Badge>
            </HStack>
          </Tab>
          <Tab>
            <HStack>
              <Text>Requests</Text>
              <Badge>{itemCount.requests}</Badge>
            </HStack>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <BookingList updateCount={updateCount} />
          </TabPanel>
          <TabPanel>
            <BookingRequestList updateCount={updateCount} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  )
};

export default BookingsPage;
