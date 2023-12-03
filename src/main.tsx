import React from "react";
import {createRoot} from 'react-dom/client'

import App from './App'
import {BrowserRouter} from 'react-router-dom'


const root = document.getElementById('root')
root && createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
    {/* <RouterProvider router={routes}/> */}
  </React.StrictMode>
)
