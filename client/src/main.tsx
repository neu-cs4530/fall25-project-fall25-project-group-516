import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
// 1. Import defaultSystem alongside ChakraProvider
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 2. Pass defaultSystem to the value prop */}
    <ChakraProvider value={defaultSystem}>
      <App />
    </ChakraProvider>
  </StrictMode>,
);
