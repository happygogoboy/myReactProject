
import {Outlet} from 'react-router-dom'
import './style.scss'
import { Layout } from 'antd';

import TopNav from '../TopNav';
import SiderNav from '../AsideNav';
const {   Content } = Layout;

const LayoutAll =()=>{


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
