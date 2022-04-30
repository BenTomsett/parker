import React, { useEffect, useRef, useState } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

/**
 * Scaffold component, lays out the app with the navigation bar and content below
 * @returns {JSX.Element}
 */
const Scaffold = () => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const navbarRef = useRef(null);

  useEffect(() => {
    if (navbarRef) {
      setNavbarHeight(navbarRef.current.clientHeight);
    }
  }, []);

  return (
    <Flex flexDirection="column" maxH="100vh">
      <NavBar navbarRef={navbarRef} />
      <Box p={8} maxH="100vh" mt={`${navbarHeight}px`}>
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Scaffold;
