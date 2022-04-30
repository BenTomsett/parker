import React from 'react';
import { Flex, IconButton, Image, useColorModeValue } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';

import logo from '../../parker.png';

// eslint-disable-next-line react/prop-types
const TopBar = ({ onOpen }) => (
  <Flex
    ml={{ base: 0 }}
    px={{ base: 4 }}
    height={{ base: 20, md: 0 }}
    alignItems="center"
    bg={useColorModeValue('white', 'gray.900')}
    borderBottomWidth="1px"
    lor={useColorModeValue('gray.200', 'gray.700')}
  >
    <Flex width="100%" alignItems="center" mx={2}>
      <Image
        src={logo}
        alt="Parker logo"
        display={{ base: 'flex', md: 'none' }}
        height={8}
      />
    </Flex>

    <IconButton
      display={{ base: 'flex', md: 'none' }}
      onClick={onOpen}
      variant="ghost"
      aria-label="Open navigation menu"
      icon={<FiMenu />}
    />
  </Flex>
);

export default TopBar;
