import React from 'react';
import {
  Text,
  VStack,
  Avatar,
  Flex, MenuButton, MenuList, MenuItem, Menu,
} from '@chakra-ui/react';
import * as PropTypes from 'prop-types';

/**
 * NavUser component, displays the user's profile picture, name and email address
 * @param {string} name The user's name
 * @param {string} email The user's email address
 * @param {string} imageUrl The URL of the user's profile picture
 * @param {boolean} reversed If true, shows the profile picture on the right and text on the left
 * @param {function} logout If defined, renders a menu when the avatar is clicked to allow the user to log out
 * @param props Any other Box props to pass to the root element
 * @returns {JSX.Element}
 */
const NavUser = ({ name, email, imageUrl, reversed, logout, ...props }) => (
    <Flex
      gap="2"
      alignItems="center"
      flexDirection={reversed ? 'row-reverse' : 'row'}
      {...props}
    >

      {logout ? (
        <Menu>
          <MenuButton as={Avatar} w={12} h={12} src={imageUrl} cursor="pointer" />
          <MenuList>
            <MenuItem onClick={logout}>Log out</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Avatar w={12} h={12} src={imageUrl} />
      )}

      <VStack
        marginInlineStart={0}
        align={reversed ? 'end' : 'start'}
        spacing={0}
      >
        <Text fontSize="sm" fontWeight={500}>
          {name}
        </Text>
        <Text fontSize="sm" color="gray.400">
          {email}
        </Text>
      </VStack>
    </Flex>
  );

NavUser.defaultProps = {
  name: undefined,
  email: undefined,
  imageUrl: undefined,
  reversed: false,
  logout: undefined,
};

NavUser.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  imageUrl: PropTypes.string,
  reversed: PropTypes.bool,
  logout: PropTypes.func,
};

export default NavUser;
