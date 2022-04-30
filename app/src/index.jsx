import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Scaffold } from './components';
import HomePage from './pages/home';
import BookingsPage from './pages/bookings';
import ParkingPage from './pages/parking';
import AccountPage from './pages/account';

ReactDOM.render(
  <StrictMode>
    <ColorModeScript />
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Scaffold />}>
            <Route index element={<HomePage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/parking" element={<ParkingPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
);
