import React, {lazy, useState, Suspense} from 'react'

// createBrowserRouter:创建路由实例，在方法中定义路由path和组件的对应关系
// RouterProvider是一个路由组件 并且传入生成的实例
//Routes所有路由的父组件
import { useRoutes } from "react-router-dom";

import routes from './routes/index'

export default function App(){
  return useRoutes(routes)
}