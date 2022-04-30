import React, { useEffect } from 'react';
import { Heading } from '@chakra-ui/react';


const HomePage = () => {
  useEffect(() => {
    document.title = "new title"
  }, []);

  return <Heading size="xl">Welcome!</Heading>;
};

export default HomePage;
