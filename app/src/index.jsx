import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App';
import HomePage from './pages/home';

ReactDOM.render(
  <StrictMode>
    <ColorModeScript />
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
);
