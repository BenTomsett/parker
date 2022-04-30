import React from 'react';
import {
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { FiMoreHorizontal } from 'react-icons/fi';
import PropTypes from 'prop-types';

import SidebarItem from './SidebarItem';
import logo from '../../parker.png';

const Sidebar = ({ onClose, items, drawer }) => (
  <Flex
    transition="3s ease"
    bg={useColorModeValue('white', 'gray.900')}
    borderRight="1px"
    borderRightColor={useColorModeValue('gray.200', 'gray.700')}
    w={{ base: 'full', md: 60 }}
    pos="fixed"
    h="full"
    flexDirection="column"
    justifyContent="space-between"
    display={drawer ? { base: 'none', md: 'flex' } : null}
  >
    <Box>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Image src={logo} alt="Parker logo" height={8} mx="auto" />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {items.map(link => (
        <SidebarItem key={link.name} icon={link.icon} label={link.name} />
      ))}
    </Box>

    <Flex justifyContent="center" mb={4}>
      <Menu>
        <MenuButton py={2}>
          <HStack>
            <Avatar size="sm" />
            <VStack display="flex" alignItems="flex-start" spacing="1px" ml={2}>
              <Text fontSize="sm">Ben Tomsett</Text>
              <Text fontSize="xs" color="gray.600">
                ben@tomsett.xyz
              </Text>
            </VStack>
            <Box pl={4}>
              <FiMoreHorizontal />
            </Box>
          </HStack>
        </MenuButton>
        <MenuList
          bg={useColorModeValue('white', 'gray.900')}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
        >
          <MenuItem>Account</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  </Flex>
);

Sidebar.defaultProps = {
  onClose: () => {},
  items: null,
  drawer: false,
};

Sidebar.propTypes = {
  onClose: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      icon: PropTypes.element,
      to: PropTypes.string,
    })
  ),
  drawer: PropTypes.bool,
};

export default Sidebar;
