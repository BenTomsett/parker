import React, { useContext } from 'react';
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
import { useNavigate } from 'react-router-dom';
import NavButton from './NavButton';
import NavUser from './NavUser';
import logo from '../../parker.svg';
import UserContext from '../../context/user';

/**
 * NavBar component, provides navigation between the main areas of the app
 * @param {MutableRefObject} navbarRef Passed to the root div in order to keep track of the navbar height
 * @returns {JSX.Element}
 */
const NavBar = ({ navbarRef }) => {
  const navigate = useNavigate();

  const user = useContext(UserContext);

  const bg = useColorModeValue('white', 'gray.800');
  const { isOpen, onClose, onToggle } = useDisclosure();

  const mobileNavButtonClick = (to) => {
    navigate(to);
    onClose();
  }

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
          <NavButton label="Home" to="/" />
          <NavButton label="Bookings" to="/bookings" />
          <NavButton label="Parking" to="/parking" />
          <NavButton label="Account" to="/account" />
        </HStack>
      </Flex>

      <NavUser
        name={`${user.forename} ${user.surname}`}
        email={user.email}
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
            <NavButton label="Home" to="/" onClick={() => mobileNavButtonClick('/')} fullWidth />
            <NavButton label="Bookings" to="/bookings" onClick={() => mobileNavButtonClick('/bookings')} fullWidth />
            <NavButton label="Parking" to="/parking" onClick={() => mobileNavButtonClick('/parking')} fullWidth />
            <NavButton label="Account" to="/account" onClick={() => mobileNavButtonClick('/account')} fullWidth />

            <HStack w="full" justifyContent="space-between" pt={4}>
              <NavUser name={`${user.forename} ${user.surname}`} email={user.email} />
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
