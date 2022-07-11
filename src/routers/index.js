import {lazy} from 'react'
import { useRoutes,Navigate } from "react-router-dom"; 
import Login from '../views/login/login'
import Layout from '../components/layout/index'
import Home from '../views/home/home'
import Room from '../views/room/room'



//外部页面
const framOut = [
    {path:'/login',element:<Login/>}
]

//功能页面
const framIn = [
        {path:'index',element:<Home/>},
        {path:'room',element:<Room/>},
        {path:'*',element:<Navigate to="/index" />}
        
]

 const Router = ()=>{
    let element = useRoutes([
        ...framOut,
        {path:'/',element:<Navigate to="/index"/>},
        {path:'/*',element:<Layout/>,children:framIn},
    ])
    return element
 }

 export default Router
 