import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import Book from './pages/Book';
import Register from './pages/Register.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import NotFound from './pages/NotFount.jsx';
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
