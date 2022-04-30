import React from 'react';
import { Flex, Icon, Link, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const SidebarItem = ({ icon, label, to, ...rest }) => (
  <Link
    href={to}
    style={{ textDecoration: 'none' }}
    _focus={{ boxShadow: 'none' }}
  >
    <Flex
      align="center"
      p={4}
      mx={4}
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: 'blue.500',
        color: 'white',
      }}
      {...rest}
    >
      {icon && (
        <Icon
          mr={4}
          fontSize={16}
          _groupHover={{
            color: 'white',
          }}
          as={icon}
        />
      )}
      <Text>{label}</Text>
    </Flex>
  </Link>
);

SidebarItem.defaultProps = {
  icon: null,
  label: null,
  to: null,
};

SidebarItem.propTypes = {
  icon: PropTypes.element,
  label: PropTypes.string,
  to: PropTypes.string,
};

export default SidebarItem;
