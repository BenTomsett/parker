import React from 'react';
import {
  Avatar,
  Button,
  chakra,
  Flex,
  HStack,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack,
  Drawer,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react';

import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../../parker.svg';

const Scaffold = () => {
  const bg = useColorModeValue('white', 'gray.800');
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <chakra.nav
      bg={bg}
      w="full"
      px={{ base: 2, sm: 6 }}
      py={4}
      shadow="md"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Image src={logo} alt="Parker logo" h={35} />

      <Flex
        justifyContent="space-between"
        w="full"
        ml={6}
        display={{ base: 'none', md: 'flex' }}
      >
        <HStack>
          <HStack spacing={2}>
            <Button colorScheme="blue" variant="solid">
              Home
            </Button>
            <Button colorScheme="blue" variant="ghost">
              Bookings
            </Button>
            <Button colorScheme="blue" variant="ghost">
              Parking
            </Button>
            <Button colorScheme="blue" variant="ghost">
              Account
            </Button>
          </HStack>
        </HStack>
        <HStack spacing={4}>
          <VStack align="end" spacing={0}>
            <Text fontSize="sm" fontWeight={500}>
              Joe Bloggs
            </Text>
            <Text fontSize="sm" color="gray.400">
              joe@bloggs.com
            </Text>
          </VStack>
          <Avatar w={12} h={12} />
        </HStack>
      </Flex>

      <IconButton
        aria-label="Open menu"
        icon={isOpen ? <FiX /> : <FiMenu />}
        variant="ghost"
        display={{ base: 'flex', md: 'none' }}
        onClick={onToggle}
      />

      <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <VStack spacing={2} py={4} px={6}>
            <Button colorScheme="blue" variant="solid" w="full">
              Home
            </Button>
            <Button colorScheme="blue" variant="ghost" w="full">
              Bookings
            </Button>
            <Button colorScheme="blue" variant="ghost" w="full">
              Parking
            </Button>
            <Button colorScheme="blue" variant="ghost" w="full">
              Account
            </Button>

            <HStack w="full" justifyContent="space-between" pt={4}>
              <HStack spacing={4}>
                <Avatar w={12} h={12} />
                <VStack align="start" spacing={0}>
                  <Text fontSize="sm" fontWeight={500}>
                    Joe Bloggs
                  </Text>
                  <Text fontSize="sm" color="gray.400">
                    joe@bloggs.com
                  </Text>
                </VStack>
              </HStack>
              <Button variant="ghost" size="sm">Log out</Button>
            </HStack>
          </VStack>
        </DrawerContent>
      </Drawer>
    </chakra.nav>
  );
};

export default Scaffold;
