import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { RouterProvider } from 'react-router-dom';
import createRouter from './services/routes/router';
import { Bounce, ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={createRouter} />
    <ToastContainer
      position="top-right"
      autoClose={4000}
      closeOnClick={false}
      rtl={false}
      draggable
      pauseOnHover={false}
      theme="light"
      transition={Bounce}
    />
  </StrictMode>
);
