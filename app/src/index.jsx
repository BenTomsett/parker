import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import HomePage from './pages/home';
import BookingsPage from './pages/bookings';
import ParkingPage from './pages/parking';
import AccountPage from './pages/account';
import LoginPage from './pages/login';
import RegisterPage from './pages/register';
import BillingSetupPage from './pages/register/billing';
import SetupForm from './pages/register/billing/SetupForm';
import SetupComplete from './pages/register/billing/SetupComplete';
import NewBooking from './pages/bookings/newBooking'

ReactDOM.render(
  <StrictMode>
    <ColorModeScript />
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="/bookings/newBooking" element={<NewBooking />} />
            <Route path="/parking" element={<ParkingPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register/billing" element={<BillingSetupPage />}>
            <Route index element={<SetupForm />} />
            <Route path="complete" element={<SetupComplete />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
);
