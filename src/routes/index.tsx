import React from "react";
import { createBrowserRouter } from "react-router-dom";
import {RouteObject} from 'react-router-dom'

import Login from '../pages/Login'
import User from '../pages/User'
import AppLayout from "@/layout";

const routes:RouteObject[] = [
  {
    path: '/',
    element: <AppLayout/>,
    children: [
      {
        index: true,
        element: <div>主页</div>
      },
      {
        path: '/user',
        element: <User/>
      },
      {
        path: '/user/detail/:id',
        element: <div>用户详情</div>
      }
    ]
  },
  {
    path: '/login',
    element: <Login/>
  },
  
]

export default routes