import React from 'react';
import * as PropTypes from 'prop-types';
import {
  Button,
  chakra,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Image,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { FiMenu, FiX } from 'react-icons/fi';
import NavButton from './NavButton';
import NavUser from './NavUser';
import logo from '../../parker.svg';

/**
 * NavBar component, provides navigation between the main areas of the app
 * @param {MutableRefObject} navbarRef Passed to the root div in order to keep track of the navbar height
 * @returns {JSX.Element}
 */
const NavBar = ({ navbarRef }) => {
  const bg = useColorModeValue('white', 'gray.800');
  const { isOpen, onClose, onToggle } = useDisclosure();

  return (
    <chakra.nav
      ref={navbarRef}
      bg={bg}
      w="full"
      px={{ base: 2, sm: 8 }}
      py={4}
      shadow="md"
      position="fixed"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex alignItems="center">
        <Image src={logo} alt="Parker logo" h={35} mr={6} />
        <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>
          <NavButton label="Home" active />
          <NavButton label="Bookings" />
          <NavButton label="Parking" />
          <NavButton label="Account" />
        </HStack>
      </Flex>

      <NavUser
        name="Ben Tomsett"
        email="ben@tomsett.xyz"
        reversed
        display={{ base: 'none', md: 'flex' }}
      />

      {/* Visible on mobile - drawer and drawer toggle */}
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
            <NavButton label="Home" active fullWidth />
            <NavButton label="Bookings" fullWidth />
            <NavButton label="Parking" fullWidth />
            <NavButton label="Account" fullWidth />

            <HStack w="full" justifyContent="space-between" pt={4}>
              <NavUser name="Ben Tomsett" email="ben@tomsett.xyz" />
              <Button variant="ghost" size="sm">
                Log out
              </Button>
            </HStack>
          </VStack>
        </DrawerContent>
      </Drawer>
    </chakra.nav>
  );
};

NavBar.propTypes = {
  navbarRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
    .isRequired,
};

export default NavBar;
