import React from 'react';
import { Outlet } from 'react-router-dom';

import Scaffold from './components/scaffold';


const App = () => (
    <Scaffold>
      <Outlet />
    </Scaffold>
  )

export default App;
