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
import { Navigate } from 'react-router-dom';


import HomePage from './Pages/HomePage/index.tsx';
import LoginPage from './Pages/LoginPage/index.tsx';
import SensorPage from './Pages/SensorPage/index.tsx';
import FirebaseContext from './context/firebaseContext';
import firebaseConfig from './firebaseConfig.ts';
import RegisterPage from './Pages/RegisterPage/index.tsx';
import RecordMacroPage from './Pages/RecordMacroPage/index.tsx';
import MacrosPage from './Pages/MacrosPage/index.tsx';
import ProfilePage from './Pages/ProfilePage/index.tsx';
import RecoverPasswordPage from './Pages/RecoverPassword/index.tsx';
import RecoverConfirmPage from './Pages/RecoverConfirm/index.tsx';
import NewPasswordPage from './Pages/NewPassword/index.tsx';

const router = createBrowserRouter([
  
  { path: "/", element: <LoginPage/> },
  { path: "/register", element: <RegisterPage/> },
  { path: "/recoverypassword", element: <RecoverPasswordPage/> },
  { path: "/recoveryconfirm", element: <RecoverConfirmPage/> },
  { path: "/sensor", element: <SensorPage/> },
  { path: "/home", element: <HomePage/> },
  { path: "/recordmacro", element: <RecordMacroPage/> },
  { path: "/macros", element: <MacrosPage/> },
  { path: "/perfil", element: <ProfilePage/> },
  { path: "/sair", element: <Navigate to="/" /> },
  
  { path: "/newPassword", element: <NewPasswordPage/> }, // Precisa ainda fazer uma validação para poder só ser acessado a partir do link
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