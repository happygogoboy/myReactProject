
import {Outlet} from 'react-router-dom'
import './style.scss'
import { Layout } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import {useNavigate} from 'react-router-dom'

import TopNav from '../TopNav';
import SiderNav from '../AsideNav';
const {   Content } = Layout;

const LayoutAll =()=>{
    const adminInfo = useSelector(state=>state.admin.adminInfo)
    const navigate = useNavigate()
    useEffect(()=>{
        if(!adminInfo) navigate('/go',{replace:true})
    },[])


        return(
            <>
              <Layout>
                  <TopNav></TopNav>
                  <Layout>
                      <SiderNav>Sider</SiderNav>
                      <Content><Outlet/></Content>
                  </Layout>
              </Layout>
             
            </>  
        ) 
    
}

export default LayoutAll
