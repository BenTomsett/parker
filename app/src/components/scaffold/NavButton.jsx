import React from 'react';
import { Button } from '@chakra-ui/react';
import * as PropTypes from 'prop-types';

/**
 * Navigation button component
 * @param {string} label The button's label
 * @param {boolean} active If true, the button has a solid background to indicate the user has navigated to (or under) this area of the app
 * @param {boolean} fullWidth If true, the button takes up the full width of its parent
 * @returns {JSX.Element}
 */
const NavButton = ({ label, active, fullWidth }) => (
  <Button
    colorScheme="blue"
    variant={active ? 'solid' : 'ghost'}
    w={fullWidth ? 'full' : 'unset'}
  >
    {label}
  </Button>
);

NavButton.defaultProps = {
  active: false,
  fullWidth: false,
}

NavButton.propTypes = {
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

export default NavButton;
