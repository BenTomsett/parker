import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from './App';

ReactDOM.render(
  <StrictMode>
    <ColorModeScript />
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<App />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
);
