import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Center, Spinner} from '@chakra-ui/react';
import {Scaffold} from './components';

const App = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/auth/verify').then((response) => {
      if (response.status === 401) {
        navigate('/login');
      } else {
        response.text().then((text) => {
          if(text === "NEED_BILLING_SETUP"){
            navigate('/register/billing');
          }else{
            setLoading(false);
          }
        })
      }
    }).catch(() => {});
  }, [navigate]);

  return (loading ? (
      <Center h="100vh">
        <Spinner/>
      </Center>
  ) : (
      <Scaffold/>
  ));
};

export default App;