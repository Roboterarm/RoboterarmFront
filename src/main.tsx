import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from '@emotion/react';
import { initializeApp } from 'firebase/app';

import './index.css'
import theme from './theme';

import HomePage from './Pages/HomePage/index.tsx';
import LoginPage from './Pages/LoginPage/index.tsx';
import SensorPage from './Pages/SensorPage/index.tsx';
import FirebaseContext from './context/firebaseContext';
import firebaseConfig from './firebaseConfig.ts';
import RegisterPage from './Pages/RegisterPage/index.tsx';

const router = createBrowserRouter([
  { path: "/", element: <LoginPage/> },
  { path: "/register", element: <RegisterPage/> },
  { path: "/sensor", element: <SensorPage/> },
  { path: "/home", element: <HomePage/> }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider theme={theme}>
        <FirebaseContext.Provider value={initializeApp(firebaseConfig)}>
          <RouterProvider router={router} />
        </FirebaseContext.Provider>
      </ThemeProvider>
  </StrictMode>,
)