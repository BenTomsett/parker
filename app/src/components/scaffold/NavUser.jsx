import React from 'react';
import { Text, VStack, Avatar, Flex } from '@chakra-ui/react';
import * as PropTypes from 'prop-types';

/**
 * NavUser component, displays the user's profile picture, name and email address
 * @param {string} name The user's name
 * @param {string} email The user's email address
 * @param {string} imageUrl The URL of the user's profile picture
 * @param {boolean} reversed If true, shows the profile picture on the right and text on the left
 * @param props Any other Box props to pass to the root element
 * @returns {JSX.Element}
 */
const NavUser = ({ name, email, imageUrl, reversed, ...props }) => (
    <a href="/account">
    <Flex
      gap="2"
      alignItems="center"
      flexDirection={reversed ? 'row-reverse' : 'row'}
      {...props}
    >
      <Avatar w={12} h={12} src={imageUrl} />
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
    </a>
  );

NavUser.defaultProps = {
  name: undefined,
  email: undefined,
  imageUrl: undefined,
  reversed: false,
};

NavUser.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  imageUrl: PropTypes.string,
  reversed: PropTypes.bool,
};

export default NavUser;
