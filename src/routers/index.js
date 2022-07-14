import {lazy} from 'react'
import { useRoutes,Navigate } from "react-router-dom"; 
import Login from '../views/login/login'
import Go from '../views/go/go'
import Layout from '../components/layout/index'
import Home from '../views/home/home'
import Room from '../views/room/room'
import SetBuild from '../views/build/build'
import RoomType from '../views/roomType/roomType'




//外部页面
const framOut = [
    {path:'/login',element:<Login/>},
    {path:'/go',element:<Go/>},
]

//功能页面
const framIn = [
        {path:'index',element:<Home/>},
        {path:'set',element:<Navigate to="/setBuild" />},
        {path:'setRoom',element:<Room/>},
        {path:'setBuild',element:<SetBuild/>},
        {path:'setFloor',element:<RoomType/>},
        {path:'*',element:<Navigate to="/index" />},
        
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
 