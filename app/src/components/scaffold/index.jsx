import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Drawer,
  DrawerContent,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { FiHome } from 'react-icons/fi';

import Sidebar from './Sidebar';
import TopBar from './TopBar';

const linkItems = [{ name: 'Dashboard', icon: FiHome, to: '' }];

const Scaffold = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('white', 'gray.900')}>
      {/* Desktop sidebar */}
      <Sidebar onClose={onClose} items={linkItems} drawer />

      {/* Mobile sidebar */}
      <Drawer
        autoFocus={false}
        placement="left"
        returnFocusOnClose={false}
        size="full"
        isOpen={isOpen}
        onClose={onClose}
        onOverlayClick={onClose}
      >
        <DrawerContent>
          <Sidebar onClose={onClose} items={linkItems} />
        </DrawerContent>
      </Drawer>

      {/* Mobile top nav bar */}
      <TopBar onOpen={onOpen} />

      {/* App content */}
      <Box ml={{ base: 0, md: 60 }} p={4}>
        {children}
      </Box>
    </Box>
  );
};

Scaffold.defaultProps = {
  children: null,
};

Scaffold.propTypes = {
  children: PropTypes.element,
};

export default Scaffold;
