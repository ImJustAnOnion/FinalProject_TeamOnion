import React, { Children } from 'react'
import ReactDOM from 'react-dom/client'
import RPS from '../src/pages/rps/App'
import TicTacToe from '../src/pages/tictactoe/App'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navigation from './pages/common/Navigation'
import ErrorPage from './pages/ErrorPage'
import Balloons from './pages/balloons/App'
import Memory from './pages/memory/App'
import Wordle from './pages/wordle/App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigation />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/rps",
        element: <RPS />
      },
      {
        path: "/tictactoe",
        element: <TicTacToe />
      },
      {
        path: "/balloons",
        element: <Balloons />
      },
      {
        path: "/memory",
        element: <Memory />
      },
      {
        path: "/wordle",
        element: <Wordle />
      },
    ],
  },
], { basename: import.meta.env.BASE_URL});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
