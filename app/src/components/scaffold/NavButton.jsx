import React from 'react';
import * as PropTypes from 'prop-types';
import { Button } from '@chakra-ui/react';
import { useLocation, useNavigate, useResolvedPath } from 'react-router-dom';

/**
 * Navigation button component
 * @param {string} label The button's label
 * @param {string} to Relative path to navigate
 * @param {function} onClick If the `to` prop not specified, this onClick function will be used instead
 * @param {boolean} fullWidth If true, the button takes up the full width of its parent
 * @returns {JSX.Element}
 */
const NavButton = ({ label, to, onClick, fullWidth }) => {
  const navigate = useNavigate();
  const resolved = useResolvedPath(to);
  const location = useLocation();

  const match = location.pathname.toLowerCase().split('/')[1] === resolved.pathname.toLowerCase().split('/')[1];

  return (
    <Button
      colorScheme="blue"
      variant={match ? 'solid' : 'ghost'}
      w={fullWidth ? 'full' : 'unset'}
      onClick={!onClick ? () => {
        navigate(to);
      } : onClick}
    >
      {label}
    </Button>
  )
};

NavButton.defaultProps = {
  to: "",
  onClick: undefined,
  fullWidth: false,
}

NavButton.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
  fullWidth: PropTypes.bool,
};

export default NavButton;
