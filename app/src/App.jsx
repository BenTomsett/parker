import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Center, Spinner} from '@chakra-ui/react';
import {Scaffold} from './components';
import UserContext from './context/user';

const App = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [context, setContext] = useState({});

  useEffect(() => {
    fetch('/api/auth/verify').then((response) => {
      if (response.status === 401 || response.status === 403){
        navigate('/login');
      } else if (response.status === 402) {
        navigate('/register/billing');
      }else{
        response.json().then((json) => {
          setContext(json);
          setLoading(false);
        })
      }
    }).catch(() => {});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (loading ? (
      <Center h="100vh">
        <Spinner/>
      </Center>
  ) : (
      <UserContext.Provider value={context}>
        <Scaffold/>
      </UserContext.Provider>
  ));
};

export default App;