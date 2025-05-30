import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import Book from './pages/Book';
import Register from './pages/Register';
import MainLayout from './layouts/MainLayout';
import NotFound from './pages/NotFound';
import './index.css'

const router = createBrowserRouter([
  { path: '/', element: <MainLayout><App /></MainLayout> },
  { path: '/book', element: <MainLayout><Book /></MainLayout> },
  { path: '/book/register', element: <MainLayout><Register /></MainLayout> },
  { path: '*', element: <NotFound /> },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
